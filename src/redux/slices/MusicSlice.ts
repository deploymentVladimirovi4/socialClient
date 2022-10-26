import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { ISong, ISearchedSong } from "../../components/music/musicTypes"

type MusicStateType = {
  currentSongs?: ISong[];
  currentIndex: number;
  isActive?: boolean;
  isPlaying?: boolean;
  activeSong?: ISong | null;
  status: string;
  activeCategorie: string;
  selectedGanre: ISong[];
  searchedSongs: ISearchedSong[];
  userMusic: {
    myMusic: ISong[];
    userId: null | string,
    _id: string,
  },
}

type createUserMusicParams = {
  userId: string | undefined | null
}

type handleSongParams = {
    userId: string | undefined;
    song: ISong;
    songKey: string | undefined;
}

const URL = 'https://shazam-core.p.rapidapi.com/v1';

const KEY = "f03ce5b998msh6c85792591c6b4bp1486d1jsn4a7d07f25463"

const options = {
  url: URL ,
  headers: {
    'X-RapidAPI-Key': KEY,
    'X-RapidAPI-Host': 'shazam-core.p.rapidapi.com'
  }
};

export const fetchSearch = createAsyncThunk(
  "music/fetchSearch",
  async (params: string) => {
    const { data } =await axios.get(`${URL}/search/multi?query=${params}&search_type=SONGS_ARTISTS`, options);
    return data.tracks.hits
  }
);

// THUNKS
export const fetchCreateUserMusic = createAsyncThunk(
  "music/fetchCreateUserMusic",
  async (params: createUserMusicParams) => {
    const { data } = await axios.post("/music/create", params);
    console.log(data, "data created music");
    return data
  }
);

export const fetchGetUserMusic = createAsyncThunk(
  "music/fetchGetUserMusic",
  async (params: string | undefined) => {
    const { data } = await axios.get(`/music/${params}`);
    console.log(data, "GET music data")
    return data
  }
);

export const fetchHandleMusic = createAsyncThunk(
  "music/fetchHandleMusic",
  async (params: handleSongParams) => {
    const { data } = await axios.put("/music", params);
    console.log(data, "data from handle");
    return data
  }
);


const initialState: MusicStateType = {
  currentSongs: [],
  currentIndex: 0,
  isActive: false,
  isPlaying: false,
  activeSong: null,
  status: "",
  activeCategorie: "",
  selectedGanre: [],
  searchedSongs: [],
  userMusic: {
    myMusic: [],
    userId: null,
    _id: "",
  },
};

const musicSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {

    setGanre: (state, action) => {
      state.selectedGanre = action.payload;
      state.isActive = true;
    },
    
    setActiveSong: (state, action) => {
      state.activeSong = action.payload.song;
      state.isActive = true;
    },

    setActiveCategorie: (state, action) => {
      console.log(action.payload)
      state.activeCategorie = action.payload
    },

    playPause: (state, action) => {
      if (!action?.payload) {
        state.isPlaying = !state.isPlaying;
      } else {
        state.isPlaying = action.payload
      }
    },

  },
  extraReducers: (builder) => {
    //FETCH SEARCH
    builder.addCase(fetchSearch.pending, (state) => {
      state.status = "loading";
    })
    builder.addCase(fetchSearch.fulfilled, (state, action) => {
      state.searchedSongs = action.payload
      state.status = "succese";
    })
    builder.addCase(fetchSearch.rejected, (state) => {
      console.log("smthng goes wrong in fetchSearch");
      state.status = "error in fetchSearch";
    })
      // FETCH CREATE USER MUSIC
      builder.addCase(fetchCreateUserMusic.pending, (state) => {
        state.status = "loading";
      })
      builder.addCase(fetchCreateUserMusic.fulfilled, (state, action) => {
        state.userMusic = action.payload
        state.status = "succese";
      })
      builder.addCase(fetchCreateUserMusic.rejected, (state) => {
        console.log("smthng goes wrong in fetchCreateUserMusic");
        state.status = "error in fetchCreateUserMusic";
      })
        // FETCH GET USER MUSIC
        builder.addCase(fetchGetUserMusic.pending, (state) => {
          state.status = "loading";
        })
        builder.addCase(fetchGetUserMusic.fulfilled, (state, action) => {
          state.userMusic.myMusic = action.payload[0].music
          state.status = "succese";
        })
        builder.addCase(fetchGetUserMusic.rejected, (state) => {
          console.log("smthng goes wrong in fetchGetUserMusic");
          state.status = "error in fetchGetUserMusic";
        })
          // FETCH HANDLE MUSIC
          builder.addCase(fetchHandleMusic.pending, (state) => {
            state.status = "loading";
          })
          builder.addCase(fetchHandleMusic.fulfilled, (state, action) => {
            state.userMusic.myMusic = action.payload.music
            state.status = "succese";
          })
          builder.addCase(fetchHandleMusic.rejected, (state) => {
            console.log("smthng goes wrong in fetchHandleMusic");
            state.status = "error in fetchHandleMusic";
          })
  }
});

export const { setActiveSong, playPause, setGanre, setActiveCategorie } = musicSlice.actions;
export const musicReducer = musicSlice.reducer;