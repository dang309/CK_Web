import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  transactions: [],
};

export const TransactionSlice = createSlice({
  name: "transaction",
  initialState: INITIAL_STATE,
  reducers: {
    ADD_TRANSACTION: (state, action) => {
      state.transactions.push(action.payload);
    },
    SET_TRANSACTIONS: (state, action) => {
      state.transactions = action.payload;
    },
  },
});

export const { ADD_TRANSACTION, SET_TRANSACTIONS } = TransactionSlice.actions;

export default TransactionSlice.reducer;
