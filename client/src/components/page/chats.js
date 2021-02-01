import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import axios from "axios";
import RSC from "react-scrollbars-custom";
import moment from "moment";
import $ from "jquery";
import Header from "../layout/header";
import PreHeader from "../layout/pre-header";
import { WebSocketContext } from '../../WebSocket';
import { UpdateRooms, UpdateActiveRoom, AddMessage, GetConversations, Initialize } from "../../Store/action/chatActions"

import { numberWithCommas } from "../../utils";

const noAction = (e) => e.preventDefault();
const getChatTime = (momentDate) => {
  const REFERENCE = moment(); // fixed just for testing, use moment();
  const TODAY = REFERENCE.clone().startOf('day');
  const YESTERDAY = REFERENCE.clone().subtract(1, 'days').startOf('day');
  if (momentDate.isSame(TODAY, 'd'))
    return "Today " + momentDate.format("h:mm A");
  if (momentDate.isSame(YESTERDAY, 'd'))
    return "Yesterday " + momentDate.format("h:mm A");
  else 
    return momentDate.format("MM/DD/YYYY - h:mm A");
}
class Chats extends Component {
  static contextType = WebSocketContext;
  constructor(props) {
    super(props);
    this.state = {
      listing: null,
      members: [],
      activeUser: this.props.chat.activeUser,
      conversations: [],
      message: null,
      connectedUsers: [],
      isTyping: false,
      typingTimeout: 0,
      typingUsers: [],
    };

    this.handleChatRoom = this.handleChatRoom.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.handleInputMessage = this.handleInputMessage.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
    this.setMessageRead = this.setMessageRead.bind(this);
    this.handleBackUserList = this.handleBackUserList.bind(this);
  }

  componentDidMount() {
    // this.props.chatRoomInitialize();
    if (this.props.chat.activeRoom)
      this.handleChatRoom(null, this.props.chat.activeRoom.roomId);
  }

  componentWillUnmount() {
    this.props.updateActiveChatRoom(null);
  }

  scrollToBottom() {
    if (this.messagesEnd) this.messagesEnd.scrollToBottom();
  }

