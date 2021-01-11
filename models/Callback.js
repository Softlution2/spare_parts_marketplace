const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CallbackSchema = new Schema({
  listing: {
    type : Schema.Types.ObjectId,
    ref: "cars",
    required: true,
  },
  name: {
    type: String,
  },
  phone: {
    type: String,
  },
  date: {
    type: Date,
    defualt: Date.now
  },
});

module.exports = Callback = mongoose.model("callback", CallbackSchema);
