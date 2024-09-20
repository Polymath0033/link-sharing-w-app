import { createSlice } from "@reduxjs/toolkit";
export const userReducer = createSlice({
  name: "user",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {},
});
export const userAction = userReducer.actions;
export default userReducer.reducer;
