import React from "react";
import "./video.css";
import Topbar from "../../components/topbar/Topbar";
import Leftbar from "../../components/leftbar/Leftbar";
import Videos from "../../components/videos/Viseos";

const VideosPage: React.FC = () => {
  return (
    <>
      {/* <Topbar /> */}
      <div className="videoPage">
        <Leftbar />
        <Videos />
      </div>
    </>
  );
};

export default VideosPage;
