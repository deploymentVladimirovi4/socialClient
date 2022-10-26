import React from "react";
import {
  BsFillVolumeUpFill,
  BsVolumeDownFill,
  BsFillVolumeMuteFill,
} from "react-icons/bs";

type VolumeBarProps = {
  value: number;
  min: string;
  max: string;
  onChange: (event: any) => void;
  setVolume: (event: any) => void;
};

const VolumeBar: React.FC<VolumeBarProps> = ({
  value,
  min,
  max,
  onChange,
  setVolume,
}) => (
  <div className="volume">
    {value <= 1 && value > 0.5 && (
      <BsFillVolumeUpFill
        size={25}
        color="black"
        onClick={() => setVolume(0)}
      />
    )}
    {value <= 0.5 && value > 0.01 && (
      <BsVolumeDownFill size={25} color="black" onClick={() => setVolume(0)} />
    )}
    {value < 0.01 && (
      <BsFillVolumeMuteFill
        size={25}
        color="black"
        onClick={() => setVolume(1)}
      />
    )}
    <input
      className="volumeInput"
      type="range"
      step="any"
      value={value}
      min={min}
      max={max}
      onChange={onChange}
    />
  </div>
);

export default VolumeBar;
