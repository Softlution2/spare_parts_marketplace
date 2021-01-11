const express = require("express");
const router = express.Router();
const formidable = require("formidable");
const request = require('request');
const fetch = require('node-fetch');
const path = require('path');
const fs = require('fs');
const FormData = require('form-data');
const crypto = require("crypto");
const AWS = require('aws-sdk');

const Car = require("../../models/Car");

const tags = [
  "Hatchback",
  "Family Car",
  "Mid-size Car",
  "Compact Car",
  "Sport Utility Vehicle",
  "Mini SUV",
  "Sedan",
  "City Car",
  "Coupé",
  "Minivan",
  "Pickup Truck",
  "Hardtop",
  "Crossover Suv",
  "Convertible",
  "Luxury Vehicle",
  "Sports Car",
  "Subcompact Car",
];

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

router.post("/upload-photos", async (req, res) => {
  let photos = [];
  const form = new formidable.IncomingForm();
  let featuredCar = null;
  let otherCars = [];
  form.parse(req)
  form.on("fileBegin", function (name, file) {
    let currentTime = new Date().getTime();
    file.path = __dirname + '/../../uploads/' + currentTime + '.' + file.name.split('.')[1];
    photos.push(currentTime + '.' + file.name.split('.')[1]);
    if (name === 'featured_photo') {
      featuredCar = currentTime + '.' + file.name.split('.')[1];
    }
    otherCars.push(currentTime + '.' + file.name.split('.')[1]);
  });

  form.on("file", function (name, file) {
  });
  
  form.on("end", function() {
    let fileBuffer = fs.readFileSync(__dirname + '/../../uploads/' + featuredCar);
    request({
      url: "https://api.carnet.ai/v2/mmg/detect?features=mm,mmg,color,angle",
      method: "POST",
      headers: {
        'Content-Type': 'application/octet-stream',
        'Api-Key': process.env.CARNET_API_KEY
      },
      body: fileBuffer
    }, function (err, resp, data) {
      if (err) {
        return res.status(400).json({message: err});
      }
      let body = new FormData();
      body.append('upload', fs.createReadStream(__dirname + '/../../uploads/' + featuredCar));
      fetch("https://api.platerecognizer.com/v1/plate-reader/", {
          method: 'POST',
          headers: {
              "Authorization": process.env.PLATE_RECOGNIZER_API_TOKEN,
          },
          body: body
      }).then(res => res.json())
      .then(async json => {
        if (json.status_code === 400) {
          return res.status(400).json({message: "Platerecognizer API error!"});
        }
        const apiResults = JSON.parse(data);
        let detections = apiResults.detections;
        const years = (detections[0].mmg[0].years).split("-");
        let vehicleDetails = {
          make: detections[0].mm[0].make_name,
          model: detections[0].mm[0].model_name,
          version: detections[0].mmg[0].generation_name,
          year: parseInt(years[0].trim()),
          color: detections[0].color[0].name,
        }
        
        let finalTags = [];

        // Imports the Google Cloud client library
        const vision = require('@google-cloud/vision');

        // Creates a client
        const client = new vision.ImageAnnotatorClient();
        // Performs text detection on the image file

        const [result] = await client.labelDetection(__dirname + '/../../uploads/' + featuredCar);
        result.labelAnnotations.forEach(text => {
          if (tags.includes(text.description)) {
            finalTags.push(text.description)
          }
        });
        vehicleDetails["tags"] = finalTags;
        return res.json({vehicle_details: vehicleDetails, featured_car: featuredCar, other_cars: otherCars});
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).json({message: "Something went wrong. please try again."})
      });
    });

  })
});

router.post("/add-listing", async (req, res) => {
  let code = "";
  let s3Files = [];
  let s3FeaturedPhoto = "";
  while(1) {
    code = crypto.randomBytes(4).toString("hex");
    const sameListing = await Car.find({reference_code: code}).count();
    if (sameListing == 0)
      break;
  }
  const { photos, featured_photo } = req.body;
  await Promise.all(
    photos.map(async (photo) => {
      const file = fs.readFileSync("uploads/" + photo);
      const rawBytes = await crypto.pseudoRandomBytes(16);
      const fileName = rawBytes.toString('hex') + Date.now() + path.extname(photo);
      const params = {
        Bucket: 'spare-parts-marketplace',
        Key: fileName,
        Body: file
      };
      const data = await s3.upload(params).promise();
      s3Files.push(data.Location);
      try {
        fs.unlinkSync("uploads/" + photo);
      } catch (err) {
        console.log(err);
      }
      if (photo === featured_photo) s3FeaturedPhoto = data.Location;
    })
  );
  const newCar = new Car({
    reference_code: code,
    ...req.body,
    photos: s3Files,
    featured_photo: s3FeaturedPhoto
  });
  newCar.save(function (err, obj) {
    if (err) {
      console.log(err);
      return res.status(400).json({message: "Something went wrong!"});
    }
    return res.status(200).json({message: 'success'});
  })
});

module.exports = router;
