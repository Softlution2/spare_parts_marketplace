const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  email: {
    type: String,
  },
  phone: {
    type: Array,
  },
  avatar: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  method: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
  }, 
  last_login_date: {
    type: Date,
    default: Date.now
  },
  last_seen: {
    type: Date,
    default: Date.now
  },
  date: {
    type: Date,
    default: Date.now,
  }
});

module.exports = User = mongoose.model("users", UserSchema);
