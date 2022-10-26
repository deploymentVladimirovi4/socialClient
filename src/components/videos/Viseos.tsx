import React, { useEffect, useState } from "react";
import "./videos.css";
import VideoSingle from "../videoSingle/VideoSingle";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { fetchSearchVideos } from "../../redux/slices/VideosSlice";
import { music, sport, travel, code } from "./videosDataExample";
import { useForm } from "react-hook-form";
import { RootState } from "../../redux/store";
import { YtVideo } from "../videoSingle/VideoSingle";
import NoResults from "../../assets/noResults.png";

type videoSearchProps = {
  searchValue: string;
};

const Viseos: React.FC = () => {
  const searchedVideos = useSelector(
    (state: RootState) => state.videosReducer?.searchVideos
  );
  const userVideosData = useSelector(
    (state: RootState) => state.videosReducer.userVideos
  );
  const [category, setCategory] = useState<YtVideo[]>(userVideosData?.videos);
  const [activeCategory, setActiveCategory] = useState("myVideos");
  const dispatch = useDispatch<AppDispatch>();

  const { resetField, register, handleSubmit } = useForm({
    defaultValues: {
      searchValue: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    console.log("rerender");
  }, [category, userVideosData?.videos]);

  const onSubmit = (searchValue: videoSearchProps) => {
    const searchVideo = async () => {
      const { payload } = await dispatch(
        fetchSearchVideos(searchValue.searchValue)
      );
      setCategory(payload.items);
    };
    searchVideo();
    resetField("searchValue");
  };

  const handleCategoryClick = (value: string, category: YtVideo[]) => {
    setCategory(category);
    setActiveCategory(value);
  };

  return (
    <div className="videos">
      <div className="videosContainer">
        <div className="videosTop">
          <div className="categoriesAndSearch">
            <ul className="categoriesList">
              <li
                onClick={() =>
                  handleCategoryClick("myVideos", userVideosData.videos)
                }
                className={`categorieListItem ${
                  activeCategory === "myVideos" && "active"
                }`}
              >
                My Videos
              </li>
              <li
                onClick={(e) => handleCategoryClick("search", searchedVideos)}
                className={`categorieListItem ${
                  activeCategory === "search" && "active"
                }`}
              >
                Search
              </li>
              <li
                onClick={(e) => handleCategoryClick("music", music)}
                className={`categorieListItem ${
                  activeCategory === "music" && "active"
                }`}
              >
                Music
              </li>
              <li
                onClick={(e) => handleCategoryClick("sport", sport)}
                className={`categorieListItem ${
                  activeCategory === "sport" && "active"
                }`}
              >
                Sport
              </li>
              <li
                onClick={(e) => handleCategoryClick("code", code)}
                className={`categorieListItem ${
                  activeCategory === "code" && "active"
                }`}
              >
                Code
              </li>
              <li
                onClick={() => handleCategoryClick("travel", travel)}
                className={`categorieListItem ${
                  activeCategory === "travel" && "active"
                }`}
              >
                Travel
              </li>
            </ul>

            {category === searchedVideos && (
              <form className="search" onSubmit={handleSubmit(onSubmit)}>
                <input
                  {...register("searchValue")}
                  type="text"
                  placeholder="Search for video"
                  className="searchVideoInput"
                />
              </form>
            )}
          </div>
        </div>
        <div className="videosButtom">
          {category?.length > 0 &&
            category
              ?.filter((video) => video?.id.kind === "youtube#video")
              .slice(0, 30)
              .map((video, i) => (
                <div className="videoSingleWrapper">
                  <VideoSingle data={video} key={i} isMyPage={false} />
                </div>
              ))}
        </div>
        {!category.length && (
          <div className="noResultsWrapper">
            <img src={NoResults} alt="noResults" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Viseos;
