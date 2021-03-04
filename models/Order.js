const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const OrderSchema = new Schema({
  status: {
    type: String,
    required: true
  },
  seller: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  currency: {
    type: String,
  },
  listings: {
    type: Array,
    required: true
  },
  delivery_option: {
    type: Number,
    required: true
  },
  delivery_address: {
    type: Schema.Types.ObjectId,
    ref: "addresses",
    required: true
  },
  pay_on_card: {
    type: Boolean,
    default: true
  },
  payment: {
    type: Schema.Types.ObjectId,
    ref: "payments",
    required: false
  },
  total_price: {
    type: Number,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

module.exports = Order = mongoose.model("Orders", OrderSchema);
