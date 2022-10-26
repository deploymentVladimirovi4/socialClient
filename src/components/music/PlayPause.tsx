import React from "react";
import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";
import { ISong } from "./musicTypes";

type PlayPauseProps = {
  isPlaying: boolean | undefined;
  activeSong: ISong | undefined | null;
  song: ISong;
  handlePause: () => void;
  handlePlay: () => void;
};

const PlayPause: React.FC<PlayPauseProps> = ({
  isPlaying,
  activeSong,
  song,
  handlePause,
  handlePlay,
}) =>
  isPlaying && activeSong?.title === song.title ? (
    <FaPauseCircle size={35} onClick={handlePause} />
  ) : (
    <FaPlayCircle size={35} onClick={handlePlay} />
  );

export default PlayPause;
