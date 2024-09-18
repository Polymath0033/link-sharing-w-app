import { createSlice } from "@reduxjs/toolkit";
const storeReducer = createSlice({
  name: "store",
  initialState: {
    // Define the initial state here
  },
  reducers: {
    // Define the reducers here
  },
});
export const storeActions = storeReducer.actions;
export default storeReducer.reducer;
