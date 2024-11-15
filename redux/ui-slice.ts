import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
let initialHeader: "links" | "profile" = "links";

if (typeof window !== "undefined") {
  const params = new URLSearchParams(window.location.search);
  initialHeader = params.get("tab") === "profile" ? "profile" : "links";
}
// const params = new URLSearchParams(window.location.search);
// const initialHeader = params.get("tab") === "profile" ? "profile" : "links";

type UiState = {
  header: "links" | "profile";
  toastType: { type: "user-details" | "preview"; message: string } | null;
  toastShow: boolean;
};

const initialState: UiState = {
  header: initialHeader,
  toastType: null,
  toastShow: false,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState: initialState,
  reducers: {
    handleUi: (state, action: PayloadAction<"links" | "profile">) => {
      const params = new URLSearchParams(window.location.search);
      state.header = action.payload;
      if (action.payload === "links") {
        params.delete("tab");
        window.history.pushState({}, "", "/");
      } else if (action.payload === "profile") {
        params.set("tab", "profile");
        window.history.pushState({}, "", "/?tab=profile");
      }
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
