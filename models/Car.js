const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CarSchema = new Schema({
  reference_code: {
    type: String,
    required: true,
    unique: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  favourite_users: [
    { type : Schema.Types.ObjectId, ref: 'users' },
  ],
  featured_photo: {
    type: String,
    required: true,
  },
  photos: {
    type: Array,
    required: true,
  },
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    requried: true,
  },
  year: {
    type: Number,
    requried: true
  },
  price: {
    type: Number,
    requried: true,
  },
  currency: {
    type: String,
    required: true,
  },
  transmission: {
    type: String,
    required: true,
  },
  mileage: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    requried: true,
  },
  version: {
    type: String,
  },
  type: {
    type: String,
  },
  tags: {
    type: Array,
  },
  options: {
    type: Array,
  },
  date: {
    type: Date,
    default: Date.now,
  }
});

CarSchema.index({ make: 'text', model: 'text', description: 'text', version: 'text', year: 'text' })

module.exports = Car = mongoose.model("cars", CarSchema);
