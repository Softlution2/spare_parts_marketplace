const express = require("express");
const router = express.Router();
const formidable = require("formidable");
const AWS = require("aws-sdk");
const fs = require("fs");
const crypto = require("crypto");
const path = require("path");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

const Listing = require("../../models/Listing");
const CarMake = require("../../models/CarMake");
const CarModel = require("../../models/CarModel");
const { UserBindingContext } = require("twilio/lib/rest/chat/v2/service/user/userBinding");

router.post("/initialize", async (req, res) => {
  let findQuery = {};
  let searchQuery = {}
  const { search, make, category, subcategory } = req.body;
  if (search && search !== null) {
    searchQuery["string"] = search;
    findQuery["$text"] = {
      $search: search,
    };
  }
  if (make && make !== null) {
    const re = new RegExp(`\^${make}$`, 'i');
    const makeDoc = await CarMake.findOne({name: re});
    searchQuery.make = [makeDoc];
    findQuery['makes'] = { $in: [makeDoc._id] };
    searchQuery["make"] = [makeDoc];
  }
  if (category && category !== null) {
    findQuery['category'] = { $in: [category.name] };
    searchQuery['category'] = [category];
  }
  if (subcategory && subcategory !== null) {
    findQuery['subCategory'] = { $in: [subcategory.value] };
  }

  let listings, maxPrice, minPrice, makeList, modelList, brandList;
  try {
    listings = await Listing.find(findQuery).sort("-date").populate("user_id");
  } catch (err) {
    listing = [];
  }

  try {
    maxPrice = (await Listing.findOne({}).sort("-price")).price;
  } catch (err) {
    maxPrice = 0;
  }

  try {
    minPrice = (await Listing.findOne({}).sort("price")).price;
  } catch (err) {
    minPrice = 0;
  }

  try {
    makeIds = await Listing.distinct("makes");
    makeList = await CarMake.find({ _id: { $in: makeIds } });
  } catch (err) {
    makeList = [];
  }

  try {
    modelIds = await Listing.distinct("models");
    modelList = await CarModel.find({ _id: { $in: modelIds } });
  } catch (err) {
    modelList = [];
  }

  try {
    brandList = await Listing.distinct("partBrand");
  } catch (err) {
    brandList = [];
  }

  return res.json({
    searchQuery,
    listings,
    maxPrice,
    minPrice,
    makeList,
    modelList,
    brandList,
  });
});


router.get("/get-my-listing", async (req, res) => {
  const { user_id } = req.query;
  let listings;
  try {
    listings = await Listing.find({ user: user_id }).sort("-date").populate("user");
  } catch (err) {
    listing = [];
  }

  return res.json({
    listings,
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
    const fileName = rawBytes.toString("hex") + Date.now() + path.extname(pic);
    const params = {
      Bucket: "spare-parts-marketplace",
      Key: fileName,
      Body: file,
    };
    let data = null;
    try {
      data = await s3.upload(params).promise();
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: "Something went wrong!" });
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
    newListing
      .save()
      .then((listing) => {
        return res.json(listing);
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).json({ message: "Something went wrong!" });
      });
  });
});


router.post("/update", async (req, res) => {
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
    if (pic) {

      const file = fs.readFileSync("uploads/" + pic);
      const rawBytes = await crypto.pseudoRandomBytes(16);
      const fileName = rawBytes.toString("hex") + Date.now() + path.extname(pic);
      const params = {
        Bucket: "spare-parts-marketplace",
        Key: fileName,
        Body: file,
      };
      let data = null;
      try {
        data = await s3.upload(params).promise();
      } catch (err) {
        console.log(err);
        return res.status(400).json({ message: "Something went wrong!" });
      }
      fs.unlinkSync("uploads/" + pic);
      pic = data.Location;
    }
    else pic = obj.pic;
    Listing.findOneAndUpdate({_id: obj.list_id}, {
      $set: {
        ...obj,
        pic,
        makes: JSON.parse(obj.makes),
        models: JSON.parse(obj.models),
      }
    }, function (err, doc) {
      if (err) return res.status(400).json({message: "Something went wrong!"});
      return res.json({message: "Success"});
    })
  });
});


