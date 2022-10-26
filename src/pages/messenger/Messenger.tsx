import React, { useEffect } from "react";
import "./messenger.css";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { AppDispatch } from "../../redux/store";
import { fetchConversations } from "../../redux/slices/ChatSlice";
import Topbar from "../../components/topbar/Topbar";
import Leftbar from "../../components/leftbar/Leftbar";
import Messages from "../../components/messages/Messages";
import ChatLeftbar from "../../components/chatRightbar/ChatRightbar";

const Messenger: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(
    (state: RootState) => state.authReducer.userData.user
  );

  useEffect(() => {
    console.log("dispath data from bd");
    const getConversations = async () => {
      await dispatch(fetchConversations(user?._id));
    };
    getConversations();
  }, []);

  return (
    <>
      {/* <Topbar /> */}
      <div className="messengerPage">
        <Leftbar />
        <Messages />
        <ChatLeftbar />
      </div>
    </>
  );
};

export default Messenger;
