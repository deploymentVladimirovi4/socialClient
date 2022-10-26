import React from "react";
import "./chatRightbar.css";
import Conversation from "../conversations/Conversation";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const ChatLeftbar: React.FC = () => {
  const friends = useSelector(
    (state: RootState) => state.authReducer.userData.user?.followins
  );
  const conversations = useSelector(
    (state: RootState) => state.chatReducer?.conversations
  );
  const isMobile = useSelector(
    (state: RootState) => state.authReducer.mobileStatus
  );

  // filtering only friends, who i chat with
  const chatFriends: string[] = [];
  friends?.map((friend) => {
    if (
      conversations &&
      conversations?.filter(
        (conversations, i) => conversations.members[i] === friend
      )
    ) {
      chatFriends.push(friend);
    }
  });

  return (
    <>
      <div className="chatMenuMobile">
        <div className="chatMenuWrapperMobile">
          {chatFriends?.map((friend, i) => (
            <Conversation user={friend} key={i} conversations={conversations} />
          ))}
        </div>
      </div>
      <div className="chatMenu">
        <div className="chatMenuWrapper">
          <span className="friendsTitle">Chats with Friends</span>
          {chatFriends?.map((friend, i) => (
            <Conversation user={friend} key={i} conversations={conversations} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ChatLeftbar;
