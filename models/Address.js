const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const AddressSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  suburb: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  }, 
  postcode: {
    type: String,
    required: true
  },
  country: {
    type: String
  },
  default_address: {
    type: Boolean,
    default: false,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

module.exports = Address = mongoose.model("addresses", AddressSchema);
