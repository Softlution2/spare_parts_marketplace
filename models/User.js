const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  details: {
    type: Object,
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