router.get("/get-home", (req, res) => {
  Listing.find({})
    .populate("user")
    .exec(function (err, docs) {
      if (err) {
        console.log(err);
        return res.status(400).json({ message: "Something went wrong!" });
      }
      return res.json(docs);
    });
});

router.get("/get-makes", (req, res) => {
  CarMake.find({}, function (err, docs) {
    if (err) {
      console.log(err);
      return res.status(400).json({ message: "Something went wrong!" });
    }
    return res.json(docs);
  });
});

router.post("/get-models", (req, res) => {
  const { makes } = req.body;
  CarModel.find({ id_car_make: { $in: makes } }, function (err, docs) {
    if (err) {
      console.log(err);
      return res.status(400).json({ message: "Something went wrong!" });
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
  if (query.brand && query.brand.length !== 0) {
    const brands = query.brand.map((b) => b.name);
    findQuery["partBrand"] = {
      $in: brands,
    };
  }
  if (query.category && query.category.length !== 0) {
    const categories = query.category.map((b) => b.name);
    findQuery["category"] = {
      $in: categories,
    };
  }
  if (query.string) {
    findQuery["$text"] = {
      $search: query.string,
    };
  }
  const { sortBy } = query;
  try {
    const listings = await Listing.find(findQuery)
      .sort(sortBy)
      .populate("user");
    return res.json({ listings });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Something went wrong!" });
  }
});

router.get("/get", async (req, res) => {
  try {
    const sku = req.query.sku;
    const reSKU = new RegExp(`\^${sku}$`, 'i');
    let listing = await Listing.findOne({ partSKU: reSKU }).populate(
      "user"
    );
    // let similarListing = await Car.find({ make: doc.make, _id: {'$ne':doc._id } }).populate("user_id").sort("-date").limit(6);
    let sellerListingCount = await Listing.count({ user: listing.user })
    return res.json({ listing, sellerListingCount });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Something went wrong!" });
  }
});

router.get("/get-by-id", (req, res) => {
  Listing.findOne({_id: req.query.id}, async function (err, doc) {
    if (err) return res.status(400).json({message: "Something went wrong!"});
    const makeList = await CarMake.find();
    const makeObj = await CarMake.find({_id: {$in: doc.makes}});
    const makeIds = makeObj.map(m => m.id_car_make);
    const modelList = await CarModel.find({id_car_make: {$in: makeIds}});
    return res.json({...doc._doc, makeList, modelList});
  })
});

router.get("/get-count-by-category", (req, res) => {
  const aggregatorOpts = [
    {
      $group: {
        _id: "$category",
        count: { $sum: 1 },
      },
    },
  ];

  Listing.aggregate(aggregatorOpts).exec(function (err, docs) {
    if (err) {
      console.log(err);
      return res.status(400).json({message: "Something went wrong!"});
    }
    let results = {};
    docs.map((doc) => {
      results[doc._id] = doc.count;
    });
    return res.json(results);
  });
});

router.get("/get-featured-sellers", async (req, res) => {
  User.aggregate([
    { "$match": {"role": "SELLER"} },
    {
      "$lookup": {
          "from": "listings",
          "localField": "_id",
          "foreignField": "user",
          "as": "listings"
      },
    },
    { "$limit": 4 }
  ]).exec(function (err, docs) {
    if (err) {
      console.log(err);
      return res.status(400).json({message: "Something went wrong!"});
    }
    return res.json(docs);
  })
})

router.post("/cart-listings", (req, res) => {
  Listing.find({_id: {$in: req.body.listings}}, function (err, docs)  {
    if (err) {
      console.log(err);
      return res.status(400).json({message: "Something went wrong!"});
    }
    return res.json(docs);
  })
});

router.get("/set-visibility", (req, res) => {
  Listing.updateOne({_id: req.query.id}, {$set: {hide: req.query.visibility}}, (err, doc) => {
    if (err) return res.status(400).json({message: "Something went wrong!"});
    return res.json({message: "Success"});
  })
});

module.exports = router;
