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

const Address = require("../../models/Address");

router.post("/create-user-address", async (req, res) => {
    const data = req.body;
    let address
    
    try {
        address = data;
        if (address.default_address) {
          await Address.updateMany({default_address: false});
        }

        newAddress = await Address.findOne({ _id: address.id })
        
        if (newAddress) {          
          newAddress.first_name = address.first_name;
          newAddress.last_name = address.last_name;
          newAddress.address = address.address;
          newAddress.suburb = address.suburb;
          newAddress.state = address.state;
          newAddress.postcode = address.postcode;
          newAddress.country = address.country;
          newAddress.default_address = address.default_address;
          newAddress.user = address.user;
          await newAddress.save();
        } else {
          newAddress = await Address.create(address);
        }
    } catch (err) {
        address = null;
        return res.status(400).json({message: 'Something went wrong!', error: err});
    }

    return res.json({
        newAddress,
    });
})
router.get("/get-user-address", async (req, res) => {
  const { user_id } = req.query;
  
  let addresses;
  try {
    addresses = await Address.find({ user: user_id }).sort("default_address").populate("user");
  } catch (err) {
    addresses = [];
    return res.status(400).json({message: 'Something went wrong!', error: err});
  }

  return res.json({
    addresses,
  });
});

module.exports = router;
