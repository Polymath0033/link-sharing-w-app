import { createSlice } from "@reduxjs/toolkit";
import { fetchUser } from "./thunk-functions";
import { User } from "@supabase/supabase-js";
import { toast } from "react-toastify";
// Define a thunk for fetching the user

const authReducer = createSlice({
  name: "auth",
  initialState: {
    user: null as User | null,
    isAuthLoading: false,
  },
  reducers: {
    // setUser: (state, action) => {
    //   state.user = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state, action) => {
      state.isAuthLoading = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.isAuthLoading = false;
      state.user = action.payload;
      // toast.success("User fetched successfully");
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.isAuthLoading = false;
      console.log(action.error.message);
      toast.error(action.error.message);
    });
  },
});
export const authAction = authReducer.actions;
export default authReducer.reducer;
