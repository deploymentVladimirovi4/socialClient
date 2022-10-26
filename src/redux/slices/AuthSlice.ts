import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { RootState } from "../store";
import { EditProfileDataType } from "../../components/user/User";
import { YtVideo } from "../../components/videoSingle/VideoSingle";

export type UserDataType = {
  _id: string;
  username: string;
  email: string;
  password: string;
  coverPicture: string;
  followers: string[];
  followins: string[];
  description: string;
  hometown: string;
  relationship: string;
  birthday: string;
};

type RegisterType = {
  username: string;
  email: string;
  password: string;
}

type AuthType = {
  email: string;
  password: string;
}

type FollowType = {
  id: string | undefined;
  userId: string | undefined;
}

type StateType = {
  userData: {
    user: UserDataType | null;
    token: string;
    myVideos: YtVideo[];
  };
  mobileStatus: boolean;
  status: string;
}

export const fetchRegister = createAsyncThunk(
  "auth/fetchRegister",
  async (params: RegisterType) => {
    const { data } = await axios.post("/register", params);
    return data;
  }
);

export const fetchAuth = createAsyncThunk(
  "auth/fetchAuth",
  async (params: AuthType) => {
    const { data } = await axios.post("/login", params);
    return data;
  }
);

export const fetctEditProfile = createAsyncThunk(
  "auth/fetctEditProfile",
  async (params: EditProfileDataType) => {
    const { data } = await axios.put<UserDataType>(`/users/${params.userId}`, params);
    return data;
  }
);

export const fetchFollowUser = createAsyncThunk(
  "auth/fetchFollowUsers",
  async (params: FollowType) => {
    const { data } = await axios.put<UserDataType>(`/user/${params.id}/follow`, params);
    return data
  }
);

export const fetchUnfollowUser = createAsyncThunk(
  "auth/fetchUnfollowUsers",
  async (params: FollowType) => {
    const { data } = await axios.put<UserDataType>(`/user/${params.id}/unfollow`, params);
    return data
  }
);



const initialState: StateType = {
  userData: {
    user: null,
    token: "",
    myVideos: [],
  },
  
  mobileStatus: false,
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state) => {
      state.userData.user = null;
    },
    toggleMobileMenu: (state) => {
      state.mobileStatus = !state.mobileStatus;
      console.log(state.mobileStatus)
    },
  },
  extraReducers: (builder) => {
    // FETCH AUTH
    builder.addCase(fetchAuth.pending, (state) => {
      state.status = "loading";
    })
    builder.addCase(fetchAuth.fulfilled, (state: StateType, action) => {
      state.userData = action.payload;
      state.status = "succese";
    })
    builder.addCase(fetchAuth.rejected, (state) => {
      console.log("smthng goes wrong in fetchAuth");
      state.userData.user = null;
    })
      // FETCH REGISTER
      builder.addCase(fetchRegister.pending, (state) => {
        state.status = "loading";
      })
      builder.addCase(fetchRegister.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.status = "succese";
      })
      builder.addCase(fetchRegister.rejected, (state) => {
        console.log("smthng goes wrong in fetchRegister");
        state.userData.user = null;
      })
        // FETCH EDIT PROFILE
        builder.addCase(fetctEditProfile.pending, (state) => {
          state.status = "loading";
        })
        builder.addCase(fetctEditProfile.fulfilled, (state, action) => {
          state.userData.user = action.payload;
          state.status = "succese";
        })
        builder.addCase(fetctEditProfile.rejected, (state) => {
          console.log("smthng goes wrong in fetctEditProfile");
          state.userData.user = null;
        })
          // FETCH FOLLOW
          builder.addCase(fetchFollowUser.pending, (state) => {
            state.status = "loading";
          })
          builder.addCase(fetchFollowUser.fulfilled, (state, action) => {
            state.userData.user = action.payload;
            state.status = "succese";
          })
          builder.addCase(fetchFollowUser.rejected, (state) => {
            console.log("smthng goes wrong in fetchFollowUser");
            state.userData.user = null;
          })
            // FETCH UNFOLLOW
            builder.addCase(fetchUnfollowUser.pending, (state) => {
              state.status = "loading";
            })
            builder.addCase(fetchUnfollowUser.fulfilled, (state, action) => {
              state.userData.user = action.payload;
              state.status = "succese";
            })
            builder.addCase(fetchUnfollowUser.rejected, (state) => {
              console.log("smthng goes wrong in fetchUnfollowUser");
              state.userData.user = null;
            })
      ;
  },
});

export const selectIsAuth = (state: RootState) => Boolean(state.authReducer.userData.user);

export const { logOut, toggleMobileMenu } = authSlice.actions;

export const authReducer = authSlice.reducer;
