import React, { useState, useEffect } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { fetchAllPosts } from "../../redux/slices/PostSlice";
import { fetchAllUsers } from "../../redux/slices/UserSlice";
import { RootState } from "../../redux/store";
import { getFeedFromAllPosts } from "../../utils/getFeedFromAllPosts";
import { SinglePostType } from "../../redux/slices/PostSlice";
import { fetchGetUserVideos } from "../../redux/slices/VideosSlice";
import { fetchCreateUserVideos } from "../../redux/slices/VideosSlice";
import { fetchGetUserMusic } from "../../redux/slices/MusicSlice";
import { setIsSearch, setSearchValue } from "../../redux/slices/PostSlice";

const Feed: React.FC = () => {
  const [feed, setFeed] = useState<SinglePostType[]>([]);
  const [searchedFeed, setSearchedFeed] = useState<SinglePostType[]>([]);
  const usersData = useSelector(
    (state: RootState) => state.authReducer.userData.user
  );
  const userVideosData = useSelector(
    (state: RootState) => state.videosReducer.userVideos
  );
  const musicId = useSelector(
    (state: RootState) => state.musicReducer.userMusic.userId
  );
  const isSearch = useSelector(
    (state: RootState) => state.postReducer.search?.isSearch
  );
  const searchValue = useSelector(
    (state: RootState) => state.postReducer.search?.searchValue
  );
  const allPosts = useSelector((state: RootState) => state.postReducer.posts);
  const dispatch = useDispatch<AppDispatch>();
  const userId = usersData?._id;

  const handleAbortSearch = () => {
    dispatch(setIsSearch(false));
    dispatch(setSearchValue(""));
  };

  useEffect(() => {
    const newUserMedia = {
      userId,
    };

    const getData = async () => {
      await dispatch(fetchAllPosts());
      await dispatch(fetchAllUsers());
      await dispatch(fetchGetUserVideos(userId));
      await dispatch(fetchGetUserMusic(userId));

      const setUserMedia = async () => {
        if (!userVideosData._id) {
          await dispatch(fetchCreateUserVideos(newUserMedia));
        }
        console.log("setUserVideos");
      };
      setUserMedia();
    };

    getData();

    return () => {
      dispatch(setIsSearch(false));
      dispatch(setSearchValue(""));
    };
  }, []);

  useEffect(() => {
    // get userFeed for logined user from allPosts
    const userFeed = getFeedFromAllPosts(
      allPosts,
      usersData?.followins,
      usersData?._id
    );
    setFeed(userFeed);

    //filter newsfeed if isSearch
    if (isSearch) {
      console.log("isSearch");
      console.log(feed, "feed");
      const searchedPosts = feed?.filter(
        (post) =>
          post.userName.toLowerCase().includes(searchValue) ||
          post.desription.toLowerCase().includes(searchValue)
      );
      setSearchedFeed(searchedPosts);
      console.log(searchedPosts);
    }
  }, [allPosts, searchValue, isSearch]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {isSearch && (
          <div className="searchStatus">
            <div className="searchStatusMsg">
              Search results{" "}
              <IoMdClose
                className="searcCancelIcon"
                onClick={() => handleAbortSearch()}
              />
            </div>
          </div>
        )}
        {!isSearch
          ? feed?.map((post, i) => <Post data={post} key={i} />)
          : searchedFeed?.map((post, i) => <Post data={post} key={i} />)}
      </div>
    </div>
  );
};

export default Feed;
