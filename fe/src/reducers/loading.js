import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  isActive: false,
};

export const LoadingSlice = createSlice({
  name: "loading",
  initialState: INITIAL_STATE,
  reducers: {
    ACTIVE_LOADING: (state) => {
      state.isActive = true;
    },
    STOP_LOADING: (state) => {
      state.isActive = false;
    },
  },
});

export const { ACTIVE_LOADING, STOP_LOADING } = LoadingSlice.actions;

export default LoadingSlice.reducer;
