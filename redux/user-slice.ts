import { createSlice } from "@reduxjs/toolkit";
import { User } from "@/types/redux";
import { toast } from "react-toastify";
import {
  addUsersDetails,
  fetchUsersDetails,
  updateUsersDetails,
} from "./thunk-functions";
import { UserData } from "@/types/user-data";
type InitialState = {
  user: UserData;
  isFetching: boolean;
};
const initialState: InitialState = {
  user: [],
  isFetching: false,
};
export const userReducer = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsersDetails.pending, (state, action) => {
      state.isFetching = true;
    });
    builder.addCase(fetchUsersDetails.fulfilled, (state, action) => {
      state.isFetching = false;
      state.user = action.payload;
      toast.success("User fetched successfully");
    });
    builder.addCase(fetchUsersDetails.rejected, (state, action) => {
      state.isFetching = false;
      toast.error(action.error.message);
    });
    builder.addCase(addUsersDetails.fulfilled, (state, action) => {
      state.user = [...state.user, ...action.payload];
      toast.success("User added successfully");
    });
    builder.addCase(addUsersDetails.rejected, (state, action) => {
      toast.error(action.error.message);
    });
  },
});
export const userAction = userReducer.actions;
export default userReducer.reducer;
