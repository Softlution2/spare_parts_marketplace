const express = require("express");
const router = express.Router();
const request = require('request');
const fetch = require('node-fetch');
const sha1 = require('locutus/php/strings/sha1');
const formidable = require("formidable");
const fs = require('fs');
const FormData = require('form-data');

const CarMake = require("../../models/CarMake");
const CarModel = require("../../models/CarModel");
const Car = require("../../models/Car");

const {recorgnizeCountriesFromPlateNumber, getCountries} = require("../../utils");

router.get("/all-makes", async (req, res) => {
  let makes = await CarMake.find({});
  return res.json({makes});
});

router.get("/get-listing-makes", async (req, res) => {
  const aggregatorOpts = [{
      $unwind: "$make"
    },
    {
      $group: {
        _id: "$make",
        count: { $sum: 1 }
      }
    }
  ];

  Car.aggregate(aggregatorOpts).exec(function (err, docs) {
    return res.json({makes: docs});
  });
});

router.get("/get-listing-types", async (req, res) => {
  const aggregatorOpts = [{
      $unwind: "$tags"
    },
    {
      $group: {
        _id: "$tags",
        count: { $sum: 1 }
      }
    }
  ];

  Car.aggregate(aggregatorOpts).exec(function (err, docs) {
    return res.json({tagCounts: docs});
  });
});

router.get("/get-model-by-make", async (req, res) => {
  let make = req.query.make;
  const re = new RegExp(`\^${make}$`, 'i');
  let makeObj = await CarMake.findOne({name: re});
  let models = await CarModel.find({id_car_make: makeObj.id_car_make});
  return res.json({models})
});


router.post("/decode-vin-number", async (req, res) => {
  let vinNumber = req.query.vin;
  const apiPrefix = "https://api.vindecoder.eu/3.1";
  const apikey = process.env.VINDECODER_API_KEY;   // Your API key
  const secretkey = process.env.VINDECODER_SERCRET_KEY;  // Your secret key
  const id = "decode";
  const vin = vinNumber.toUpperCase();
  const controlsum = sha1(`${vin}|${id}|${apikey}|${secretkey}`).substr(0, 10);
  request(`${apiPrefix}/${apikey}/${controlsum}/decode/${vin}.json`, function (err, response, body) {
    res.json({result: body});
  })
});


router.post("/deocde-vin-photo", async (req, res) => {
  
  let documents = [];
  const form = new formidable.IncomingForm();
  form.parse(req)
  form.on("fileBegin", function (name, file) {
    let currentTime = new Date().getTime();
    file.path = __dirname + '/../../uploads/' + currentTime + '.' + file.name.split('.')[1];
    documents.push(currentTime + '.' + file.name.split('.')[1]);
  });

  form.on("file", function (name, file) {
  });
  
  form.on("end", async function() {
    // Imports the Google Cloud client library
    const vision = require('@google-cloud/vision');

    // Creates a client
    const client = new vision.ImageAnnotatorClient();
    // Performs text detection on the image file
    
    const [result] = await client.textDetection(__dirname + '/../../uploads/' + documents[0]);
    let vinNumber = null;
    result.textAnnotations.forEach(text => {
      if (text.description.length === 17) {
        if (text.description.match("^[A-Za-z0-9]+$")) {
          vinNumber = text.description;
        }
        return;
      }
    });
    const apiPrefix = "https://api.vindecoder.eu/3.1";
    const apikey = process.env.VINDECODER_API_KEY;   // Your API key
    const secretkey = process.env.VINDECODER_SERCRET_KEY;  // Your secret key
    const id = "decode";
    const vin = vinNumber.toUpperCase();
    const controlsum = sha1(`${vin}|${id}|${apikey}|${secretkey}`).substr(0, 10);
    fs.unlinkSync(__dirname + '/../../uploads/' + documents[0]);
    request(`${apiPrefix}/${apikey}/${controlsum}/decode/${vin}.json`, function (err, response, body) {
      res.json({result: body});
    })
  })
});


router.post("/car-recognition", async(req, res) => {
  let photo = null;
  const form = new formidable.IncomingForm();

  form.parse(req)
  form.on("fileBegin", function (name, file) {
    let currentTime = new Date().getTime();
    file.path = __dirname + '/../../uploads/' + currentTime + '.' + file.name.split('.')[1];
    photo = currentTime + '.' + file.name.split('.')[1];
  });

  form.on("file", function (name, file) {
  });
  
  form.on("end", function() {
    let fileBuffer = fs.readFileSync(__dirname + '/../../uploads/' + photo);
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
      body.append('upload', fs.createReadStream(__dirname + '/../../uploads/' + photo));
      fetch("https://api.platerecognizer.com/v1/plate-reader/", {
          method: 'POST',
          headers: {
            "Authorization": process.env.PLATE_RECOGNIZER_API_TOKEN,
          },
          body: body
      }).then(res => res.json())
      .then(json => {
        if (json.status_code === 400) {
          return res.status(400).json({message: "Platerecognizer API error!"});
        }
        let recogResult = {
          result: "",
          extra: "",
        }
        if (json.results.length !== 0) {
          recogResult = recorgnizeCountriesFromPlateNumber(json.results[0]['plate']);
        }
        const apiResults = JSON.parse(data);
        let detections = apiResults.detections;
        let vehicleDetails = {
          make: detections[0].mm[0].make_name,
          model: detections[0].mm[0].model_name,
          generation: detections[0].mmg[0].generation_name,
          year: detections[0].mmg[0].years,
          generation: detections[0].mmg[0].generation_name,
          colour: detections[0].color[0].name,
          countries: getCountries(recogResult.result.toString()),
          plateNumber: json.results.length === 0 ? '' : json.results[0]['plate'],
          provience: recogResult.extra,
        }
        fs.unlinkSync(__dirname + '/../../uploads/' + photo);
        return res.json({details: vehicleDetails});
      })
      .catch((err) => {
        fs.unlinkSync(__dirname + '/../../uploads/' + photo);
        return res.status(400).json({message: "Something went wrong. please try again."})
      });
    });

  })
})


router.post("/car-plate-recognition", async(req, res) => {
  let photo = null;
  const form = new formidable.IncomingForm();

  form.parse(req)
  form.on("fileBegin", function (name, file) {
    let currentTime = new Date().getTime();
    file.path = __dirname + '/../../uploads/' + currentTime + '.' + file.name.split('.')[1];
    photo = currentTime + '.' + file.name.split('.')[1];
  });

  form.on("file", function (name, file) {
  });
  
  form.on("end", function() {
    let body = new FormData();
    body.append('upload', fs.createReadStream(__dirname + '/../../uploads/' + photo));
    fetch("https://api.platerecognizer.com/v1/plate-reader/", {
        method: 'POST',
        headers: {
          "Authorization": process.env.PLATE_RECOGNIZER_API_TOKEN,
        },
        body: body
    }).then(res => res.json())
    .then(json => {
      if (json.status_code === 400) {
        return res.status(400).json({message: "Platerecognizer API error!"});
      }
      let recogResult = {
        result: "",
        extra: "",
      }
      if (json.results.length !== 0) {
        recogResult = recorgnizeCountriesFromPlateNumber(json.results[0]['plate']);
      }
      let vehicleDetails = {
        countries: getCountries(recogResult.result.toString()),
        plateNumber: json.results.length === 0 ? '' : json.results[0]['plate'],
        provience: recogResult.extra,
      }
      fs.unlinkSync(__dirname + '/../../uploads/' + photo);
      return res.json({details: vehicleDetails});
    })
  })
});

module.exports = router;
