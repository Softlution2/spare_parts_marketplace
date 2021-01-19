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
const CarMake = require("../../models/CarMake");
const CarModel = require("../../models/CarModel");

const {ObjectId} = require('mongodb'); // or ObjectID 

router.post("/initialize", async (req, res) => {
  let findQuery = {};
  const { search, make } = req.body;
  if (search && search !== null) {
    findQuery['$text'] = {
      $search: search
    };
  }
  // if (make && make !== null) {
  //   let makeStr = make.replace("-", " ");
  //   const re = new RegExp(`\^${makeStr}$`, 'i');
  //   findQuery['make'] = re;
  // }
  let listings, maxPrice, minPrice, makeList, modelList;
  try {
    listings = await Listing.find(findQuery).sort("-date").populate("user_id");
  } catch(err) {
    listing = [];
  }
  
  try {
    maxPrice = (await Listing.findOne({}).sort("-price")).price;
  } catch(err) {
    maxPrice = 0;
  }
  
  try {
    minPrice = (await Listing.findOne({}).sort("price")).price;
  } catch(err) {
    minPrice = 0;
  }
  
  try {
    makeIds = await Listing.distinct("makes");
    makeList = await CarMake.find({_id: { $in: makeIds }});
  } catch(err) {
    makeList = [];
  }
  
  try {
    modelIds = await Listing.distinct("models");
    modelList = await CarModel.find({_id: { $in: modelIds }});
  } catch(err) {
    modelList = [];
  }

  return res.json({
    listings,
    maxPrice,
    minPrice,
    makeList,
    modelList,
  });
});

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
    let data = null;
    try {
      data = await s3.upload(params).promise();
    } catch (err) {
      console.log(err);
      return res.status(400).json({message: "Something went wrong!"})
    }
    fs.unlinkSync("uploads/" + pic);
    pic = data.Location;
    // details = { ...details, ...files };
    const newListing = new Listing({
      ...obj,
      pic,
      makes: JSON.parse(obj.makes),
      models: JSON.parse(obj.models),
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

router.get("/get-makes", (req, res) => {
  CarMake.find({}, function (err, docs) {
    if (err) {
      console.log(err);
      return res.status(400).json({message: "Something went wrong!"});
    }
    return res.json(docs);
  });
});

router.post("/get-models", (req, res) => {
  const { makes } = req.body;
  CarModel.find({ id_car_make: { $in: makes } }, function (err, docs) {
    if (err) {
      console.log(err);
      return res.status(400).json({message: "Something went wrong!"});
    }
    return res.json(docs);
  });
});

router.post("/search", async (req, res) => {
  const { query } = req.body;
  let findQuery = {};
  if (query.user_id) {
    findQuery["user_id"] = query.user_id;
  }
  if (query.priceRange) {
    findQuery["price"] = {
      $gte: query.priceRange[0],
      $lte: query.priceRange[1],
    };
  }
  if (query.make && query.make.length !== 0) {
    const makeIds = query.make.map((q) => q._id);
    findQuery["makes"] = {
      $in: makeIds,
    };
  }
  if (query.model && query.model.length !== 0) {
    const modelIds = query.model.map((q) => q._id);
    findQuery["models"] = {
      $in: modelIds,
    };
  }
  if (query.string) {
    findQuery["$text"] = {
      $search: query.string,
    };
  }
  const { sortBy } = query;
  try {
    const listings = await Listing.find(findQuery).sort(sortBy).populate("user");
    return res.json({ listings });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Something went wrong!" });
  }
});

module.exports = router;
