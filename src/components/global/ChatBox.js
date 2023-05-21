import React, { useContext } from "react";

import "../css/Chatbox.css";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { apiUrl } from "../../contexts/Constants";
import userIcon from "../../assets/user.png";
import { useRef } from "react";
import Stomp from "stompjs";
import { apiWS } from "../../contexts/Constants";
const ChatBox = () => {
  const {
    authState: { user, authLoading },
  } = useContext(AuthContext);

  const userJwtToken = localStorage.getItem("user-token");

  const [view, setView] = useState(true);
  const [listRoom, setListRoom] = useState([]);
  /*
    Room of listroom
        const singleRoomChat = {
        room: room,
        user: user1,
        chats: chats,
        unread: getNewMessage(chats.data, room.id),
        unread_time: getNewMessageTime(chats.data, room.id),
        seen: isSeenMessage(chats.data, room.id),
      };
      room of listOpen Room
      {
        roomId: roomId,
        recieverName: recieverName,
        chatContent: chatContent,
      },
  */
  const [listOpenRoom, setListOpenRoom] = useState([]);
  const [messengers, setMessengers] = useState([]);

  const listOpenRoomRef = useRef(listOpenRoom);
  const listRoomRef = useRef(listRoom);

  const handleMessagesRef = (ref, length) => {
    if (ref) {
      if (length <= 11) ref.scrollTop = ref.scrollHeight;
      else if (ref.scrollTop === 0) ref.scrollTop = 30;
      else ref.scrollTop = ref.scrollHeight;
    }
  };

  const auth_headers = {
    Authorization: "Bearer " + userJwtToken,
  };
  //Global variables
  var page = 1;

  var fetchChatUrl = `${apiUrl}/chat/message/`;

  const maxRoom = 3;

  useEffect(() => {
    listOpenRoomRef.current = listOpenRoom;
    listRoomRef.current = listRoom;
  }, [listOpenRoom, listRoom]);

  useEffect(() => {
    const stClient = Stomp.client(`ws://${apiWS}/chat`);
    if (!authLoading && user) {
      keyUpJwt(userJwtToken);

      // stompClientRef.current.debug = false;
      stClient.connect(auth_headers, () => {
        ///${user.id}/messages/${reciverId}
        stClient.subscribe(`/user/queue`, function (message) {
          const obj = JSON.parse(message.body);
          if (listRoomRef.current) {
            const destRoom = listRoomRef.current.filter((r) => r.room.id === obj.chatRoomId)[0];
            if (destRoom) {
              destRoom.unread = obj.data;
              destRoom.unread_time = new Date().getHours() + ":" + new Date().getMinutes();
              destRoom.seen = false;
            }
          }

          //If room is open -> add message
          //else open a new room
          if (listOpenRoomRef.current.some((r) => r.roomId === obj.chatRoomId)) {
            const newListOpenRoom = [
              ...listOpenRoomRef.current.map((op) => {
                if (op.roomId === obj.chatRoomId) {
                  op.chatContent.push({
                    id: null,
                    chatRoomId: obj.chatRoomId,
                    image: null,
                    senderId: null,
                    content: obj.data,
                    user1Seen: true,
                    user2Seen: true,
                    time: formatDateToYYYYMMDDHHMMSS(new Date()),
                  });
                }
                return op;
              }),
            ];
            setListOpenRoom(newListOpenRoom);
            //When room is openned dont need to hight light

            //Set seen to true
            axios.put(`${apiUrl}/chat/message/${obj.chatMessageId}`, {}, { headers: auth_headers });
          } else {
            functionOpenRoom(obj.chatRoomId);
          }

          //Sort message room to newest message
          if (listRoomRef.current.length > 0) {
            const room = filterListRoom(obj.chatRoomId, true)[0];
            const newListRom = filterListRoom(obj.chatRoomId, false);
            setListRoom([room, ...newListRom]);
          }
        });
      });
    }

    return () => {
      stClient.disconnect();
    };
  }, []);

  function formatDateToYYYYMMDDHHMMSS(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  function caclTime(time) {
    const date1 = new Date(time);
    const date2 = new Date();

    const diff = date2.getTime() - date1.getTime();
    let msec = diff;
    let yy = Math.round(msec / (86400000 * 30 * 365));
    let mm = Math.round(msec / (86400000 * 30));

    let dd = Math.round(msec / 86400000);

    let hh = Math.round(msec / 1000 / 60 / 60);
    if (hh !== 0) msec -= hh * 1000 * 60 * 60;

    let mi = Math.round(msec / 1000 / 60);

    let result;
    if (Math.floor(mi) !== 0) result = mi + " phút";
    if (Math.floor(hh) !== 0) result = hh + " giờ";
    if (Math.floor(dd) !== 0) result = dd + " ngày";
    if (Math.floor(mm) !== 0) result = mm + " tháng";
    if (Math.floor(yy) !== 0) result = yy + " năm";
    return result ? result : " Bây giờ";
  }

  function filterListRoom(roomId, isEqual) {
    if (isEqual) return listRoomRef.current.filter((r) => r.room.id === roomId);
    else return listRoomRef.current.filter((r) => r.room.id !== roomId);
  }

  function sendMessage(roomId) {
    const mess = getElementById(`${roomId}-input-message`);

    if (!mess.value.trim()) {
      alert("Must type something !");
      return;
    }
    const stClient = Stomp.client(`ws://${apiWS}/chat`);
    stClient.connect(auth_headers, async () => {
      const time = new Date();
      await stClient.send(
        "/websocket/chat",
        {},
        JSON.stringify({
          idReceiver: getReciever(getRoomById(roomId)).id,
          contentType: 0,
          data: mess.value,
          chatRoomId: roomId,
          time: time,
        })
      );
      setListOpenRoom([
        ...listOpenRoomRef.current.map((op) => {
          if (op.roomId === roomId) {
            op.chatContent.push({
              id: null,
              chatRoomId: roomId,
              image: null,
              senderId: user.id,
              content: mess.value,
              user1Seen: true,
              user2Seen: true,
              time: formatDateToYYYYMMDDHHMMSS(time),
            });
          }
          return op;
        }),
      ]);

      const destRoom = filterListRoom(roomId, true)[0];
      destRoom.unread = "You :" + mess.value;
      destRoom.unread_time = new Date().getHours() + ":" + new Date().getMinutes();
      destRoom.seen = true;

      if (listRoomRef.current.length > 0) {
        const room = filterListRoom(roomId, true)[0];
        const newListRom = filterListRoom(roomId, false);
        setListRoom([room, ...newListRom]);
      }

      mess.value = "";
      await stClient.disconnect();
    });
  }

  function keyUpMessage(e, roomId) {
    if (e.keyCode === 13) {
      sendMessage(roomId);
    }
  }

  async function loadMessage(url) {
    const response = await axios.get(url, { headers: auth_headers });

    return response.data.data;
  }

  const onTableScroll = (e, roomId, messageId) => {
    const { scrollTop } = e.target;
    if (scrollTop === 0) {
      let url = fetchChatUrl + roomId + "/" + getReciever(getRoomById(roomId)).id + "?page=" + page + "&limit=" + 10;
      if (messageId) url += "&messageId=" + messageId;
      loadMoreMessage(url, roomId, userJwtToken);
    }
  };

  function loadMoreMessage(url, roomId, token) {
    axios
      .get(url, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        const data = response.data.data;
        const room = listOpenRoomRef.current.filter((r) => r.roomId === roomId)[0];
        room.chatContent = [...data, ...room.chatContent];

        setListOpenRoom([
          ...listOpenRoomRef.current.map((x) => {
            if (x.roomId === roomId) return room;
            return x;
          }),
        ]);
      });
  }
  function getReciever(room) {
    //room in list Room
    if (room) return room.user;
    return null;
  }
  function getRoomById(roomId) {
    return listRoomRef.current.filter((x) => x.room.id === roomId)[0];
  }
  function closeRoom(roomId) {
    setListOpenRoom([...listOpenRoomRef.current.filter((r) => r.roomId !== roomId)]);
  }

  /*Function */
  async function functionOpenRoom(roomId) {
    //Convert to this room
    //We have a messengers as a list of room you have.
    //When create new room we check if roomId is already open in listOpenRoom
    if (listOpenRoomRef.current.some((room) => room.roomId === roomId)) return;
    let newListOpenRoom = [...listOpenRoomRef.current];
    //drop oldest room
    if (listOpenRoomRef.current.length >= maxRoom) {
      const oldestRoom = listOpenRoomRef.current[0];
      //close room
      newListOpenRoom = [...listOpenRoomRef.current.filter((r) => r.roomId !== oldestRoom.roomId)];
    }
    // inputChatRoomId.value = roomId
    const room = getRoomById(roomId);

    //push a room to current room
    //Push recieverId to room
    const recieverName = getReciever(room).name;
    const url = fetchChatUrl + roomId + "/" + getReciever(room).id + "?page=1&limit=10";
    const chatContent = await loadMessage(url);

    const lstOpenRoom = [
      ...newListOpenRoom,
      {
        roomId: roomId,
        recieverName: recieverName,
        chatContent: chatContent,
      },
    ];
    setListOpenRoom(lstOpenRoom);
  }
  function getNewMessage(arrMessage, roomId) {
    const mess = arrMessage.filter((x) => x.chatRoomId === roomId)[0];

    if (mess) {
      if (mess.senderId === user.id) return "You: " + mess.content;
      return mess.content;
    } else return "";
  }
  function isSeenMessage(arrMessage, roomId) {
    const mess = arrMessage.filter((x) => x.chatRoomId === roomId)[0];
    const room = messengers.filter((room) => room.id === roomId)[0];
    if (mess && room) {
      if (user.id === mess.senderId) return true;
      if (room.user1.id !== user.id) {
        //message is not yours
        return mess.user2Seen;
      } else return mess.user1Seen;
    } else return true;
  }
  function getNewMessageTime(arrMessage, roomId) {
    const mess = arrMessage.filter((x) => x.chatRoomId === roomId)[0];

    if (mess) return caclTime(mess.time);
    else return "";
  }

  /**/
  //Data for room chat

  async function keyUpJwt(token) {
    const chat_room = await axios.get(`${apiUrl}/chat/chat-room?page=1&limit=1000`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const data = chat_room.data.data;
    setMessengers(data);
    const roomIds = data.map((x) => x.id);
    let query = "";
    for (let id of roomIds) {
      query += "roomIds=" + id + "&";
    }

    const chats = await axios.get(`${apiUrl}/chat/unread?${query}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    // newestChatMessage = chats.data
    const lst = [];
    for (let i = 0; i < data.length; i++) {
      let room = data[i];
      let user1 = room.user1.id === user.id ? room.user2 : room.user1;

      const singleRoomChat = {
        room: room,
        user: user1,
        chats: chats,
        unread: getNewMessage(chats.data, room.id),
        unread_time: getNewMessageTime(chats.data, room.id),
        seen: isSeenMessage(chats.data, room.id),
      };

      lst.push(singleRoomChat);
    }
    setListRoom(lst);
  }
  function getElementById(id) {
    return document.getElementById(id);
  }

  const getRoomImage = (roomId) => {
    const room = filterListRoom(roomId, true)[0];
    if (room) {
      return room.user.urlAvatar;
    }
  };

  const isRoomOpened = (roomId) => {
    return listOpenRoom.some((x) => x.roomId === roomId);
  };

  return (
    <div className="float-items">
      <div className="square-message">
        {view && (
          <div className="messages-info" id="messages-info">
            <h4>Your chats !</h4>
            <div className="messages" id="listRoom">
              {listRoom.map((chat_room, index) => (
                <div
                  key={index}
                  className={`room ${isRoomOpened(chat_room.room.id) ? "room-opened" : ""}`}
                  id={`room-${chat_room.room.id}`}
                  onClick={() => {
                    functionOpenRoom(chat_room.room.id);
                  }}
                >
                  <img className="avatar" src={chat_room.user.urlAvatar ? chat_room.user.urlAvatar : userIcon} width="50px" height="50px" alt="" />
                  <div className="info">
                    <p className="chat-header">
                      {chat_room.user.id} - {chat_room.user.name}
                    </p>
                    <div className="unread-wrapper">
                      <p id={`room-${chat_room.room.id}-message`} className={`unread-message  ${!chat_room.seen ? "unread" : ""}`}>
                        <span id={`room-${chat_room.room.id}-time`}>{chat_room.unread}</span>
                      </p>
                      <p id={`room-${chat_room.room.id}-time`} className="unread-time">
                        <span id={`room-${chat_room.room.id}-time`}>{chat_room.unread_time}</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div
          className="circle-float"
          id="circle-message"
          onClick={() => {
            setView(!view);
          }}
        >
          <i className="fa  fa-comments-o"></i>
        </div>
      </div>
      <div id="messengers">
        {listOpenRoom.map((table, index) => (
          <div key={index} className="chat-wrapper" id={`chat-wrapper-${table.roomId}`}>
            <div className="chat-room" id={`chat-room-${table.roomId}`}>
              <div className="chat-header" id={`chat-room-${table.roomId}-header`}>
                <img
                  className="avatar"
                  src={getRoomImage(table.roomId) ? getRoomImage(table.roomId) : userIcon}
                  alt=""
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = userIcon;
                  }}
                />
                <p id="chat-room-1-name">{table.recieverName}</p>
                <button
                  onClick={() => {
                    closeRoom(table.roomId);
                  }}
                >
                  X
                </button>
              </div>
              <div className="chat-content" id={`table-${table.roomId}-container`}>
                <div
                  className="table-chat"
                  id={`chat-room-${table.roomId}-table`}
                  onScroll={(e) => {
                    onTableScroll(e, table.roomId, table.chatContent[0]?.id);
                  }}
                  ref={(ref) => handleMessagesRef(ref, table.chatContent.length)}
                >
                  {table.chatContent.map((c, index) => {
                    return (
                      <div key={index} className={`${c.senderId === user.id ? "yours" : ""}`}>
                        <span>{c.content}</span>
                        <div className="hidden-time">{c.time.toString()}</div>
                      </div>
                    );
                  })}
                </div>
                <div className="chat-footer">
                  <div className="item">
                    <i className="fa fa-file-image-o" aria-hidden="true"></i>
                  </div>
                  <div className="group-input">
                    <input
                      type="text"
                      id={`${table.roomId}-input-message`}
                      onKeyUp={(event) => {
                        keyUpMessage(event, table.roomId);
                      }}
                    />
                    <button
                      id={`${table.roomId}-send`}
                      onClick={() => {
                        sendMessage(table.roomId);
                      }}
                    >
                      <i className="fa fa-paper-plane-o"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ChatBox;
