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
        address = await Address.create(address);
    } catch (err) {
        address = null;
        return res.status(400).json({message: 'Something went wrong!', error: err});
    }

    return res.json({
        address,
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
