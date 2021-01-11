const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  room: {
    type: Schema.Types.ObjectId,
    ref: "rooms",
    required: true,
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "unread",
  }
}, {
  timestamps: true,
});

module.exports = MessageModel = mongoose.model("message", MessageSchema);
