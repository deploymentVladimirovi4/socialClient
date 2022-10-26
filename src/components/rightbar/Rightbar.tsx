import "./rightbar.css";
import Online from "../online/Online";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Rightbar: React.FC = () => {
  const friends = useSelector(
    (state: RootState) => state.authReducer.userData.user?.followins
  );

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        <div className="ad">
          <img
            src="https://i.pinimg.com/originals/83/61/22/83612299c51a78df8600c33baf542ab6.jpg"
            alt=""
            className="adImg"
          />
          <span className="adText">
            Don't wanna see this advertisement ? Try out{" "}
            <b>Socialism Premium </b>
            for only <b>19.99 $</b>
          </span>
        </div>
        <h4 className="rightbarTitle">Friends Online</h4>
        <ul className="rightbarFriendList">
          {friends?.map((user, i) => (
            <Online data={user} key={i} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Rightbar;
