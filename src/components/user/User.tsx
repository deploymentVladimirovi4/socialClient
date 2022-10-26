import "./user.css";
import React, { useEffect, useState } from "react";
import Share from "../share/Share";
import Post from "../post/Post";
import { fetctEditProfile } from "../../redux/slices/AuthSlice";
import { RootState } from "../../redux/store";
import {
  logOut,
  fetchFollowUser,
  fetchUnfollowUser,
} from "../../redux/slices/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AiOutlineEdit } from "react-icons/ai";
import { AppDispatch } from "../../redux/store";
import { undefinedPicture } from "../post/Post";
import { SinglePostType, fetchAllPosts } from "../../redux/slices/PostSlice";
import { getFeedFromAllPosts } from "../../utils/getFeedFromAllPosts";
import { fetchAllUsers } from "../../redux/slices/UserSlice";
import { fetchGetFriendsVideos } from "../../redux/slices/VideosSlice";
import VideoSingle from "../videoSingle/VideoSingle";

export type EditProfileDataType = {
  username: string;
  coverPicture: string | undefined;
  description: string;
  hometown: string;
  relationship: string;
  birthday: string;
  userId: string | undefined;
};

type UserProps = {
  isMyPage?: boolean;
};

const User: React.FC<UserProps> = ({ isMyPage }) => {
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const logedInUser = useSelector(
    (state: RootState) => state.authReducer.userData?.user
  );
  const MyVideos = useSelector(
    (state: RootState) => state.videosReducer.userVideos?.videos
  );
  const usersData = useSelector((state: RootState) => state.userReducer.users);
  const user = usersData.filter((user) => user._id === params.userId)[0];
  const allPosts = useSelector((state: RootState) => state.postReducer.posts);
  const [isEdditing, setIsEdditing] = useState(false);
  const [profileUserData, setProfileUserData] = useState(logedInUser);
  const [myFeed, setMyFeed] = useState<SinglePostType[]>([]);
  const amFollowing = logedInUser?.followins.includes(user?._id);
  const friendVideos = useSelector(
    (state: RootState) => state.videosReducer.friendVideos
  );
  const userPageVideos = isMyPage ? MyVideos : friendVideos;

  useEffect(() => {}, [allPosts, logedInUser]);

  useEffect(() => {
    const getAllPosts = async () => {
      // await dispatch(fetchFeed(usersData?._id));
      await dispatch(fetchAllPosts());
      await dispatch(fetchAllUsers());
    };
    getAllPosts();

    const getFriendsVideos = async () => {
      await dispatch(fetchGetFriendsVideos(user?._id));
    };

    if (!isMyPage) {
      getFriendsVideos();
      console.log(friendVideos, "friendVideos");
    }
  }, []);

  useEffect(() => {
    setProfileUserData(logedInUser);
  }, [logedInUser]);

  const handleEditClick = () => {
    setIsEdditing(!isEdditing);
  };

  const onClickLogout = () => {
    if (window.confirm("You are shure you want to logout?")) {
      dispatch(logOut());
      navigate("/login", { replace: true });
      window.localStorage.removeItem("token");
    }
  };

  const followUnfollow = async () => {
    const followProps = {
      id: params.userId,
      userId: logedInUser?._id,
    };

    if (amFollowing) {
      await dispatch(fetchUnfollowUser(followProps));
    } else {
      await dispatch(fetchFollowUser(followProps));
    }
  };

  const { register, handleSubmit } = useForm({
    defaultValues: {
      username: user?.username || "John Smith",
      coverPicture: user?.coverPicture,
      description:
        user?.description ||
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio sint dicta ab ducimus voluptatum architecto quaerat, id labore laudantium eum assumenda vero adipisci dolorem delectus repudiandae quidem nobis quod voluptate, id labore laudantium eum assumenda vero adipisci dolorem delectus repudiandae quidem nobis quod voluptate.",
      hometown: user?.hometown || "London",
      relationship: user?.relationship || "Single",
      birthday: user?.birthday || "10.03.2000",
      userId: user?._id,
    },
    mode: "onChange",
  });

  const onSubmit = async (userEditData: EditProfileDataType) => {
    await dispatch(fetctEditProfile(userEditData));
    setIsEdditing(!isEdditing);
    window.alert("Your profile has been changed.");
  };

  const friends = useSelector(
    (state: RootState) => state.authReducer.userData.user?.followins
  );

  useEffect(() => {
    const userFeed = getFeedFromAllPosts(allPosts, friends, logedInUser?._id);
    console.log(userFeed, "usersFeed");
    setMyFeed(userFeed);
  }, [allPosts]);

  return (
    <div className="user">
      <div className="userLeft">
        <div className="profileImg">
          <img src={user?.coverPicture || undefinedPicture} alt="" />
        </div>
        <div className="profileMedia">
          {userPageVideos?.map((vid, idx) => (
            <div className="userVideoWrapper">
              <VideoSingle isMyPage={true} data={vid} key={idx} />
            </div>
          ))}
        </div>
      </div>
      <div className="userRight">
        <div className="profileInfo">
          <div className="profileTop">
            <div className="userName">
              <span>
                <b>{user?.username}</b>
              </span>
              {isMyPage && (
                <div className="editProfile" onClick={handleEditClick}>
                  <AiOutlineEdit className="editProfileIcon" />
                  <span className="editProfileText">Edit profile</span>
                </div>
              )}
            </div>
            <div className="profileTopRight">
              {isMyPage ? (
                <button className="logoutBtn" onClick={() => onClickLogout()}>
                  Log out
                </button>
              ) : (
                <button className="logoutBtn" onClick={() => followUnfollow()}>
                  {amFollowing ? "Unfollow User" : "Follow User"}
                </button>
              )}
            </div>
          </div>
          <div className="userMobileProfilePhoto">
            <img
              src={user.coverPicture}
              alt="profile"
              className="mobileProfilrImg"
            />
          </div>
          <div className="mainInfo">
            <span>
              Relationship: <b>{user?.relationship}</b>
            </span>

            <span className="birthday">
              Birthday <b>{user?.birthday}</b>
            </span>

            <span>
              My hometown is <b>{user?.hometown}</b>
            </span>
          </div>
          <div className="dexcriptionContainer">
            <span>{user?.description}</span>
          </div>
        </div>
        {isEdditing && (
          <div className="editProfileFormWrapper">
            <form onSubmit={handleSubmit(onSubmit)} className="editProfileForm">
              <div className="formBlock">
                <span>Profile image url</span>
                <input type="text" {...register("coverPicture")} />
              </div>
              <div className="formBlock">
                <span>Your name</span>
                <input type="text" {...register("username")} />
              </div>
              <div className="formBlock">
                <span>Your Relationship status</span>
                <select {...register("relationship")}>
                  <option value="Single">Single</option>
                  <option value="In Relationship">In Relationship</option>
                </select>
              </div>
              <div className="formBlock">
                <span>Your Birthday</span>
                <input
                  type="date"
                  placeholder="Your Birthday"
                  {...register("birthday")}
                />
              </div>
              <div className="formBlock">
                <span>Your Hometown</span>
                <input type="text" {...register("hometown")} />
              </div>
              <div className="formBlock">
                <span>Info about you</span>
                <input type="text" {...register("description")} />
              </div>
              <button type="submit" className="submitProfileEditBtn">
                Submit
              </button>
            </form>
          </div>
        )}
        {isMyPage && (
          <div className="share">
            <Share />
          </div>
        )}
        <div className="userPosts">
          {!isMyPage
            ? allPosts
                ?.filter((post) => post.userId === user._id)
                .map((post, i) => (
                  <Post data={post} image={user?.coverPicture} key={i} />
                ))
            : myFeed
                ?.filter((post) => post.userId === logedInUser?._id)
                .map((post, i) => (
                  <Post
                    data={post}
                    image={user?.coverPicture}
                    key={i}
                    isMyPage={isMyPage}
                  />
                ))}
        </div>
      </div>
    </div>
  );
};

export default User;
