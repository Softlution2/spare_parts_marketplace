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

const Payment = require("../../models/Payment");

router.post("/save-payment", async (req, res) => {
    const data = req.body;
    
    try {
        payment = await Payment.create(data);
    } catch (err) {
        payment = null;
        return res.status(400).json({message: 'Something went wrong!', error: err});
    }

    return res.json({
        payment,
    });
})

module.exports = router;
