import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "@/utils/supabase/client";
import { AppDispatch, AppThunk } from ".";
import { uiAction } from "./ui-slice";
export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (_, thunkApi) => {
    // const { dispatch } = thunkApi as { dispatch: AppDispatch };
    try {
      const user = await supabase.auth.getUser();
      //  dispatch(setUser(user));

      return user.data.user;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const fetchLinks = createAsyncThunk(
  "links/fetchLinks",
  async (payload: { user_id: string }, thunkApi) => {
    try {
      const { data, error } = await supabase
        .from("links")
        .select("*")
        .eq("user_id", payload.user_id);
      if (error) throw error;
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const addLinks = createAsyncThunk(
  "links/addLinks",
  async (
    links: { platform: string; link: string; user_id: string }[],
    thunkApi
  ) => {
    try {
      const { data, error } = await supabase
        .from("links")
        .upsert(links, { onConflict: "id", ignoreDuplicates: false })
        .select();
      if (error) throw error;
      console.log(data);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const removeLink = createAsyncThunk(
  "links/removeLink",
  async (id: string, thunkApi) => {
    console.log(id);
    try {
      const { data, error } = await supabase
        .from("links")
        .delete()
        .eq("id", id);
      if (error) throw error;
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
// users-details thunks
export const addUsersDetails = createAsyncThunk(
  "user/addUserDetails",
  async (
    details: {
      first_name: string;
      last_name: string;
      email: string;
      user_id: string;
      image_url: string;
    },
    thunkApi
  ) => {
    try {
      const { data, error } = await supabase
        .from("user")
        .insert([details])
        .select();
      if (error) throw error;
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const fetchUsersDetails = createAsyncThunk(
  "user/fetchUserDetails",
  async (user_id: string, thunkApi) => {
    try {
      const { data, error } = await supabase
        .from("user")
        .select("*")
        .eq("user_id", user_id);
      if (error) throw error;
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const updateUsersDetails = createAsyncThunk(
  "user/updateUserDetails",
  async (
    details: {
      first_name: string;
      last_name: string;
      email: string;
      user_id: string;
      image_url: string;
    }[],
    thunkApi
  ) => {
    try {
      if (details.length === 0) return;
      const { data, error } = await supabase
        .from("user")
        .update(details)
        .eq("user_id", details[0].user_id);
      if (error) throw error;
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const toastHandler =
  (toast: { message: string; type: "user-details" | "preview" }): AppThunk =>
  (dispatch) => {
    dispatch(uiAction.showToast(toast));
    setTimeout(() => {
      dispatch(uiAction.hideToast());
    }, 3000);
  };
