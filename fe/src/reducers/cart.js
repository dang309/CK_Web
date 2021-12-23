import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  items: [],
};

export const CartSlice = createSlice({
  name: "cart",
  initialState: INITIAL_STATE,
  reducers: {
    SET_ITEMS: (state, action) => {
      state.items = action.payload;
    },
    ADD_ITEM_TO_CART: (state, action) => {
      state.items.push(action.payload);
    },
    UPDATE_QUANTITY: (state, action) => {
      const _items = state.items.slice();
      const cProductIndex = _items.findIndex(
        (item) => item.productId === action.payload.productId
      );
      _items[cProductIndex].quantityInCart = action.payload.quantityInCart;
      _items[cProductIndex].quantity = action.payload.quantity;
      state.items = _items;
    },
    REMOVE_ITEM_BY_ID: (state, action) => {
      const item = state.items.findIndex(
        (item) => item.productId === action.payload.productId
      );
      state.items.splice(item, 1);
    },
    REMOVE_ALL_ITEM_IN_CART: (state) => {
      state.items = [];
    },
  },
});

export const {
  SET_ITEMS,
  ADD_ITEM_TO_CART,
  UPDATE_QUANTITY,
  REMOVE_ITEM_BY_ID,
  REMOVE_ALL_ITEM_IN_CART,
} = CartSlice.actions;

export default CartSlice.reducer;
