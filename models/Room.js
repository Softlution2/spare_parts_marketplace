const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
  seller: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  buyer: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  listing: {
    type: Schema.Types.ObjectId,
    ref: "listings",
    required: true,
  }
}, {
  timestamps: true,
});

module.exports = RoomModel = mongoose.model("rooms", RoomSchema);
