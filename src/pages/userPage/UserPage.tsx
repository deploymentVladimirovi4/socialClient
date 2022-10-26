import "./userPage.css";
import React from "react";
import Leftbar from "../../components/leftbar/Leftbar";
import Topbar from "../../components/topbar/Topbar";
import User from "../../components/user/User";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useParams } from "react-router-dom";

const UserPage: React.FC = () => {
  const usersData = useSelector(
    (state: RootState) => state.authReducer.userData.user
  );

  const { userId } = useParams();
  const isMyPage = usersData?._id === userId;

  return (
    <>
      {/* <Topbar /> */}
      <div className="profile">
        <Leftbar />
        <div className="profileContainer">
          <User isMyPage={isMyPage} />
        </div>
      </div>
    </>
  );
};

export default UserPage;
