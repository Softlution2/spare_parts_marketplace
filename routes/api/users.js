const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const formidable = require("formidable");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const AWS = require("aws-sdk");
const fs = require("fs");
const crypto = require("crypto");
const path = require("path");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

const twilioClient = require("twilio")(accountSid, authToken);

// Load User model
const User = require("../../models/User");
const Listing = require('../../models/Listing');

router.post("/get-otp-by-email", (req, res) => {
  let email = req.body.email;
  twilioClient.verify
    .services(process.env.TWILIO_SERVICE_SID)
    .verifications.create({ to: email, channel: "email" })
    .then((verification) => {
      return res.json(verification);
    })
    .catch((error) => {
      console.log(error);
      return res
        .status(400)
        .json({ message: "Something went wrong! Please try again later" });
    });
});

router.post("/get-otp-by-phone", (req, res) => {
  let phone = req.body.phone;
  twilioClient.verify
    .services(process.env.TWILIO_SERVICE_SID)
    .verifications.create({ to: phone, channel: "sms" })
    .then((verification) => {
      return res.json(verification);
    })
    .catch((error) => {
      console.log(error);
      return res
        .status(400)
        .json({ message: "Something went wrong! Please try again later" });
    });
});

router.post("/verify-otp", (req, res) => {
  let code = req.body.code;
  let identify = req.body.identify;
  twilioClient.verify
    .services(process.env.TWILIO_SERVICE_SID)
    .verificationChecks.create({ to: identify, code: code })
    .then((verification_check) => {
      if (verification_check.status === "approved") {
        let query = identify.includes("+")
          ? { phone: identify.replace("+", "") }
          : { email: identify };
        let errMsg = identify.includes("+")
          ? "This phone number is already used."
          : "This email address is already used.";
        User.findOne(query).then((user) => {
          if (user) return res.status(400).json({ message: errMsg });
          return res.json({ message: "success" });
        });
      } else {
        return res.status(400).json({
          message: "Verification Failed. Please enter the code from your email",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      return res.status(400).json({
        message: "Verification Failed. Please enter the code from your email",
      });
    });
});

router.post("/signup", async (req, res) => {
  let files = {};
  let avatar = null;
  let obj = null;
  const form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    obj = fields;
  });

  form.on("fileBegin", function (name, file) {
    // console.log(name, file);
    let currentTime = new Date().getTime();
    file.path =
      __dirname +
      "/../../uploads/" +
      currentTime +
      "." +
      file.name.split(".")[1];
    files[name] = currentTime + "." + file.name.split(".")[1];
  });

  form.on("file", function (name, file) {});

  form.on("end", async function () {
    for (const key in files) {
      const file = fs.readFileSync("uploads/" + files[key]);
      const rawBytes = await crypto.pseudoRandomBytes(16);
      const fileName =
        rawBytes.toString("hex") + Date.now() + path.extname(files[key]);
      const params = {
        Bucket: "spare-parts-marketplace",
        Key: fileName,
        Body: file,
      };
      const data = await s3.upload(params).promise();
      fs.unlinkSync("uploads/" + files[key]);
      files[key] = data.Location;
    }
    let { email, phone, details, password, role } = obj;
    details = JSON.parse(details);
    details = { ...details, ...files };

    User.findOne({ email }).then((user) => {
      if (user) {
        return res.status(400).json({ message: "User Already Exists" });
      } else {
        const newUser = new User({
          email,
          phone,
          details,
          // avatar: avatar,
          password: password,
          role,
        });
        // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => res.json(user))
              .catch((err) => res.status(400).json(err));
          });
        });
      }
    });
  });
});

router.post("/login", (req, res) => {
  const email = req.body.email;
  const phone = req.body.phone;
  const method = req.body.method;
  const password = req.body.password;
  let query = method === "email" ? { email: email } : { phone: phone };
  // Find user by email
  User.findOne(query).then((user) => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name,
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 9000, // 15 mins in seconds
          },
          async (err, token) => {
            const listing_count = await Listing.count({user: user.id});
            const loginUser = { ...user._doc, listing_count };
            res.json({
              user: loginUser,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        return res.status(400).json({ message: "Password incorrect" });
      }
    });
  });
});

router.post("/check-account", (req, res) => {
  let { method, email, phone } = req.body;
  let query = method === "email" ? { email: email } : { phone: phone };
  User.findOne(query).then((user) => {
    if (!user) return res.json({ is_exist: false });
    return res.json({ is_exist: true });
  });
});

router.post("/update", (req, res) => {
  let files = {};
  let s3Files = {};
  let avatar = null;
  let obj = null;
  const form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    obj = fields;
  });

  form.on("fileBegin", function (name, file) {
    // console.log(name, file);
    let currentTime = new Date().getTime();
    file.path =
      __dirname +
      "/../../uploads/" +
      currentTime +
      "." +
      file.name.split(".")[1];
    files[name] = currentTime + "." + file.name.split(".")[1];
  });

  form.on("file", function (name, file) {});

  form.on("end", async function () {
    for (const key in files) {
      const file = fs.readFileSync("uploads/" + files[key]);
      const rawBytes = await crypto.pseudoRandomBytes(16);
      const fileName =
        rawBytes.toString("hex") + Date.now() + path.extname(files[key]);
      const params = {
        Bucket: "spare-parts-marketplace",
        Key: fileName,
        Body: file,
      };
      const data = await s3.upload(params).promise();
      fs.unlinkSync("uploads/" + files[key]);
      if (key === "avatar") avatar = data.Location;
      s3Files[key] = data.Location;
    }
    let { details, user_id } = obj;
    details = JSON.parse(details);
    details = { ...details, ...s3Files };
    let setQuery = {
      $set: {
        details,
        avatar: obj["avatar"] ? obj.avatar : avatar,
      },
    };
    User.findByIdAndUpdate(
      { _id: user_id },
      setQuery,
      async function (err, doc) {
        if (err) {
          console.log(err);
          return res.status(400).json({ message: "Something went wrong!" });
        }
        let user = await User.findOne({ _id: user_id });
        return res.json(user);
      }
    );
  });
});

router.get("/get-seller", async (req, res) => {
  try {
    const seller = await User.findById(req.query.id);
    const sellerListings = await Listing.find({user: req.query.id});
    return res.json({seller, sellerListings});
  } catch (err) {
    console.log(err);
    return res.status(400).json({message: "Something went wrong!"});
  }
});

module.exports = router;
