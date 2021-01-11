const express = require("express");
const router = express.Router();

const Message = require("../../models/Message");
const Room = require("../../models/Room");

router.post("/get-info", async (req, res) => {
  const { user_id } = req.body;
  const members = await Room.find({
    $or: [
      { seller: user_id },
      { buyer: user_id },
    ]
  }).populate('seller').populate('buyer').populate('listing').populate({
    path: "listing",
    populate: {
      path: "user_id",
      model: "users",
    }});
  const memberInfos = await Promise.all(
    members.map(async (member) => {
      let m_user;
      if (user_id.toString() === member.seller._id.toString()) {
        m_user = member.buyer;
      }
      else if (user_id.toString() === member.buyer._id.toString()) {
        m_user = member.seller;
      }
      let lastMsg, lastTime = null;
      const lastMsgObj = (await Message.find({sender: m_user._id, receiver: user_id, listing: member.listing}).sort({ createdAt: -1 }).limit(1));
      const unreadMsgCnt = await Message.count({status: "unread", sender: m_user._id, listing: member.listing});
      if (lastMsgObj.length !== 0) {
        lastMsg = lastMsgObj[0].message;
        lastTime = lastMsgObj[0].createdAt;
      }
      return {
        id: m_user._id,
        name: m_user.name,
        avatar: m_user.avatar,
        lastMsg,
        unreadMsgCnt,
        lastTime,
        listing: member.listing,
      }
    })
  );
  return res.json({members: memberInfos});
});

router.get('/conversations', async (req, res) => {
  const roomId = req.query.roomId;
  const userId = req.query.userId;
  const newReadMsg = await Message.count({ sender: { $ne: userId }, room: roomId, status: "unread" });
  await Message.updateMany({ room: roomId }, {
    $set: { status: "read" }
  });
  
  const conversations = await Message.find({ room: roomId });
  return res.json({conversations, newReadMsg});
});

router.post('/save', async (req, res) => {
  const { sender, receiver, content } = req.body;
  const newMessage = new Message({
    sender,
    receiver,
    message: content,
  });
  newMessage.save().then((msg) => {
    return res.json({message: 'success'});
  }).catch((err) => {
    console.log(err);
    return res.status(400).json({message: "Something went wrong!"});
  })
});

router.post('/set-read', async (req, res) => {
  const { id } = req.body;
  try {
    await Message.updateOne({ _id: id }, { $set: {status: 'read'} });
    return res.json({message: "Success"});
  }
  catch (err) {
    console.log(err);
    return res.status(400).json({message: "Failed"});
  }
});

module.exports = router;
