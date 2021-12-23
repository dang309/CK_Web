import { configureStore } from "@reduxjs/toolkit";
import userReducer from "src/reducers/user";
import cartReducer from "src/reducers/cart";
import notiReducer from "src/reducers/noti";
import transactionReducer from "src/reducers/transaction";
import groupReducer from "src/reducers/group";
import loadingReducer from "src/reducers/loading";

import storage from "redux-persist/lib/storage";

import { combineReducers } from "redux";

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const reducers = combineReducers({
  cart: cartReducer,
  user: userReducer,
  noti: notiReducer,
  transaction: transactionReducer,
  group: groupReducer,
  loading: loadingReducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["user", "cart", "transaction"],
  blacklist: ["group"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
