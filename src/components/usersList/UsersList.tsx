import React, { useEffect } from "react";
import "./usersList.css";
import UserCard from "../userCard/UserCard";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useDispatch } from "react-redux";
import { fetchAllUsers } from "../../redux/slices/UserSlice";
import { AppDispatch } from "../../redux/store";

const UsersList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const allUsers = useSelector((state: RootState) => state.userReducer.users);

  console.log(allUsers);

  useEffect(() => {
    const getUsers = async () => {
      await dispatch(fetchAllUsers());
    };
    getUsers();
  }, []);

  useEffect(() => {
    console.log(allUsers);
  }, [allUsers]);

  return (
    <div className="userList">
      <div className="userListWrapper">
        {allUsers?.map((user, i) => (
          <UserCard data={user} key={i} />
        ))}
      </div>
    </div>
  );
};

export default UsersList;
