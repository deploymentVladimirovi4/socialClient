import React from "react";
import "./conversation.css";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { AppDispatch } from "../../redux/store";
import {
  ConversationType,
  setConversation,
} from "../../redux/slices/ChatSlice";

type ConversationProps = {
  user: string;
  conversations: ConversationType[];
};

const Conversation: React.FC<ConversationProps> = ({ user, conversations }) => {
  const dispatch = useDispatch<AppDispatch>();
  const allUsers = useSelector((state: RootState) => state.userReducer.users);
  const friend = allUsers?.filter((person) => person._id === user)[0];
  const conversation = conversations?.filter((conversation) =>
    conversation.members.includes(user)
  )[0]?._id;

  return (
    <div
      className="conversation"
      onClick={() => dispatch(setConversation(conversation))}
    >
      <img src={friend?.coverPicture} alt="" className="conversationImg" />
      <span className="conversationName">{friend?.username}</span>
    </div>
  );
};

export default Conversation;
