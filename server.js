const http = require('http');
const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const socketio = require('socket.io');
const onlineUsers = {};

require('dotenv').config();
const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  
  handlePreflightRequest: (req, res) => {
    const headers = {
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Origin": req.headers.origin, //or the specific origin you want to give access to,
        "Access-Control-Allow-Credentials": true
    };
    res.writeHead(200, headers);
    res.end();
  }
});


const users = require("./routes/api/users");
const listing = require("./routes/api/listing");
const message = require("./routes/api/message");
const chat_room = require("./routes/api/chat_room");
const store = require("./routes/api/store");

app.use(cors());

// Bodyparser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/'));
// app.use(express.static(__dirname + '/client/build/'));



// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// mongoose
//   .connect(
//     process.env.DB_CONN,
//     {
//       auth: { user: process.env.DB_USER, password: process.env.DB_PW }, useNewUrlParser: true
//     }
//   )
//   .then(() => console.log("MongoDB successfully connected"))
//   .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);
app.use("/api/listing", listing);
app.use("/api/message", message);
app.use("/api/chat-rooms", chat_room);
app.use("/api/store", store);

// Load User model
const User = require("./models/User");

io.on('connection', (socket) => {
  // Get connected user id
  const userId = socket.handshake.query.userId;

  // Set user as online
  onlineUsers[userId] = socket.id;

  // Notify new user to all online users
  socket.broadcast.emit('init', onlineUsers);
  socket.emit('init', onlineUsers);

  // User disconnected
  socket.on('disconnect', () => {
    console.log("Client is disconnected - " + socket.id);
    let disconnectedUserId = null;
    // Remove disconnected user from online users
    for(prop in onlineUsers) {
      if (onlineUsers[prop] === socket.id) {
        disconnectedUserId = prop;
        delete onlineUsers[prop];
        break;
      }
    }

    if (disconnectedUserId) {
      User.findByIdAndUpdate(disconnectedUserId, {$set: {last_seen: new Date()}}, function (err, doc) {
        if (err)
          console.log(err);
      });
    }

    // Notify disconnected user to all online users
    socket.broadcast.emit('user_disconnected', onlineUsers);
  });

  // Event for start typing
  socket.on("start-typing", (data) => {
    const info = JSON.parse(data);
    socket.to(onlineUsers[info.receiver]).emit('user-start-typing', {sender: info.sender, roomId: info.roomId});
  });
  
  // Event for stop typing
  socket.on("stop-typing", (data) => {
    const info = JSON.parse(data);
    socket.to(onlineUsers[info.receiver]).emit('user-stop-typing', {sender: info.sender, roomId: info.roomId});
  });

  // Event for sending message
  socket.on("send-message", (data) => {
    const info = JSON.parse(data);
    const { sender, roomId, message, receiver } = info;
    const newMessage = new MessageModel({
      room: roomId,
      sender,
      message,
      status: "unread"
    });
    newMessage.save();
    socket.to(onlineUsers[receiver]).emit('receive-message', newMessage);
    // socket.emit('message-sent-success', newMessage);
    // .then((msg) => {
      
    // }).catch((err) => {
    //   socket.emit('message-sent-failed', msg);
    // });
  });
});

const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`Server up and running on port ${port} !`));
