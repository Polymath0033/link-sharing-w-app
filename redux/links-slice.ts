import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { supabase } from "@/utils/supabase/client";
import { fetchLinks, addLinks, removeLink } from "./thunk-functions";
import { toast } from "react-toastify";
import { Links } from "@/types/redux";

const linksReducer = createSlice({
  name: "links",
  initialState: {
    links: [] as Links,
    isLinksLoading: false,
    // Define the initial state here
  },
  reducers: {
    addNewLink: (state, action: PayloadAction) => {},
    // Define the reducers here
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLinks.pending, (state, action) => {
      state.isLinksLoading = true;
    });
    builder.addCase(fetchLinks.fulfilled, (state, action) => {
      state.isLinksLoading = false;
      state.links = action.payload;
      toast.success("Links fetched successfully");
    });

    builder.addCase(fetchLinks.rejected, (state, action) => {
      state.isLinksLoading = false;
      toast.error(action.error.message);
    });
    builder.addCase(
      addLinks.fulfilled,
      (state, action: PayloadAction<Links>) => {
        const newLinks = action.payload.filter(
          (newLink) => !state.links.some((link) => link.id === newLink.id)
        );
        state.links = [...state.links, ...newLinks];
        toast.success("Links added successfully");
      }
    );
    builder.addCase(addLinks.rejected, (state, action) => {
      toast.error(action.error.message);
    });
    builder.addCase(removeLink.fulfilled, (state, action) => {
      state.links = state.links.filter((link) => link.id !== action.meta.arg);
      toast.success("Link removed successfully");
    });
    builder.addCase(removeLink.rejected, (state, action) => {
      console.log(action);
      toast.error("Failed to remove this link");
    });
  },
});
export const linksAction = linksReducer.actions;
export default linksReducer.reducer;
