import { reqType } from './../../components/share/Share';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { RootState } from "../store";
import { PostReqType } from '../../components/post/Post';


//TYPES
export type SinglePostType = {
  createdAt: string;
  _id: string;
  userId: string;
  userName: string;
  userPicture: string;
  desription: string;
  image: string;
  likes: string[];
}

type PostStateType = {
  posts: SinglePostType[];
  feed: SinglePostType[];
  status: string;
  search: {
    isSearch: boolean;
    searchValue: string;
  }
}


// THUNKS
export const fetchAllPosts = createAsyncThunk(
  "posts/fetchAllPosts",
  async () => {
    const { data } = await axios.get<SinglePostType[]>("/post");
    return data.sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1));
  }
);

export const fetchFeed = createAsyncThunk(
  "posts/fetchFeed",
  async (params: string | undefined) => {
    const { data } = await axios.get<SinglePostType[]>(`/newsfeed/${params}`);
    return data.sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1));
  }
);

export const fetchAddPost = createAsyncThunk(
  "posts/fetchAddPost",
  async (params: reqType) => {
    const { data } = await axios.post("/post", params);
    return data.sort((a:any, b:any) => (b.createdAt > a.createdAt ? 1 : -1));
  }
);

export const fetchDeletePost = createAsyncThunk(
  //some weird shit here, googled it on stackoverflow
  //axios.delete takes two argument, first is a url path and second is config.
  //You need to wrap your params object another object which has a data property.
  "posts/fetchDeletePost",
  async (params: PostReqType) => {
    const { data } = await axios.delete("/post", {data: params});
    console.log("fetchDelete")
    return data.sort((a:any, b:any) => (b.createdAt > a.createdAt ? 1 : -1));
  }
);

export const fetchLikePost = createAsyncThunk(
  "posts/fetchLikePost",
  async (params: PostReqType) => {
    const { data } = await axios.put("/like", params);
    return data.sort((a:any, b:any) => (b.createdAt > a.createdAt ? 1 : -1));
  }
);


// STATE
const initialState: PostStateType = {
  posts: [],
  feed: [],
  status: "loading",
  search: {
    isSearch: false,
    searchValue: "",
  }
};


// SLICE
const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setIsSearch: (state, action) => {
      state.search.isSearch = action.payload
    },
    setSearchValue: (state, action) => {
      state.search.searchValue = action.payload
    },
  },
  extraReducers: (builder) => {
    //FETCH ALL POSTS
    builder.addCase(fetchAllPosts.pending, (state) => {
      state.status = "loading";
    })
    builder.addCase(fetchAllPosts.fulfilled, (state: PostStateType, action) => {
      state.posts = action.payload;
      state.status = "succese";
    })
    builder.addCase(fetchAllPosts.rejected, () => {
      console.log("smthng goes wrong in fetchAllPosts");
    })
      // FETCH FEED
      builder.addCase(fetchFeed.pending, (state) => {
        state.status = "loading";
      })
      builder.addCase(fetchFeed.fulfilled, (state, action) => {
        state.feed = action.payload;
        state.status = "succese";
      })
      builder.addCase(fetchFeed.rejected, () => {
      console.log("smthng goes wrong in fetchFeed");
      })
      // FETCH ADD POST
        builder.addCase(fetchAddPost.pending, (state) => {
          state.status = "loading";
        })
        builder.addCase(fetchAddPost.fulfilled, (state, action) => {
          // console.log(action.payload);
          state.posts = action.payload
          state.status = "succese";
        })
        builder.addCase(fetchAddPost.rejected, () => {
          console.log("smthng goes wrong in fetchAddPost");
        })
          // FETCH DELETE POST
          builder.addCase(fetchDeletePost.pending, (state) => {
            state.status = "loading";
          })
          builder.addCase(fetchDeletePost.fulfilled, (state, action) => {
            state.posts = action.payload
            state.status = "succese";
          })
          builder.addCase(fetchDeletePost.rejected, () => {
            console.log("smthng goes wrong in fetchDeletePost");
          })
            // FETCH LIKE - DISLIKE
            builder.addCase(fetchLikePost.pending, (state) => {
              state.status = "loading";
            })
            builder.addCase(fetchLikePost.fulfilled, (state, action) => {
              state.posts = action.payload
              state.status = "succese";
            })
            builder.addCase(fetchLikePost.rejected, () => {
              console.log("smthng goes wrong in fetchLikePost");
            })
      ;
  },
});

export const { setIsSearch } = postSlice.actions;
export const { setSearchValue } = postSlice.actions;

export const postReducer = postSlice.reducer;
