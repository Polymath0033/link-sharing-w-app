import { createSlice } from "@reduxjs/toolkit";
import { supabase } from "@/utils/supabase/client";
import { fetchLinks, addLinks } from "./thunk-functions";
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
    // Define the reducers here
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLinks.pending, (state, action) => {
      state.isLinksLoading = true;
    });
    builder.addCase(fetchLinks.fulfilled, (state, action) => {
      state.isLinksLoading = false;
      state.links = action.payload;
      // toast.success("Links fetched successfully");
    });

    builder.addCase(fetchLinks.rejected, (state, action) => {
      state.isLinksLoading = false;
      toast.error(action.error.message);
    });
    builder.addCase(addLinks.fulfilled, (state, action) => {
      state.links = [...state.links, ...action.payload];
      console.log(action.payload);
      console.log(state.links);
      toast.success("Links added successfully");
    });
    builder.addCase(addLinks.rejected, (state, action) => {
      toast.error(action.error.message);
    });
  },
});
export const linksAction = linksReducer.actions;
export default linksReducer.reducer;
