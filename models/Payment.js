const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const PaymentSchema = new Schema({
  card_name: {
    type: String,
    required: true,
  },
  card_number: {
    type: String,
    required: true,
  },
  expired_month: {
    type: String,
    required: true,
  },
  expired_year: {
    type: String,
    required: true
  },
  security_code: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

module.exports = Payment = mongoose.model("payments", PaymentSchema);
