import React from "react";
import "./musicPlayer.css";
import { ISong } from "../music/musicTypes";

type TrackProps = {
  isPlaying?: boolean;
  isActive?: boolean;
  activeSong?: ISong | null;
};

const Track: React.FC<TrackProps> = ({ activeSong }) => (
  <div className="trackWrapper">
    <div>
      <p className="trackTitle">
        {activeSong?.title ? activeSong?.title : "No active Song"}
      </p>
      <p className="trackSubtitle">
        {activeSong?.subtitle ? activeSong?.subtitle : "No active Song"}
      </p>
    </div>
  </div>
);

export default Track;
