const express = require("express");
const router = express.Router();

const Store = require("../../models/Store");

router.post('/new', (req, res) => {
    let { social_links, opening_hours, description, seller } = req.body;
    social_links = JSON.parse(social_links);
    opening_hours = JSON.parse(opening_hours);
    Store.findOne({ seller: req.body.seller }).then((store) => {
        if (store) {
            Store.findOneAndUpdate({ seller: req.body.seller }, {
                $set: {
                    social_links,
                    opening_hours: opening_hours,
                    description
                }
            }, function(err, doc) {
                if (err) 
                {
                    console.log(err);
                    return res.status(400).json({message: "Something went wrong!"});
                }
                return res.json({ message: "Success" });
            })
        }
        else {
            const newStore = new Store({
                social_links,
                opening_hours,
                description,
                seller
            });
            newStore.save().then((doc) => {
                return res.json({message: "Success"});
            })
        }
    });
});

module.exports = router;
