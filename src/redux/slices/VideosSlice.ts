import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { YtVideo } from "../../components/videoSingle/VideoSingle";

const URL = 'https://youtube-v31.p.rapidapi.com';

const oldKey = '955b3bd9a2msh85c8354d60e9b76p19863djsnb205e04031b5'
const newKey = "f03ce5b998msh6c85792591c6b4bp1486d1jsn4a7d07f25463"

const options = {
    url: URL ,
    params: {
      maxResults: '50'
    },
    headers: {
      'X-RapidAPI-Key': "puk-puk",
      'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
    }
  };

export const fetchVideosFromAPI = async (url: string) => {
  const { data } = await axios.get(`${URL}/${url}`, options);
    console.log(data);
  return data
}

//TYPES

type videoSliceType = {
  userVideos: {
    userId: string | null,
    videos: YtVideo[],
    _id: string;
  },
  friendVideos: YtVideo[];
  searchVideos: YtVideo[];
  status: string;
}

type HandleVideoParams = {
  userId: string | undefined;
  video?: YtVideo;
  videoId?: string;
}

type GetVideosParams = {
  _id: string;
}

type GetVideosResponse = {
  _id?: string;
  userId: string | undefined;
  videos?: YtVideo[];
}

// THUNKS
export const fetchSearchVideos = createAsyncThunk(
  "videos/fetchSearchVideos",
  async (params:string | undefined) => {
    const { data } = await axios.get(`${URL}/search?part=snippet&q=${params}`, options);
    return data
  }
);

export const fetchCreateUserVideos = createAsyncThunk(
  "videos/fetchCreateUserVideos",
  async (params: HandleVideoParams) => {
    const { data } = await axios.post("/videos/create", params);
    return data
  }
);

export const fetchGetUserVideos = createAsyncThunk(
  "videos/fetchGetUserVideos",
  async (params: string | undefined) => {
    const { data } = await axios.get(`/videos/${params}`);
    return data
  }
);

export const fetchGetFriendsVideos = createAsyncThunk(
  "videos/fetchGetFriendsVideos",
  async (params: string | undefined) => {
    const { data } = await axios.get(`/videos/${params}`);
    return data
  }
);

export const fetchHandleVideo = createAsyncThunk(
  "videos/fetchHandleVideo",
  async (params: HandleVideoParams) => {
    const { data } = await axios.put("/videos", params);
    return data
  }
);


// STATE
const initialState: videoSliceType = {
  userVideos: {
    userId: null,
    videos: [],
    _id: "",
  },
  friendVideos: [],
  searchVideos: [],
  status: "loading",
};


// SLICE
const videosSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //FETCH SEARCH VIDEOS
    builder.addCase(fetchSearchVideos.pending, (state) => {
      state.status = "loading";
    })
    builder.addCase(fetchSearchVideos.fulfilled, (state, action) => {
      state.searchVideos = action.payload.items;
      state.status = "succese";
    })
    builder.addCase(fetchSearchVideos.rejected, () => {
      console.log("smthng goes wrong in fetchAllVideos");
    })
      // FETCH HANDLEVIDEO
      builder.addCase(fetchHandleVideo.pending, (state) => {
        state.status = "loading";
      })
      builder.addCase(fetchHandleVideo.fulfilled, (state, action) => {
        state.userVideos = action.payload;
        state.status = "succese";
      })
      builder.addCase(fetchHandleVideo.rejected, () => {
        console.log("smthng goes wrong in fetchHandleVideo");
      })
        // FETCH HANDLE create new userVideos
        builder.addCase(fetchCreateUserVideos.pending, (state) => {
          state.status = "loading";
        })
        builder.addCase(fetchCreateUserVideos.fulfilled, (state, action) => {
          state.userVideos = action.payload;
          state.status = "succese";
        })
        builder.addCase(fetchCreateUserVideos.rejected, () => {
          console.log("smthng goes wrong in fetchCreateUserVideos");
        })
          // FETCH HANDLE GET userVideos
          builder.addCase(fetchGetUserVideos.pending, (state) => {
            state.status = "loading";
          })
          builder.addCase(fetchGetUserVideos.fulfilled, (state, action) => {
            state.userVideos = action.payload[0];
            state.status = "succese";
          })
          builder.addCase(fetchGetUserVideos.rejected, () => {
            console.log("smthng goes wrong in fetchGetUserVideos");
          })
            // FETCH HANDLE GET FRIENDS VIDEOS
            builder.addCase(fetchGetFriendsVideos.pending, (state) => {
              state.status = "loading";
            })
            builder.addCase(fetchGetFriendsVideos.fulfilled, (state, action) => {
              state.friendVideos = action.payload[0].videos;
              state.status = "succese";
            })
            builder.addCase(fetchGetFriendsVideos.rejected, () => {
              console.log("smthng goes wrong in fetchGetFriendsVideos");
            })
    ;
  },
});

export const videosReducer = videosSlice.reducer;