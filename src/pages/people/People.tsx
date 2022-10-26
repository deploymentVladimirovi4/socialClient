import React from "react";
import "./people.css";
import Topbar from "../../components/topbar/Topbar";
import Leftbar from "../../components/leftbar/Leftbar";
import Rightbar from "../../components/rightbar/Rightbar";
import UsersList from "../../components/usersList/UsersList";

const People = () => {
  return (
    <>
      {/* <Topbar /> */}
      <div className="usersListContainer">
        <Leftbar />
        <UsersList />
        <Rightbar />
      </div>
    </>
  );
};

export default People;
