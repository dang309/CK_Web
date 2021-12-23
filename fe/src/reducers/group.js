import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  members: [],
};

export const GroupSlice = createSlice({
  name: "group",
  initialState: INITIAL_STATE,
  reducers: {
    ADD_MEMBER: (state, action) => {
      state.members.push(action.payload);
    },
    SET_MEMBERS: (state, action) => {
      state.members = action.payload;
      console.log(state.members);
    },
  },
});

export const { ADD_MEMBER, SET_MEMBERS } = GroupSlice.actions;

export default GroupSlice.reducer;
