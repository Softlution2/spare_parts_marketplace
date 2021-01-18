const express = require("express");
const router = express.Router();
const formidable = require("formidable");
const AWS = require('aws-sdk');
const fs = require('fs');
const crypto = require("crypto");
const path = require('path');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

const Listing = require("../../models/Listing");
const {ObjectId} = require('mongodb'); // or ObjectID 

router.post("/new", async (req, res) => {
  let pic = null;
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
    pic = currentTime + "." + file.name.split(".")[1];
  });

  form.on("file", function (name, file) {});

  form.on("end", async function () {
    const file = fs.readFileSync("uploads/" + pic);
    const rawBytes = await crypto.pseudoRandomBytes(16);
    const fileName = rawBytes.toString('hex') + Date.now() + path.extname(pic);
    const params = {
      Bucket: 'spare-parts-marketplace',
      Key: fileName,
      Body: file
    };
    const data = await s3.upload(params).promise();
    fs.unlinkSync("uploads/" + pic);
    pic = data.Location;
    // details = { ...details, ...files };
    const newListing = new Listing({
      ...obj,
      pic
    });
    newListing.save()
    .then((listing) => { return res.json(listing); })
    .catch((err) => { console.log(err); return res.status(400).json({message: "Something went wrong!"}) });
  });
});

router.get("/get-home", (req, res) => {
  Listing.find({}).populate("user").exec(function(err, docs) {
    if (err) {
      console.log(err);
      return res.status(400).json({message: "Something went wrong!"});
    }
    return res.json(docs);
  });
});

module.exports = router;
