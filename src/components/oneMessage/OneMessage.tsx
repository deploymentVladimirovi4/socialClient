import React from "react";
import "./oneMessage.css";
import { MessageType } from "../../redux/slices/ChatSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { format } from "timeago.js";

type OneMessageProps = {
  own: boolean;
  message: MessageType;
};

const OneMessage: React.FC<OneMessageProps> = ({ own, message }) => {
  const allUsers = useSelector((state: RootState) => state.userReducer.users);
  const sender = allUsers.filter((user) => user._id === message.sender)[0];

  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img src={sender.coverPicture} alt="user" className="messageImg" />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">
        <span>{format(message.createdAt)}</span>
      </div>
    </div>
  );
};

export default OneMessage;
