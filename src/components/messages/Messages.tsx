import React, { useState, useEffect, useRef } from "react";
import OneMessage from "../oneMessage/OneMessage";
import "./messages.css";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { AppDispatch } from "../../redux/store";
import {
  MessageType,
  fetchMessages,
  fetchAddMessage,
  AddMessageProps,
} from "../../redux/slices/ChatSlice";
import { useForm } from "react-hook-form";

const Messages: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(
    (state: RootState) => state.authReducer.userData?.user?._id
  );
  const messages = useSelector(
    (state: RootState) => state.chatReducer.messages
  );
  const conversation = useSelector(
    (state: RootState) => state.chatReducer.currentConversation
  );

  useEffect(() => {
    console.log("useEffect fired up");
    const getMessages = async () => {
      await dispatch(fetchMessages(conversation));
    };
    getMessages();
  }, [conversation]);

  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messageRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const { resetField, register, handleSubmit } = useForm({
    defaultValues: {
      text: "",
      conversationId: conversation,
      sender: user,
    },
    mode: "onChange",
  });

  const onSubmit = async (mesageData: AddMessageProps) => {
    await dispatch(fetchAddMessage(mesageData));
    resetField("text");
  };

  return (
    <div className="messeges">
      <div className="messgesWrapper">
        <div className="chatBox">
          <div className="chatBoxWrapper">
            <div className="chatBoxTop">
              {conversation &&
                messages?.map((message, i) => (
                  <div ref={messageRef}>
                    <OneMessage
                      own={message.sender === user}
                      message={message}
                      key={i}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
        <form className="chatBoxBottom" onSubmit={handleSubmit(onSubmit)}>
          <textarea
            {...register("text", { required: "enter your message" })}
            placeholder="Wright your message..."
            className="chatInput"
          ></textarea>
          <button className="chatSubmitBtn">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Messages;
