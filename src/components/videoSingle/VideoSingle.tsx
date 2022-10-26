import React from "react";
import "./videoSingle.css";
import ReactPlayer from "react-player/lazy";
import { MdAddCircleOutline } from "react-icons/md";
import { TiDeleteOutline } from "react-icons/ti";
import { fetchHandleVideo } from "../../redux/slices/VideosSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { RootState } from "../../redux/store";
import { Link } from "react-router-dom";

type SingleVideo = {
  isMyPage: boolean;
  data: YtVideo;
  key: number;
};

export type YtVideo = {
  kind?: string;
  id: {
    kind?: string;
    videoId?: string;
    channelId?: string;
  };
  snippet?: {
    publishedAt?: string;
    channelId?: string;
    title?: string;
    description?: string;
    thumbnails?: {
      default?: {
        url?: string;
        width?: number;
        height?: number;
      };
      medium?: {
        url?: string;
        width?: number;
        height?: number;
      };
      high?: {
        url?: string;
        width?: number;
        height?: number;
      };
    };
    channelTitle?: string;
    liveBroadcastContent?: string;
    publishTime?: string;
  };
};

const VideoSingle: React.FC<SingleVideo> = ({ data, isMyPage }) => {
  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector(
    (state: RootState) => state.authReducer.userData.user?._id
  );

  const userVideos = useSelector(
    (state: RootState) => state.videosReducer.userVideos.videos
  );

  const videoExists =
    userVideos.filter((vid) => vid.id.videoId === data.id.videoId).length > 0;
  console.log(videoExists, "videoExists");

  const handleVideo = async (videoId: string | undefined) => {
    console.log(videoId);
    const videoData = {
      userId: userId,
      video: data,
      videoId,
    };
    await dispatch(fetchHandleVideo(videoData));
    console.log("dispatch from single video");
  };

  return (
    <div className="videoSingle">
      <div className="videoSingleTop">
        {!isMyPage ? (
          <ReactPlayer
            url={`www.youtube.com/watch?v=${data?.id?.videoId}`}
            className="videoPlayer"
            controls={true}
            width={"100%"}
          />
        ) : (
          <div className="videoThumbnail">
            <Link to="/videos">
              <img
                src={data.snippet?.thumbnails?.medium?.url}
                alt="thumbnail"
                className="videoThumbnailImg"
              />
            </Link>
          </div>
        )}
      </div>
      <div className="videoSingleButtom">
        <div className="videoSingleTitle">
          {data?.snippet?.title}
          {!videoExists ? (
            <div
              className="addVideo"
              onClick={() => handleVideo(data.id.videoId)}
            >
              Add
              <MdAddCircleOutline className="addVideoIcon" />
            </div>
          ) : (
            <div
              className="addVideo"
              onClick={() => handleVideo(data.id.videoId)}
            >
              Delete
              <TiDeleteOutline className="addVideoIcon" />
            </div>
          )}
        </div>
        {!isMyPage && (
          <div className="videoSingleChannelAndBtn">
            Published on channel <b>{data?.snippet?.channelTitle}</b>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoSingle;
