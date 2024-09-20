import { createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "@/utils/supabase/client";
export const fetchUser = createAsyncThunk("auth/fetchUser", async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  return data.user;
});
export const fetchLinks = createAsyncThunk("links/fetchLinks", async () => {
  const { data, error } = await supabase.from("links").select("*");
  if (error) throw error;
  return data;
});
export const addLinks = createAsyncThunk(
  "links/addLinks",
  async (links: { platform: string; link: string }[]) => {
    const { data, error } = await supabase.from("links").insert(links).select();
    if (error) throw error;
    return data;
  }
);
export const deleteLink = createAsyncThunk(
  "links/deleteLink",
  async (id: string) => {
    const { data, error } = await supabase.from("links").delete().match({ id });
    if (error) throw error;
    return data;
  }
);
// export const updateLink = createAsyncThunk(
//   "links/updateLink",
//   async (link: { id: string; platform: string; link: string }) => {
//     const { data, error } = await supabase
//       .from("links")
//       .update(link)
//       .match({ id: link.id });
//     if (error) throw error;
//     return data;
//   }
// );
export const updateLinks = createAsyncThunk(
  "links/updateLinks",
  async (links: { id: string; platform: string; link: string }[]) => {
    const { data, error } = await supabase.from("links").upsert(links);
    if (error) throw error;
    return data;
  }
);
export const fetchUserDetails = createAsyncThunk(
  "user/fetchUserDetails",
  async () => {
    const { data, error } = await supabase.from("user").select("*");
    if (error) throw error;
    return data;
  }
);

export const addUserDetail = createAsyncThunk(
  "user/addUserDetail",
  async (user: { name: string; email: string }) => {
    const { data, error } = await supabase.from("user").insert([user]);
    if (error) throw error;
    return data;
  }
);
