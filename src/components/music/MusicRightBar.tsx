import React, { useState, useEffect } from "react";
import "./musicRightBar.css";
import { BiSearch } from "react-icons/bi";
import MusicPlayer from "../MusicPlayer";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { AppDispatch } from "../../redux/store";
import { charts, rock, hipHop, electronic } from "./charts";
import {
  setGanre,
  fetchSearch,
  setActiveCategorie,
} from "../../redux/slices/MusicSlice";
import { ISong } from "./musicTypes";

const MusicRightBar: React.FC = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const activeSong = useSelector(
    (state: RootState) => state.musicReducer?.activeSong
  );
  const searchSongs = useSelector(
    (state: RootState) => state.musicReducer?.searchedSongs
  );
  const activeCategorie = useSelector(
    (state: RootState) => state.musicReducer?.activeCategorie
  );
  const userMusic = useSelector(
    (state: RootState) => state.musicReducer?.userMusic?.myMusic
  );

  const [activeGanreName, setActiveGanreName] = useState(
    activeCategorie || "charts"
  );

  const handleSetActiveGanre = (activeButton: string, ganre?: ISong[]) => {
    dispatch(setGanre(ganre));
    setActiveGanreName(activeButton);
    dispatch(setActiveCategorie(activeButton));
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(fetchSearch(search));
    dispatch(setGanre(searchSongs));
  };

  return (
    <div className="musicRightBar">
      <div className="musicRightBarWrapper">
        {activeSong?.title && (
          <div className="musicPlayer">
            <MusicPlayer />
          </div>
        )}
        <div className="ganres">
          <button
            className={`ganre ${
              activeGanreName === "myMusic" ? "activeGanre" : ""
            }`}
            onClick={() => handleSetActiveGanre("myMusic", userMusic)}
          >
            My Music
          </button>
          <button
            className={`ganre ${
              activeGanreName === "charts" ? "activeGanre" : ""
            }`}
            onClick={() => handleSetActiveGanre("charts", charts)}
          >
            World Charts
          </button>
          <button
            className={`ganre ${
              activeGanreName === "rock" ? "activeGanre" : ""
            }`}
            onClick={() => handleSetActiveGanre("rock", rock)}
          >
            Rock
          </button>
          <button
            className={`ganre ${
              activeGanreName === "hipHop" ? "activeGanre" : ""
            }`}
            onClick={() => handleSetActiveGanre("hipHop", hipHop)}
          >
            HIP-HOP
          </button>
          <button
            className={`ganre ${
              activeGanreName === "electronic" ? "activeGanre" : ""
            }`}
            onClick={() => handleSetActiveGanre("electronic", electronic)}
          >
            Electronic
          </button>
          <button
            className={`ganre searchBtn ${
              activeGanreName === "search" ? "activeGanre" : ""
            }`}
            onClick={() => handleSetActiveGanre("search")}
          >
            Search
          </button>
        </div>
        <form
          className="searchMusicInputWrapper"
          onSubmit={(e) => handleSearch(e)}
        >
          {activeGanreName === "search" && (
            <input
              type="text"
              className="searchMusicInput"
              placeholder="Search for song or artist..."
              onChange={(e) => setSearch(e.target.value)}
            />
          )}
          {activeGanreName === "search" && (
            <BiSearch className="searchMusicIcon" />
          )}
        </form>
      </div>
    </div>
  );
};

export default MusicRightBar;
