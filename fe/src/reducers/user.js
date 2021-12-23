import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  user: {},
  isRemeberMe: false,
  isLoggedIn: false,
};

export const UserSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    SET_USER_INFO: (state, action) => {
      state.user = action.payload;
    },
    SET_REMEMBER_ME: (state, action) => {
      state.isRemeberMe = action.payload;
    },
    UPDATE_USER: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    LOGIN: (state) => {
      state.isLoggedIn = true;
    },
    LOGOUT: (state) => {
      state.isLoggedIn = false;
      state.user = {};
      state.isRemeberMe = false;
    },
  },
});

export const { SET_USER_INFO, SET_REMEMBER_ME, UPDATE_USER, LOGIN, LOGOUT } =
  UserSlice.actions;

export default UserSlice.reducer;
