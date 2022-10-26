import React from "react";
import "./musicPlayer.css";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";

type ControlsProps = {
  isPlaying: boolean | undefined;
  handlePlayPause: () => void;
};

const Controls: React.FC<ControlsProps> = ({ isPlaying, handlePlayPause }) => (
  <div className="controllers">
    {isPlaying ? (
      <BsFillPauseFill
        size={35}
        color="black"
        onClick={handlePlayPause}
        className="cursorPointer"
      />
    ) : (
      <BsFillPlayFill
        size={35}
        color="black"
        onClick={handlePlayPause}
        className="cursorPointer"
      />
    )}
  </div>
);

export default Controls;
