import { configureStore } from "@reduxjs/toolkit";
import storeReducer from "./store-slice";
export const store = configureStore({
  reducer: {
    store: storeReducer,
  },
});
