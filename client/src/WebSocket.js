import React, { createContext } from 'react'
import io from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { SetOnlineUsers, Initialize, AddTypingUser, RemoveTypingUser, ReceiveNewMessage } from './Store/action/chatActions';

const WebSocketContext = createContext(null)

export { WebSocketContext }

export default ({ children }) => {
  let socket;
  let ws;

  const dispatch = useDispatch();

  const sendMessage = (roomId, sender, receiver, message) => {
    const payload = { roomId, sender, receiver, message };
    socket.emit("send-message", JSON.stringify(payload));
  }

  const startTyping = (sender, receiver, roomId) => {
    const payload = { roomId, sender, receiver };
    socket.emit("start-typing", JSON.stringify(payload));
  }

  const stopTyping = (sender, receiver, roomId) => {
    const payload = { roomId, sender, receiver };
    socket.emit("stop-typing", JSON.stringify(payload));
  }

  if (!socket) {
    // Get user login id
    const login = localStorage.getItem("login");
    if (login) { // If logged in, connect socket server
      const user = JSON.parse(login);

      // Connect Socket Server
      // socket = io(`http://localhost:5000?userId=${user._id}`, {
      //   transports: ["websocket"],
      // });
      
      socket = io(`http://13.55.69.149?userId=${user._id}`, {
        transports: ["websocket"],
      });

      // Get online users
      socket.on("init", (onlineUsers) => {
        dispatch(SetOnlineUsers(onlineUsers));
      });

      // Event if user disconnected
      socket.on("user_disconnected", (onlineUsers) => {
        dispatch(SetOnlineUsers(onlineUsers));
      });

      // Event for start typing
      socket.on("user-start-typing", (data) => {
        dispatch(AddTypingUser(data));
      });

      // Event for stop typing
      socket.on("user-stop-typing", (data) => {
        dispatch(RemoveTypingUser(data));
      });

      // Event for send message success
      socket.on("message-sent-success", (data) => {
        console.log(data);
      });

      // Event for send message failed
      socket.on("message-sent-failed", (data) => {
        console.log(data);
      });

      // Event for receive message
      socket.on("receive-message", (data) => {
        dispatch(ReceiveNewMessage(data));
      });

      dispatch(Initialize());
    }
    ws = {
      socket: socket,
      startTyping,
      stopTyping,
      sendMessage,
    }
  }

  return (
    <WebSocketContext.Provider value={ws}>
      {children}
    </WebSocketContext.Provider>
  )
}