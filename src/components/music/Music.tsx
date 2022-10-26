import React, { useEffect } from "react";
import "./music.css";
import Song from "../song/Song";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { AppDispatch } from "../../redux/store";
import { playPause, fetchCreateUserMusic } from "../../redux/slices/MusicSlice";

const Music: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector(
    (state: RootState) => state.authReducer?.userData.user
  );
  const activeSong = useSelector(
    (state: RootState) => state.musicReducer?.activeSong
  );
  const isPlaying = useSelector(
    (state: RootState) => state.musicReducer?.isPlaying
  );
  const selectedMusic = useSelector(
    (state: RootState) => state.musicReducer?.selectedGanre
  );
  const activeCategorie = useSelector(
    (state: RootState) => state.musicReducer?.activeCategorie
  );
  const searchedSongs = useSelector(
    (state: RootState) => state.musicReducer?.searchedSongs
  );
  const musicId = useSelector(
    (state: RootState) => state.musicReducer?.userMusic?._id
  );
  const userSongs = useSelector(
    (state: RootState) => state.musicReducer?.userMusic?.myMusic
  );

  useEffect(() => {
    dispatch(playPause(false));

    const createUserMusic = async () => {
      const createMusicParams = {
        userId: user && user._id,
      };

      if (!musicId) {
        await dispatch(fetchCreateUserMusic(createMusicParams));
      }
    };

    createUserMusic();

    return () => {
      dispatch(playPause(false));
    };
  }, []);

  return (
    <div className="music">
      <div className="musicWrapper">
        {activeCategorie === "myMusic" &&
          userSongs?.map((song, i) => (
            <Song
              key={song.key}
              song={song}
              isPlaying={isPlaying}
              activeSong={activeSong}
              data={selectedMusic}
            />
          ))}
        {activeCategorie !== "search" && activeCategorie !== "myMusic"
          ? selectedMusic?.map((song, i) => (
              <Song
                key={song.key}
                song={song}
                isPlaying={isPlaying}
                activeSong={activeSong}
                data={selectedMusic}
              />
            ))
          : searchedSongs?.map((song) => (
              <Song
                key={song.track.key}
                song={song.track}
                isPlaying={isPlaying}
                activeSong={activeSong}
                data={searchedSongs}
              />
            ))}
      </div>
    </div>
  );
};

export default Music;
