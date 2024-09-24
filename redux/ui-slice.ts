import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
type UiState = {
  header: "links" | "profile";
};
const initialState: UiState = {
  header: "links",
};

export const uiSlice = createSlice({
  name: "ui",
  initialState: initialState,
  reducers: {
    handleUi: (state, action: PayloadAction<"links" | "profile">) => {
      state.header = action.payload;
    },
  },
});
export const uiAction = uiSlice.actions;
export default uiSlice.reducer;
