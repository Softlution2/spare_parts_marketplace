import axios from "axios";

export const Initialize = () => {
  return async (dispatch, getState) => {
    const login = getState().login;
    if (!login)
      return Promise.resolve()
    const resp = await axios.get(`/api/chat-rooms/get-user-rooms?userId=${login._id}`);
    
    let rooms = resp.data.roomInfos.sort(function(a,b){
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(b.lastTime) - new Date(a.lastTime);
    });
    dispatch({
      type: "INITIALIZE",
      rooms,
      unreadMsgCnt: resp.data.unreadMsgCnt,
    });
  };
}

export const SetOnlineUsers = (users) => {
  return (dispatch, getState) => {
    dispatch( {
      type: 'SET_ONLINE_USERS',
      onlineUsers: users,
    })
    return Promise.resolve()
  }
}

export const UpdateRooms = (data) => {
  return (dispatch, getState) => {
    dispatch( {
      type: 'UPDATE_ROOMS',
      data
    })
    return Promise.resolve()
  }
}

export const AddMessage = (data) => {
  return (dispatch, state) => {
    dispatch( {
      type: 'ADD_MESSAGE',
      data
    })
    return Promise.resolve()
  }
}

export const GetConversations = (roomId) => {
  return async (dispatch, getState) => {
    try {
      const resp = await axios.get(`/api/message/conversations?roomId=${roomId}&userId=${getState().login._id}`);
      const newReadMsg = resp.data.newReadMsg;
      dispatch({
        type: "SET_MESSAGES",
        messages: resp.data.conversations,
        newReadMsg,
      });
      return true;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}

export const UpdateActiveRoom = (data) => {
  return (dispatch, getState) => {
    dispatch( {
      type: 'UPDATE_ACTIVE_ROOM',
      data
    })
    return Promise.resolve()
  }
}

export const AddTypingUser = (data) => {
  return (dispatch, getState) => {
    dispatch( {
      type: 'ADD_TYPING_USER',
      data,
    })
    return Promise.resolve()
  }
}

export const RemoveTypingUser = (data) => {
  return (dispatch, getState) => {
    dispatch( {
      type: 'REMOVE_TYPING_USER',
      data,
    })
    return Promise.resolve()
  }
}

export const SetActiveRoom = data => {
  const roomId = data;
  return async (dispatch, getState) => {
    dispatch( {
      type: 'SET_ACTIVE_ROOM',
      roomId
    })
    return Promise.resolve()
  }
}

export const ReceiveNewMessage = data => {
  return (dispatch, getState) => {
    const { room, message, sender, createdAt } = data;
    if (getState().chat.activeRoom && getState().chat.activeRoom.roomId === room) {
      axios.post("/api/message/set-read", { id: data._id })
      .then((res) => {
        let newMessages = getState().chat.messages;
        newMessages.push({ 
          room, message, sender,
          status: "read",
          createdAt,
        });
        let newRooms = getState().chat.rooms;
        const foundIndex = newRooms.findIndex(
          (x) => x.roomId === room
        );
        newRooms[foundIndex].lastMsg = message;
        newRooms[foundIndex].unreadMsgCnt = 0;
        dispatch( {
          type: 'UPDATE_MESSAGES',
          data: newMessages
        });

        dispatch( {
          type: 'UPDATE_ROOMS',
          data: newRooms
        });
        return Promise.resolve();
      })
      .catch((err) => {
        console.log(err);
      })
    }
    else {
      let newRooms = getState().chat.rooms;
      const foundIndex = newRooms.findIndex(
        (x) => x.roomId === room
      );
      newRooms[foundIndex]['lastMsg'] = message;
      newRooms[foundIndex]['unreadMsgCnt'] = newRooms[foundIndex]['unreadMsgCnt'] + 1;

      dispatch( {
        type: 'INCREASE_UNREAD_MESSAGE',
      });
      dispatch( {
        type: 'UPDATE_ROOMS',
        data: newRooms
      });
      return Promise.resolve();
    }
  }
}