import "./userCard.css";
import React from "react";
import { UserDataType } from "../../redux/slices/AuthSlice";
import { useNavigate } from "react-router-dom";

type UserCardProps = {
  data: UserDataType;
};

const UserCard: React.FC<UserCardProps> = ({ data }) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/profile/${data._id}`);
  };

  return (
    <div className="userCard">
      <div className="userCardWrapper">
        <div className="userCardLeft">
          <div className="userCardImgWrapper" onClick={() => handleNavigate()}>
            <img src={data.coverPicture} alt="user" className="userCardImg" />
          </div>
          <div className="userCadrInfo">
            <span className="userCardName">{data.username}</span>
            <div className="userCardDetails">
              <span>
                <b>Birthday: </b>
                {data.birthday}
              </span>
              <span>
                <b>Hometown:</b> {data.hometown}
              </span>
              <span>
                <b>Relationship:</b> {data.relationship}
              </span>
              <span>
                <b>Followers:</b> {data.followers.length}
              </span>
            </div>
          </div>
        </div>
        <div className="userCardRight">
          <button className="userCardBtn" onClick={() => handleNavigate()}>
            User Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
