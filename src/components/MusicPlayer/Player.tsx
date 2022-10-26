import React, { useRef, useEffect } from "react";
import { ISong } from "../music/musicTypes";

type PlayerProps = {
  activeSong?: ISong | null;
  isPlaying: boolean | undefined;
  volume: number;
  seekTime: number;
  onTimeUpdate: (event: any) => void;
  onLoadedData: (event: any) => void;
};

const Player: React.FC<PlayerProps> = ({
  activeSong,
  isPlaying,
  volume,
  seekTime,
  onTimeUpdate,
  onLoadedData,
}) => {
  const ref = useRef<HTMLAudioElement>(null);
  if (ref.current) {
    if (isPlaying) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  }

  useEffect(() => {
    if (ref.current) {
      ref.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (ref.current) {
      ref.current.currentTime = seekTime;
    }
  }, [seekTime]);

  return (
    <audio
      src={activeSong?.hub?.actions[1]?.uri}
      ref={ref}
      onTimeUpdate={onTimeUpdate}
      onLoadedData={onLoadedData}
    />
  );
};

export default Player;
