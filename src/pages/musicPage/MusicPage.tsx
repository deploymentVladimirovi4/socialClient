import React from "react";
import "./musicPage.css";
import Topbar from "../../components/topbar/Topbar";
import Leftbar from "../../components/leftbar/Leftbar";
import Music from "../../components/music/Music";
import MusicRightBar from "../../components/music/MusicRightBar";

const VideosPage: React.FC = () => {
  return (
    <>
      {/* <Topbar /> */}
      <div className="musicPage">
        <Leftbar />
        <Music />
        <MusicRightBar />
      </div>
    </>
  );
};

export default VideosPage;
