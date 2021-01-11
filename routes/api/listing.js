const express = require("express");
const router = express.Router();

const Car = require("../../models/Car");
const Callback = require("../../models/Callback");
const {ObjectId} = require('mongodb'); // or ObjectID 

router.post("/initialize", async (req, res) => {
  let findQuery = {};
  const { search, tag, make } = req.body;
  if (search && search !== null) {
    findQuery['$text'] = {
      $search: search
    };
  }
  if (tag && tag !== null) {
    findQuery['tags'] = tag;
  }
  if (make && make !== null) {
    let makeStr = make.replace("-", " ");
    const re = new RegExp(`\^${makeStr}$`, 'i');
    findQuery['make'] = re;
  }
  let listings, maxPrice, minPrice, maxMileage, minMileage, maxYear, minYear, makeList, transmissionList, colorList;
  try {
    listings = await Car.find(findQuery).sort("-date").populate("user_id");
  } catch(err) {
    listing = [];
  }
  
  try {
    maxPrice = (await Car.findOne({}).sort("-price")).price;
  } catch(err) {
    maxPrice = 0;
  }
  
  try {
    minPrice = (await Car.findOne({}).sort("price")).price;
  } catch(err) {
    minPrice = 0;
  }
  
  try {
    maxMileage = (await Car.findOne({}).sort("-mileage")).mileage;
  } catch(err) {
    maxMileage = 0;
  }
  
  try {
    minMileage = (await Car.findOne({}).sort("mileage")).mileage;
  } catch(err) {
    minMileage = 0;
  }
  
  try {
    maxYear = (await Car.findOne({}).sort("-year")).year;
  } catch(err) {
    maxYear = 0;
  }
  
  try {
    minYear = (await Car.findOne({}).sort("year")).year;
  } catch(err) {
    minYear = 0;
  }
  
  try {
    makeList = await Car.distinct("make");
  } catch(err) {
    makeList = [];
  }
  
  try {
    transmissionList = await Car.distinct("transmission");
  } catch(err) {
    transmissionList = [];
  }
  
  try {
    colorList = await Car.distinct("color");
  } catch(err) {
    colorList = [];
  }
  return res.json({
    listings,
    maxPrice,
    minPrice,
    maxMileage,
    minMileage,
    maxYear,
    minYear,
    makeList,
    transmissionList,
    colorList
  });
});

router.get("/get-my-listing", async (req, res) => {
  const { user_id } = req.query;
  
  let listings, maxPrice, minPrice, maxMileage, minMileage, maxYear, minYear, makeList, transmissionList, colorList;
  try {
    listings = await Car.find({ user_id }).sort("-date").populate("user_id");
  } catch(err) {
    listing = [];
  }
  
  try {
    maxPrice = (await Car.find({ user_id }).sort("-price")).price;
  } catch(err) {
    maxPrice = 0;
  }
  
  try {
    minPrice = (await Car.find({ user_id }).sort("price")).price;
  } catch(err) {
    minPrice = 0;
  }
  
  try {
    maxMileage = (await Car.find({ user_id }).sort("-mileage")).mileage;
  } catch(err) {
    maxMileage = 0;
  }
  
  try {
    minMileage = (await Car.find({ user_id }).sort("mileage")).mileage;
  } catch(err) {
    minMileage = 0;
  }
  
  try {
    maxYear = (await Car.find({ user_id }).sort("-year")).year;
  } catch(err) {
    maxYear = 0;
  }
  
  try {
    minYear = (await Car.find({ user_id }).sort("year")).year;
  } catch(err) {
    minYear = 0;
  }
  
  try {
    makeList = await Car.find({ user_id }).distinct("make");
  } catch(err) {
    makeList = [];
  }
  
  try {
    transmissionList = await Car.find({ user_id }).distinct("transmission");
  } catch(err) {
    transmissionList = [];
  }
  
  try {
    colorList = await Car.find({ user_id }).distinct("color");
  } catch(err) {
    colorList = [];
  }
  return res.json({
    listings,
    maxPrice,
    minPrice,
    maxMileage,
    minMileage,
    maxYear,
    minYear,
    makeList,
    transmissionList,
    colorList
  });
});

router.get("/get-my-favorites", async (req, res) => {
  const { user_id } = req.query;
  try {
    const listings = await Car.find({ favourite_users: user_id }).populate(
      "user_id"
    );
    return res.json({ listings });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Something went wrong!" });
  }
});

router.get("/get-all", async (req, res) => {
  try {
    let docs = await Car.find({}).sort("-date").populate("user_id");
    return res.json(docs);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Something went wrong!" });
  }
});

router.get("/get", async (req, res) => {
  let refCode = req.query.ref_code;
  try {
    let doc = await Car.findOne({ reference_code: refCode }).populate("user_id");
    let similarListing = await Car.find({ make: doc.make, _id: {'$ne':doc._id } }).populate("user_id").sort("-date").limit(6);
    let userListings = await Car.count({ user_id: doc.user_id })
    return res.json({listing: doc, similarListing, userListings});
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Something went wrong!" });
  }
});

router.post("/set-favourite", async (req, res) => {
  const { listing_id, user_id } = req.body;
  Car.findOne({ _id: listing_id }, function (err, listing) {
    if (err) {
      console.log(err);
      return res.status(404).json({ message: "Something went wrong!" });
    }
    if (listing.favourite_users.indexOf(user_id) !== -1)
      listing.favourite_users.pull(user_id);
    else listing.favourite_users.addToSet(user_id);
    listing.save();
    res.json(listing);
  });
});

router.get("/get-user-listings", async (req, res) => {
  const seller_id = req.query.seller_id;
  const listings = await Car.find({user_id: seller_id}).populate('user_id');
  return res.json({listings});
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
    findQuery["make"] = {
      $in: query.make,
    };
  }
  if (query.year && query.year.length !== 0) {
    findQuery["year"] = {
      $gte: query.year[0],
      $lte: query.year[1],
    };
  }
  if (query.mileage) {
    findQuery["mileage"] = {
      $gte: query.mileage[0],
      $lte: query.mileage[1],
    };
  }
  if (query.transmission && query.transmission.length !== 0) {
    findQuery["transmission"] = {
      $in: query.transmission,
    };
  }
  if (query.colors && query.colors.length !== 0) {
    findQuery["color"] = {
      $in: query.colors,
    };
  }
  if (query.string) {
    findQuery["$text"] = {
      $search: query.string,
    };
  }
  if (query.tags && query.tags.length !== 0) {
    findQuery["tags"] = {
      $in: query.tags
    };
  }
  const { sortBy } = query;
  try {
    const listings = await Car.find(findQuery).sort(sortBy).populate("user_id");
    return res.json({ listings });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Something went wrong!" });
  }
});

router.post("/add-callback", (req, res) => {
  const newCall = new Callback({
    ...req.body
  });
  newCall.save();
  return res.json({message: "success"});
});


router.get("/get-callbacks", (req, res) => {
  const userId = req.query.user_id;
  Callback.aggregate(
    [
      { "$lookup": {
        "from": "cars",
        "localField": "listing",
        "foreignField": "_id",
        "as": "listing"
      }},
      { "$unwind": "$listing" },
      { "$match": { "listing.user_id": ObjectId(userId) } },
    ],
    function(err, result) {
      return res.json({list: result});
      // "tags" is now filtered by condition and "joined"
    }
  )
});

module.exports = router;
