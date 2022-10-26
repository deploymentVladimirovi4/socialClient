import "./post.css";
import React, { useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import { TiDelete } from "react-icons/ti";
import Like from "../../assets/like.png";
import Heart from "../../assets/heart.png";
import { SinglePostType } from "../../redux/slices/PostSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { fetchDeletePost, fetchLikePost } from "../../redux/slices/PostSlice";
import { AppDispatch } from "../../redux/store";
import { format } from "timeago.js";
import { Link } from "react-router-dom";

export const undefinedPicture =
  "https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg";

export type PostReqType = {
  userId: string | undefined;
  id: string | undefined;
};

type PostProps = {
  data: SinglePostType;
  image?: string;
  isMyPage?: boolean;
};

const Post: React.FC<PostProps> = ({ data, isMyPage }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isReadyToDelete, setIsReadyToDelete] = useState(false);
  const usersData = useSelector(
    (state: RootState) => state.authReducer.userData.user
  );

  const reqData = {
    userId: usersData?._id,
    id: data?._id,
  };

  const handleOpenDelete = () => {
    setIsReadyToDelete(!isReadyToDelete);
  };

  const deletePost = async () => {
    await dispatch(fetchDeletePost(reqData));
    setIsReadyToDelete(false);
  };

  const handleLike = async () => {
    await dispatch(fetchLikePost(reqData));
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <Link
            to={`/profile/${data.userId}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <div className="postTopLeft">
              <img
                className="PostProfileImg"
                src={data.userPicture || undefinedPicture}
                alt="profile"
              />
              <span className="postUserName">{data.userName}</span>
            </div>
          </Link>
          {!isMyPage && (
            <div className="postTopRight">{format(data.createdAt)}</div>
          )}
          {isMyPage && (
            <div className="postTopRight">
              <FiMoreVertical onClick={() => handleOpenDelete()} />
              {isReadyToDelete && (
                <div className="deleteMessage" onClick={() => deletePost()}>
                  <TiDelete className="deleteIcon" />
                  <span>Delete this post?</span>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="postBody">
          <span className="postText">{data?.desription || ""}</span>
          <img className="postImg" src={data?.image || ""} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={Like}
              alt="like"
              onClick={() => handleLike()}
            />
            {data.likes.includes(usersData?._id || "") && (
              <img className="likeIcon" src={Heart} alt="heart" />
            )}
            <span className="postLikeCounter">
              {data?.likes.length} people liked this
            </span>
          </div>
          {isMyPage && (
            <div className="postTopRight">{format(data.createdAt)}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