  setMessageRead(id) {
    axios
      .post("/api/message/set-read", {
        id,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleChatRoom(e, roomId) {
    if (e)
      noAction(e);
    let { rooms } = this.props.chat;
    const foundIndex = rooms.findIndex(
      (x) => x.roomId === roomId
    );
    rooms[foundIndex].unreadMsgCnt = 0;
    this.props.updateChatRooms(rooms);
    this.props.updateActiveChatRoom(rooms[foundIndex]);
    this.props.getRoomConversations(rooms[foundIndex].roomId).then(() => {
      this.scrollToBottom();
    });

    if ($(window).width() <= 991) {
      $(".chat-window").addClass("chat-slide");
    }
  }

  handleInputMessage(e) {
    const self = this;
    // const context = this.context;

    const { isTyping, typingTimeout } = this.state;
    // const { activeRoom } = this.props.chat;
    // const senderId = this.props.login._id;

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    if (isTyping === false) {
      this.setState({ isTyping: true });
      // context.startTyping(senderId, activeRoom.userId, activeRoom.roomId);
    }
    this.setState({
      typingTimeout: setTimeout(function () {
        self.setState({ isTyping: false });
        // context.stopTyping(senderId, activeRoom.userId, activeRoom.roomId);
      }, 1000),
    });

    this.setState({ message: e.target.value });
  }

  sendMessage(e) {
    noAction(e);
    const context = this.context;
    const { message } = this.state;
    const { activeRoom } = this.props.chat;
    if (!message) return;

    let { rooms } = this.props.chat;
    const foundIndex = rooms.findIndex(
      (x) => x.roomId === activeRoom.roomId
    );
    rooms[foundIndex].lastMsg = message;

    this.props.updateChatRooms(rooms);

    this.setState({ isTyping: false, message: "" });
    context.sendMessage(activeRoom.roomId, this.props.login._id, activeRoom.userId, message);
    this.props.addNewMessage({roomId: activeRoom.roomId, sender: this.props.login._id, message});
    this.scrollToBottom();
  }

  handleBackUserList(e) {
    noAction(e);
    if ($(window).width() <= 991) {
      $(".chat-window").removeClass('chat-slide');
    }	
  }

  render() {
    const {
      message,
    } = this.state;
    const { rooms, activeRoom, onlineUsers, messages } = this.props.chat;
    return (
      <Fragment>
        <PreHeader />
        <Header />
        <div className="chat-page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-12">
                <div className="chat-window">

                  {/* Begin Chat Room List */}
                  <div className="chat-cont-left">
                    <div className="chat-header">
                      <span>Chats</span>
                    </div>
                    <form className="chat-search">
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <i className="las la-search"></i>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search"
                        />
                      </div>
                    </form>
                    <div className="chat-users-list">
                      <div className="chat-scroll">
                        {rooms.map((room, index) => {
                          return (
                            <a
                              href="#!"
                              className={`media ${
                                activeRoom &&
                                activeRoom.roomId === room.roomId
                                  ? "active"
                                  : ""
                              }`}
                              key={index}
                              onClick={(e) => this.handleChatRoom(e, room.roomId)}
                            >
                              <div className="media-img-wrap">
                                <div
                                  className={`avatar ${
                                    onlineUsers && onlineUsers[room.userId]
                                      ? "avatar-online"
                                      : "avatar-away"
                                  }`}
                                >
                                  <img
                                    src={room.userAvatar ? `${room.userAvatar}` : '/assets/img/avatar.png'}
                                    alt="UserImage"
                                    className="avatar-img rounded-circle"
                                  />
                                </div>
                              </div>
                              <div className="media-body">
                                <div>
                                  <div className={`user-name ${room.unreadMsgCnt > 0 ? "font-weight-bolder" : ""}`}>
                                    {room.userName}
                                  </div>
                                  <div className="user-last-chat">
                                    <span className={`text-primary ${room.unreadMsgCnt > 0 ? "font-weight-bolder" : ""}`}>
                                      {room.listing.partName} - {numberWithCommas(room.listing.price)}{" "}
                                    </span>
                                  </div>
                                </div>
                                <div>
                                  {room.lastTime && (
                                    <div className="last-chat-time block">
                                      {getChatTime(moment(room.lastTime))}
                                    </div>
                                  )}
                                  {room.unreadMsgCnt !== 0 && (
                                    <div className="badge badge-primary badge-pill">
                                      UNREAD
                                    </div>
                                  )}
                                </div>
                              </div>
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  {/* End Chat Room List */}

                  {/* Begin Conversation Content */}
                  <div className="chat-cont-right">
                    <div className="chat-header">
                      <a
                        id="back_user_list"
                        href="#!"
                        className="back-user-list"
                      >
                        <i className="las la-angle-left" onClick={this.handleBackUserList}></i>
                      </a>
                      {activeRoom && (
                        <div className="media">
                          <div className="media-img-wrap">
                            <div
                              className={`avatar ${
                                onlineUsers && onlineUsers[activeRoom.userId]
                                  ? "avatar-online"
                                  : "avatar-away"
                              }`}
                            >
                              <img
                                src={activeRoom.userAvatar ? `${activeRoom.userAvatar}` : '/assets/img/avatar.png'}
                                alt="UserImage"
                                className="avatar-img rounded-circle"
                              />
                            </div>
                          </div>
                          <div className="media-body">
                            <div className="user-name">{activeRoom.userName}</div>
                            <div className="user-status">
                              {onlineUsers && onlineUsers[activeRoom.userId]
                                ? "Online"
                                : "Away"}
                            </div>
                          </div>
                        </div>
                      )}
                      {activeRoom && (
                        <div className="chat-options">
                          {
                            activeRoom.userPhone && (
                              <a
                                href={`tel:+${activeRoom.userPhone}`}
                                className="phone-icon"
                                onClick={(e) => noAction(e)}
                              >
                                <i className="la la-phone"></i>
                              </a>
                            )
                          }
                          <NavLink
                            to={
                              "/listing-details/buy-car-"
                            }
                            className="btn btn-primary go-listing"
                          >
                            {activeRoom.listing.partName} - {numberWithCommas(activeRoom.listing.price)}{" AED "} 
                          </NavLink>
                          
                          <NavLink
                            to={
                              "/listing-details/buy-car-"
                            }
                            className="btn btn-primary go-listing--responsive"
                          >
                            <i className="la la-car"></i>
                          </NavLink>

                        </div>
                      )}
                    </div>
                    <div className="chat-body">
                      <RSC
                        className="chat-scroll"
                        style={{ height: "calc(100vh - 265px)" }}
                        ref={(el) => {
                          this.messagesEnd = el;
                        }}
                      >
                        {activeRoom && (
                          <ul className="list-unstyled">
                            {messages.map((conv, index) => {
                              const isSent =
                                conv.sender === this.props.login._id
                                  ? true
                                  : false;
                              return (
                                <li
                                  className={`media ${
                                    isSent ? "sent" : "received"
                                  }`}
                                  key={index}
                                >
                                  {isSent === false && (
                                    <div className="avatar">
                                      <img
                                        src={activeRoom.userAvatar ? `${activeRoom.userAvatar}` : '/assets/img/avatar.png'}
                                        alt="UserImage"
                                        className="avatar-img rounded-circle"
                                      />
                                    </div>
                                  )}
                                  <div className="media-body">
                                    <div className="msg-box">
                                      <div>
                                        <p>{conv.message}</p>
                                        <ul className="chat-msg-info">
                                          <li>
                                            <div className="chat-time">
                                              <span>
                                                {getChatTime(moment(conv.createdAt))}
                                              </span>
                                            </div>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              );
                            })}
                            {/* {typingUsers.find(o => o.sender === activeRoom.userId && o.listing_id === activeRoom.listing._id) && (
                              <li className="media received">
                                <div className="avatar">
                                  <img
                                    src={`${activeRoom.userAvatar}`}
                                    alt="User Image"
                                    className="avatar-img rounded-circle"
                                  />
                                </div>
                                <div className="media-body">
                                  <div className="msg-box">
                                    <div>
                                      <div className="msg-typing">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            )} */}
                          </ul>
                        )}
                      </RSC>
                    </div>
                    <div className="chat-footer">
                      {activeRoom && (
                        <form onSubmit={this.sendMessage}>
                          <div className="input-group">
                            {/* <div className="input-group-prepend">
                              <div className="btn-file btn">
                                <i className="las la-paperclip"></i>
                                <input type="file" />
                              </div>
                            </div> */}
                            <input
                              type="text"
                              name="message"
                              className="input-msg-send form-control"
                              placeholder="Type something"
                              value={message || ""}
                              onChange={this.handleInputMessage}
                            />
                            <div className="input-group-append">
                              <button
                                type="button"
                                className="btn msg-send-btn"
                                onClick={this.sendMessage}
                              >
                                <i className="fab fa-telegram-plane"></i>
                              </button>
                            </div>
                          </div>
                        </form>
                      )}
                    </div>
                  </div>
                  {/* End Conversation Content */}

                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <Footer /> */}
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    login: state.login,
    chat: state.chat,
  };
};

const mapDispatchToProp = (dispatch) => {
  return {
    updateChatRooms: (data) => dispatch(UpdateRooms(data)),
    updateActiveChatRoom: (data) => dispatch(UpdateActiveRoom(data)),
    addNewMessage: (data) => dispatch(AddMessage(data)),
    getRoomConversations: (roomId) => dispatch(GetConversations(roomId)),
    chatRoomInitialize: () => dispatch(Initialize()),
  };
};

export default connect(mapStateToProps, mapDispatchToProp)(Chats);
