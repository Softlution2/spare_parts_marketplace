const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ListingSchema = new Schema({
  pic: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  subCategory: {
    type: String,
    required: true,
  },
  partName: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    requried: true,
  },
  partBrand: {
    type: String,
    requried: true
  },
  partSKU: {
    type: String,
    requried: true,
  },
  currency: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  }
});

ListingSchema.index({ partName: 'text', partSKU: 'text', description: 'text', category: 'text', subCategory: 'text' })

module.exports = Listing = mongoose.model("listings", ListingSchema);
