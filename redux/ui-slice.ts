import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
type UiState = {
  header: "links" | "profile";
  toastType: { type: "user-details" | "preview"; message: string } | null;
  toastShow: boolean;
};
const initialState: UiState = {
  header: "links",
  toastType: null,
  toastShow: false,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState: initialState,
  reducers: {
    handleUi: (state, action: PayloadAction<"links" | "profile">) => {
      state.header = action.payload;
    },
    showToast: (
      state,
      action: PayloadAction<{
        type: "user-details" | "preview";
        message: string;
      }>
    ) => {
      state.toastType = action.payload;
      state.toastShow = true;
    },
    hideToast: (state) => {
      state.toastShow = false;
      state.toastType = null;
    },
  },
});
export const uiAction = uiSlice.actions;
export default uiSlice.reducer;
