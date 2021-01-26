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
  type: {
    type: String,
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
  partHSCode: {
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
  makes: [
    { type : Schema.Types.ObjectId, ref: 'car_makes' },
  ],
  models: [
    { type : Schema.Types.ObjectId, ref: 'car_models' },
  ],
  fittingPosition: {
    type: String
  },
  heightDimension: {
    type: Number,
  },
  widthDimension: {
    type: Number,
  },
  depthDimension: {
    type: Number,
  },
  weight: {
    type: Number,
  },
  clickCollect: {
    type: Boolean,
  },
  delivery: {
    type: Boolean,
  },
  countryOrigin: {
    type: String
  },
  hide: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  }
});

ListingSchema.index({ partName: 'text', partSKU: 'text', description: 'text', category: 'text', subCategory: 'text' })

module.exports = Listing = mongoose.model("listings", ListingSchema);
