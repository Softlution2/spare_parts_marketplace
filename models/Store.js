const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const StoreSchema = new Schema({
  seller: {
    type : Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  opening_hours: {
    type: Object,
  },
  description: {
    type: String,
  },
  social_links: {
    type: Array,
  },
});

module.exports = Store = mongoose.model("store", StoreSchema);
