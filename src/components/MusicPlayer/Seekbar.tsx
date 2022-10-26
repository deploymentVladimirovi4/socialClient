import React from "react";

type SeekbarProps = {
  value: number;
  min: string;
  max: number;
  onInput: any;
  setSeekTime: any;
  appTime: any;
};

const Seekbar: React.FC<SeekbarProps> = ({ value, min, max, onInput }) => {
  const getTime = (time: number) =>
    `${Math.floor(time / 60)}:${`0${Math.floor(time % 60)}`.slice(-2)}`;

  return (
    <div className="seekbar">
      <p>{value === 0 ? "0:00" : getTime(value)}</p>
      <input
        className="seekbarInput"
        type="range"
        step="any"
        value={value}
        min={min}
        max={max}
        onInput={onInput}
      />
      <p>{max === 0 ? "0:00" : getTime(max)}</p>
    </div>
  );
};

export default Seekbar;
