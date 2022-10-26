import "./online.css";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Link } from "react-router-dom";

type OnlineData = {
  data: string;
};

const Online: React.FC<OnlineData> = ({ data }) => {
  const allUsers = useSelector((state: RootState) => state.userReducer.users);
  const friend = allUsers.filter((user) => user._id === data)[0];

  return (
    <Link
      to={`/profile/${friend?._id}`}
      style={{ textDecoration: "none", color: "black" }}
    >
      <li className="rightbarFriend">
        <div className="rightbarProfileImgContainer">
          <img
            src={friend?.coverPicture}
            alt=""
            className="rightbarProfileImg"
          />
          <span className="rightbarOnline"></span>
        </div>
        <span>{friend?.username}</span>
      </li>
    </Link>
  );
};

export default Online;
