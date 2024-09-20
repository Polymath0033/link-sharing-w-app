import { configureStore } from "@reduxjs/toolkit";
import linksReducer from "./links-slice";
import authReducer from "./auth-slice";
import userReducer from "./user-slice";
export const store = configureStore({
  reducer: {
    links: linksReducer,
    auth: authReducer,
    user: userReducer,
  },
});
