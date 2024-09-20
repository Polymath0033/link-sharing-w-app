import { createSlice } from "@reduxjs/toolkit";
import { fetchUser } from "./thunk-functions";
import { User } from "@supabase/supabase-js";

// Define a thunk for fetching the user

const authReducer = createSlice({
  name: "auth",
  initialState: {
    user: null as User | null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});
export const authAction = authReducer.actions;
export default authReducer.reducer;
