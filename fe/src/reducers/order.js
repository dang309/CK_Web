import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  orders: [],
};

export const OrderSlice = createSlice({
  name: "order",
  initialState: INITIAL_STATE,
  reducers: {
    ADD_ORDER: (state, action) => {
      action.payload.forEach((item) => {
        state.orders.push(item);
      });
    },
  },
});

export const { ADD_ORDER } = OrderSlice.actions;

export default OrderSlice.reducer;
