import { configureStore } from "@reduxjs/toolkit";
import linksReducer from "./links-slice";
import authReducer from "./auth-slice";
import userReducer from "./user-slice";
import uiSlice from "./ui-slice";
import { ThunkAction, Action } from "@reduxjs/toolkit";
export const store = configureStore({
  reducer: {
    links: linksReducer,
    auth: authReducer,
    user: userReducer,
    ui: uiSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
