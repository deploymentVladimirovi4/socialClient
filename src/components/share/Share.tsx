import React, { useState, useEffect } from "react";
import "./share.css";
import { BsImages } from "react-icons/bs";
import { GoLocation } from "react-icons/go";
import { RiFileMusicLine } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { useForm } from "react-hook-form";
import { fetchAddPost } from "../../redux/slices/PostSlice";
import { AppDispatch } from "../../redux/store";
import { undefinedPicture } from "../post/Post";

export type reqType = {
  userId: string;
  userName: string;
  userPicture: string | undefined;
  desription: string;
  image: string;
  likes: string[];
};

const Share: React.FC = () => {
  const [isAddingPicture, setIsAddingPicture] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const usersData = useSelector(
    (state: RootState) => state.authReducer.userData.user
  );

  useEffect(() => {}, [isAddingPicture]);

  const { register, handleSubmit, resetField } = useForm({
    defaultValues: {
      userId: usersData?._id || "",
      userName: usersData?.username || "John Smith",
      userPicture: usersData?.coverPicture,
      desription: "",
      image: "",
      relationship: usersData?.relationship || "Single",
      birthday: usersData?.birthday || "10.03.2000",
      likes: [],
    },
    mode: "onSubmit",
  });

  const onSubmit = async (newPostData: reqType) => {
    await dispatch(fetchAddPost(newPostData));
    setIsAddingPicture(false);
    resetField("desription");
    resetField("image");
  };

  return (
    <div className="share">
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="shareWrapper">
          <div className="shareTop">
            <img
              className="shareProfileImg"
              src={usersData?.coverPicture || undefinedPicture}
              alt="profile"
            />
            <input
              placeholder="What's new?..."
              {...register("desription")}
              className="shareInput"
            />
          </div>
          <hr className="shareHR" />
          {isAddingPicture && (
            <input
              type="text"
              placeholder="Image Url..."
              className="imgUrlInput"
              {...register("image")}
            />
          )}
          <div className="shareBottom">
            <div className="shareOptions">
              <div
                className="shareOption"
                onClick={() => setIsAddingPicture(!isAddingPicture)}
              >
                <BsImages className="shareIcon" style={{ color: "#0e8bad" }} />
                <span className="shareOptionText">Photo</span>
              </div>
              <div className="shareOption">
                <RiFileMusicLine
                  className="shareIcon"
                  style={{ color: "#600e8c" }}
                />
                <span className="shareOptionText">Music</span>
              </div>
              <div className="shareOption">
                <GoLocation
                  className="shareIcon"
                  style={{ color: "#b8261c" }}
                />
                <span className="shareOptionText">Location</span>
              </div>
            </div>
            <button className="shareBtn" type="submit">
              Share
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Share;
