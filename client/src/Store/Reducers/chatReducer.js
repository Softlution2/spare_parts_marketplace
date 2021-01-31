const initState = {
  rooms: [],
  onlineUsers: null,
  typingUsers: [],
  unreadMsgCnt: 0,
  activeRoom: null,
  messages: [],
  loading: false
}

const ChatReducer = (state = initState, action) => {
  switch (action.type) {
    case "INITIALIZE":
      return {
        ...state,
        activeRoom: null,
        rooms: action.rooms,
        unreadMsgCnt: action.unreadMsgCnt,
        onlineUsers: null,
        typingUsers: [],
        messages: [],
        loading: false,
      };
    case "SET_ONLINE_USERS":
      return {
        ...state,
        onlineUsers: action.onlineUsers
      };
    case "SET_MESSAGES":
      return {
        ...state,
        messages: action.messages,
        unreadMsgCnt: state.unreadMsgCnt - action.newReadMsg
      };
    case "ADD_MESSAGE":
      let newMessages = state.messages;
      newMessages.push({ 
        room: action.data.roomId,
        message: action.data.message,
        sender: action.data.sender,
        status: "read",
        createdAt: new Date(),
      });
      return {
        ...state,
        messages: newMessages
      };
    case "UPDATE_ROOMS":
      return {
        ...state,
        rooms: action.data
      }
    case "UPDATE_ACTIVE_ROOM":
      return {
        ...state,
        activeRoom: action.data
      };
    case "ADD_TYPING_USER":
      const info = action.data;
      let newTypingUsers = state.typingUsers;
      newTypingUsers.push(info);
      return {
        ...state,
        typingUsers: newTypingUsers
      };
    case "REMOVE_TYPING_USER":
      const rInfo = action.data;
      newTypingUsers = state.typingUsers;
      newTypingUsers.filter(function (e) { return e.sender !== rInfo.sender && e.roomId !== rInfo.roomId });
      return {
        ...state,
        typingUsers: newTypingUsers
      };
    case "SET_ACTIVE_ROOM":
      const foundIndex = state.rooms.findIndex(
        (x) => x.roomId === action.roomId
      );
      return {
        ...state,
        activeRoom: state.rooms[foundIndex],
      };
    case "UPDATE_MESSAGES":
      return {
        ...state,
        messages: action.data
      }
    case "INCREASE_UNREAD_MESSAGE":
      return {
        ...state,
        unreadMsgCnt: state.unreadMsgCnt + 1
      }
    default:
      return state;
  }
};
export default ChatReducer;
