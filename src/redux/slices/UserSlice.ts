import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { UserDataType } from "./AuthSlice";


//TYPES
type UserStateType = {
  users: UserDataType[];
  status: string;
}

// THUNKS
export const fetchAllUsers = createAsyncThunk(
  "user/fetchAllUsers",
  async () => {
    const { data } = await axios.get<UserDataType[]>("/users");
    return data
  }
);

// STATE
const initialState: UserStateType = {
  users: [],
  status: "loading",
};


// SLICE
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //FETCH ALL USERS
    builder.addCase(fetchAllUsers.pending, (state) => {
      state.status = "loading";
    })
    builder.addCase(fetchAllUsers.fulfilled, (state: UserStateType, action) => {
      state.users = action.payload;
      state.status = "succese";
    })
    builder.addCase(fetchAllUsers.rejected, () => {
      console.log("smthng goes wrong in fetchAllUsers");
    });
  },
});

export const userReducer = userSlice.reducer;
