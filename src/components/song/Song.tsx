import React from "react";
import "./song.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { ISong, ISearchedSong } from "../music/musicTypes";
import PlayPause from "../music/PlayPause";
import {
  playPause,
  setActiveSong,
  fetchHandleMusic,
} from "../../redux/slices/MusicSlice";
import { AppDispatch } from "../../redux/store";
import { RiAddCircleLine } from "react-icons/ri";
import { TiDeleteOutline } from "react-icons/ti";

type SongTypeProps = {
  song: ISong;
  isPlaying?: boolean;
  activeSong: ISong | undefined | null;
  data?: ISong[] | ISearchedSong[];
};

const Song: React.FC<SongTypeProps> = ({
  song,
  isPlaying,
  activeSong,
  data,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const userSongs = useSelector(
    (state: RootState) => state.musicReducer?.userMusic?.myMusic
  );
  const userData = useSelector(
    (state: RootState) => state.authReducer.userData.user
  );
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data }));
    dispatch(playPause(!isPlaying));
  };

  const songExists = userSongs?.length
    ? userSongs.filter((s) => s.key === song.key).length > 0
    : false;
  console.log(songExists, "songExists");

  const fetchHandleSong = async (songKey: string | undefined) => {
    console.log(songKey);
    const songData = {
      userId: userData?._id,
      song: song,
      songKey,
    };
    await dispatch(fetchHandleMusic(songData));
    console.log("dispatch from song");
  };

  return (
    <div className="song">
      <div className="songTop group">
        <div
          className={`playPause ${
            activeSong?.title === song.title ? "disp" : "hid"
          }`}
        >
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>
        <div
          className={`${activeSong?.title === song.title ? "activeCover" : ""}`}
        >
          <img
            alt="song_img"
            src={song.images?.coverart}
            className={`${
              activeSong?.title === song.title && isPlaying
                ? "rotate songImg"
                : "songImg"
            }`}
            onClick={() => handlePlayClick()}
          />
        </div>
      </div>

      <div className="songBottom">
        <div className="songTitleSubtitle">
          <p className="songTitle">{song.title.slice(0, 20)}</p>
          <p className="songSubtitle">{song.subtitle.slice(0, 30)}</p>
        </div>
        <div className="addSong" onClick={() => fetchHandleSong(song.key)}>
          {songExists ? (
            <TiDeleteOutline className="deleteSongIcon" />
          ) : (
            <RiAddCircleLine className="addSongIcon" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Song;
