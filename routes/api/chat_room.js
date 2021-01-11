const express = require("express");
const moment = require("moment");
const router = express.Router();

const Room = require("../../models/Room");
const Message = require("../../models/Message");

const compare = ( a, b ) => {
  const aTime = moment(a.lastTime);
  const bTime = moment(b.lastTime);
  if ( aTime > bTime ){
    return -1;
  }
  if ( aTime < bTime ){
    return 1;
  }
  return 0;
}


router.get("/get-user-rooms", async (req, res) => {
  const userId = req.query.userId;
  let rooms = [];
  try {
    rooms = await Room.find({
      $or: [
        { seller: userId },
        { buyer: userId },
      ]
    }).populate('seller').populate('buyer').populate('listing').populate({
      path: "listing",
      populate: {
        path: "user_id",
        model: "users",
      }});
  } catch (err) {
    console.log(err);
    return res.status(400).json({message: 'Something went wrong!'});
  }
  let convRooms = [];
  let roomInfos = await Promise.all(
    rooms.map(async (room) => {
      let m_user;
      if (userId.toString() === room.seller._id.toString()) {
        m_user = room.buyer;
      }
      else if (userId.toString() === room.buyer._id.toString()) {
        m_user = room.seller;
      }
      let lastMsg, lastTime = null;
      const lastMsgObj = (await MessageModel.find({ room: room._id }).sort({ createdAt: -1 }).limit(1));
      const unreadMsgCnt = await MessageModel.count({ status: "unread", sender: m_user._id, room: room._id });
      if (lastMsgObj.length !== 0) {
        lastMsg = lastMsgObj[0].message;
        lastTime = lastMsgObj[0].createdAt;
      }
      convRooms.push(room._id);
      return {
        roomId: room._id,
        userId: m_user._id,
        userName: m_user.name,
        userAvatar: m_user.avatar,
        userPhone: m_user.phone ? m_user.phone[0] : null,
        lastMsg,
        unreadMsgCnt,
        lastTime,
        listing: room.listing,
      }
    })
  );
  
  const unreadMsgCnt = await Message.count({room: {$in: convRooms}, status: "unread", sender: {$ne: userId}})
  return res.json({roomInfos, unreadMsgCnt});
});

router.post("/add", async (req, res) => {
  const { buyer_id, listing_id, seller_id } = req.body;
  Room.findOne({
    $and: [
      { listing: listing_id },
      { $or: [
        { $and: [ { seller: seller_id }, { buyer: buyer_id } ] },
        { $and: [ { seller: buyer_id }, { buyer: seller_id } ] },
      ] }
    ]
  }).populate("seller").populate("listing").exec(async (err, doc) => {
    if (doc) {
      return res.json({activeRoomId: doc._id});
    }
    const newModel = new Room({
      seller: seller_id,
      buyer: buyer_id,
      listing: listing_id
    });
    newModel.save();
    return res.json({ activeRoomId: newModel._id });
  });
});

module.exports = router;
