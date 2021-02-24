const express = require("express");
const router = express.Router();
const request = require('request');

router.get("/get-manufacturers", async (req, res) => {
    request({
        url: "https://webservice.tecalliance.services/pegasus-3-0/services/TecdocToCatDLB.jsonEndpoint?api_key=2BeBXg6FCW3dkknqHpPEgM3Kpt5bFq3ttZiwZJa3BhdYvx8dLk9p",
        method: "POST",
        body: {
            "getManufacturers2": {
                "country": "AE",
                "lang": "en",
                "linkingTargetType": "P",
                "provider": 22610
            }
        },
        json: true,
      }, function (err, resp, data) {
        if (err)
            return res.status(400).json({message: "Something went wrong!"});
        return res.json(data.data.array);
    });
});

router.get("/get-models", async (req, res) => {
    request({
        url: "https://webservice.tecalliance.services/pegasus-3-0/services/TecdocToCatDLB.jsonEndpoint?api_key=2BeBXg6FCW3dkknqHpPEgM3Kpt5bFq3ttZiwZJa3BhdYvx8dLk9p",
        method: "POST",
        body: {
            "getModelSeries2": {
                "country": "AE",
                "lang": "en",
                "linkingTargetType": "P",
                "manuId": req.query.manuId,
                "provider": 22610
            }
        },
        json: true,
      }, function (err, resp, data) {
        if (err)
            return res.status(400).json({message: "Something went wrong!"});
        return res.json(data.data.array);
    });
});

router.get("/get-engines", async (req, res) => {
    request({
        url: "https://webservice.tecalliance.services/pegasus-3-0/services/TecdocToCatDLB.jsonEndpoint?api_key=2BeBXg6FCW3dkknqHpPEgM3Kpt5bFq3ttZiwZJa3BhdYvx8dLk9p",
        method: "POST",
        body: {
            "getVehicleIdsByCriteria": {
                "carType": "P",
                "countriesCarSelection": "AE",
                "lang": "en",
                "manuId": req.query.manuId,
                "modId": req.query.modId,
                "provider": 22610
            }
        },
        json: true,
      }, function (err, resp, data) {
        if (err)
            return res.status(400).json({message: "Something went wrong!"});
        return res.json(data.data.array);
    });
});

router.get("/get-articles", async (req, res) => {
    request({
        url: "https://webservice.tecalliance.services/pegasus-3-0/services/TecdocToCatDLB.jsonEndpoint?api_key=2BeBXg6FCW3dkknqHpPEgM3Kpt5bFq3ttZiwZJa3BhdYvx8dLk9p",
        method: "POST",
        body: {
            "getArticles": {
              "articleCountry": "AE",
              "provider": 22610,
              "linkageTargetId": req.query.carId,
              "linkageTargetType": "P",
              "lang": "en",
              "includeAll": true
            }
        },
        json: true,
      }, function (err, resp, data) {
        if (err)
            return res.status(400).json({message: "Something went wrong!"});
        return res.json(data.articles);
    });
});
module.exports = router;
