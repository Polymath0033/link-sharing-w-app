"use client";
import { FC, Fragment } from "react";
import { ImageUpload } from "./image-upload";
import { AppInput } from "../atoms/inputs/app-input";
import { AppButton } from "../atoms/buttons/app-button";
import { useReducer, useState, useEffect } from "react";
import { supabase } from "@/utils/supabase/client";

import { UserData } from "@/types/user-data";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { uiAction } from "@/redux/ui-slice";
type InitialState = {
  firstName: {
    value: string;
    error: string;
    blur: boolean;
  };
  lastName: { value: string; error: string; blur: boolean };
  email: { value: string; error: string; blur: boolean };
  loading: boolean;
};
const initialState: InitialState = {
  firstName: { value: "", error: "", blur: false },
  lastName: { value: "", error: "", blur: false },
  email: { value: "", error: "", blur: false },
  loading: false,
};
type Action =
  | {
      type: "firstName";
      payload: { value: string; error: string; blur: boolean };
    }
  | {
      type: "lastName";
      payload: { value: string; error: string; blur: boolean };
    }
  | { type: "email"; payload: { value: string; error: string; blur: boolean } }
  | { type: "loading"; payload: boolean };
const reducer = (state: InitialState, action: Action): InitialState => {
  switch (action.type) {
    case "firstName":
      return {
        ...state,
        firstName: {
          ...state.firstName,
          value: action.payload.value,
          error: action.payload.error,
          blur: action.payload.blur,
        },
      };
    case "lastName":
      return {
        ...state,
        lastName: {
          ...state.lastName,
          value: action.payload.value,
          error: action.payload.error,
          blur: action.payload.blur,
        },
      };
    case "email":
      return {
        ...state,
        email: {
          ...state.email,
          value: action.payload.value,
          error: action.payload.error,
          blur: action.payload.blur,
        },
      };
    case "loading":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};
export const ProfileDetails: FC<{ user: UserData }> = ({ user }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [image, setImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  //  const { user } = useAppSelector((state) => state.user);
  const dispatch_ = useAppDispatch();
  const imageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const allowedTypes = ["image/jpeg", "image/png"];
    const maxSizeInBytes = 1 * 1024 * 1024;
    if (file) {
      if (!allowedTypes.includes(file.type)) {
        alert("File type not supported!");
        return;
      }
      if (file.size > maxSizeInBytes) {
        alert("File is too big!");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      setImageFile(file);
    }
  };
  useEffect(() => {
    if (user) {
      dispatch({
        type: "firstName",
        payload: { value: user[0]?.first_name, error: "", blur: false },
      });
      dispatch({
        type: "lastName",
        payload: { value: user[0]?.last_name, error: "", blur: false },
      });
      dispatch({
        type: "email",
        payload: { value: user[0]?.email, error: "", blur: false },
      });
      setImage(user[0]?.image_url);
    }
  }, [user]);

  const submitProfileDetails = async () => {
    let isFormValid = true;
    if (state.firstName.value.trim() === "") {
      isFormValid = false;
      dispatch({
        type: "firstName",
        payload: {
          value: state.firstName.value,
          error: "Can't be empty",
          blur: true,
        },
      });
    }
    if (state.lastName.value.trim() === "") {
      isFormValid = false;
      dispatch({
        type: "lastName",
        payload: {
          value: state.lastName.value,
          error: "Can't be empty",
          blur: true,
        },
      });
    }
    if (
      state.email.value.trim() !== "" &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email.value)
    ) {
      isFormValid = false;
      dispatch({
        type: "email",
        payload: {
          value: state.email.value,
          error: "Please check again",
          blur: true,
        },
      });
    }
    if (!isFormValid) {
      return;
    }
    try {
      dispatch({ type: "loading", payload: true });
      const { data: user } = await supabase.auth.getUser();
      const id = user?.user?.id;
      if (id) {
        const { data, error: fetchError } = await supabase
          .from("user")
          .select("*")
          .eq("user_id", id);
        const userData: UserData = data ? data : [];
        if (fetchError) throw fetchError;

        if (userData && userData.length > 0) {
          // User exists, proceed with update
          if (imageFile) {
            const filePath = `user_image/${id}/${imageFile.name}`;
            const { data: files, error: listError } = await supabase.storage
              .from("user_image")
              .list(`${id}/user_image`);
            if (listError) throw listError;
            console.log("filess", files);
            console.log(listError);
            let uploadError;
            if (userData[0].image_url.length > 0) {
              const { error } = await supabase.storage
                .from("user_image")
                .upload(filePath, imageFile, {
                  cacheControl: "3600",
                  upsert: true,
                });
              // (bucket_id = 'user_image'::text)
              console.log(error);
            } else {
              const { error } = await supabase.storage
                .from("user_image")
                .upload(filePath, imageFile, {
                  cacheControl: "3600",
                  upsert: true,
                });
            }
            if (uploadError) throw uploadError;

            const { data: publicURLData } = supabase.storage
              .from("user_image")
              .getPublicUrl(filePath);
            const publicUrl = publicURLData?.publicUrl;

            if (publicUrl) {
              const { data, error } = await supabase
                .from("user")
                .update({
                  first_name: state.firstName.value,
                  last_name: state.lastName.value,
                  email: state.email.value,
                  image_url: publicUrl,
                })
                .eq("user_id", id);
              if (error) throw error;
              console.log("data for update", data);
            }
          }
        } else {
          console.log("Inserting new user");
          if (imageFile) {
            const filePath = `user_image/${id}/${imageFile.name}`;
            const { data, error } = await supabase.storage
              .from("user_image")
              .upload(filePath, imageFile, {
                cacheControl: "3600",
                upsert: false,
              });
            if (error) throw error;

            const { data: publicURLData } = supabase.storage
              .from("user_image")
              .getPublicUrl(filePath);
            const publicUrl = publicURLData?.publicUrl;

            if (publicUrl) {
              const { error } = await supabase.from("user").insert({
                first_name: state.firstName.value,
                last_name: state.lastName.value,
                email: state.email.value,
                image_url: publicUrl,
                user_id: id,
              });
              if (error) throw error;
            }
          }
        }
      }

      dispatch({ type: "loading", payload: false });
      dispatch_(uiAction.handleUi("links"));
    } catch (error) {
      console.log("Error:", error);
      dispatch({ type: "loading", payload: false });
    }
  };
  return (
    <Fragment>
      <div className=" px-6 sm:px-10 ">
        <h1 className="text-heading-m text-dark-grey">Profile Details </h1>
        <p className="text-grey text-body-m">
          Add your details to create a personal touch to your profile.
        </p>
      </div>
      <section className="rounded-xl px-6 sm:px-10 w-full flex flex-col gap-6 ">
        <div className="flex flex-col sm:flex-row justify-center sm:items-center self-stretch gap-3 sm:gap-4 bg-light-grey rounded-xl w-full p-5">
          <p className="text-grey text-body-m w-[220px]">Profile picture </p>
          <div className="flex flex-col sm:flex-row justify-center items-start sm:items-center gap-6 [flex:1_0_0] ">
            <ImageUpload image={image} imageHandler={imageHandler} />

            <p className="text-grey text-body-s [flex:1_0_0]">
              Image must be below 1024x1024px. Use PNG or JPG format.
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-center self-stretch gap-3 bg-light-grey rounded-xl w-full p-5">
          <div className="flex flex-col sm:flex-row justify-center items-start sm:items-center  self-stretch gap-2 sm:gap-4">
            <p className="text-grey text-body-m w-[220px]">First Name*</p>
            <AppInput
              className="[flex:1_0_0]"
              id="first-name"
              placeholder="e.g John"
              value={state.firstName.value}
              blur={state.firstName.blur}
              onChange={(e) =>
                dispatch({
                  type: "firstName",
                  payload: {
                    value: e.target.value,
                    error: e.target.value.trim() === "" ? "Can't be empty" : "",
                    blur: state.firstName.blur,
                  },
                })
              }
              required
              onBlur={() =>
                dispatch({
                  type: "firstName",
                  payload: {
                    value: state.firstName.value,
                    error: state.firstName.error,
                    blur: true,
                  },
                })
              }
              errorValue={state.firstName.error}
              hasError={state.firstName.error.length > 0}
            />
          </div>
          <div className="flex flex-col sm:flex-row items-start justify-center sm:items-center self-stretch gap-2 sm:gap-4">
            <p className="text-grey text-body-m w-[220px]">Last Name*</p>
            <AppInput
              className="[flex:1_0_0]"
              value={state.lastName.value}
              onChange={(e) =>
                dispatch({
                  type: "lastName",
                  payload: {
                    value: e.target.value,
                    error: e.target.value.trim() === "" ? "Can't be empty" : "",
                    blur: state.lastName.blur,
                  },
                })
              }
              id="last-name"
              placeholder="e.g. Appleseed"
              required
              blur={state.lastName.blur}
              onBlur={() =>
                dispatch({
                  type: "lastName",
                  payload: {
                    value: state.lastName.value,
                    error: state.lastName.error,
                    blur: true,
                  },
                })
              }
              errorValue={state.lastName.error}
              hasError={state.lastName.error.length > 0}
            />
          </div>
          <div className="flex flex-col sm:flex-row items-start justify-center sm:items-center self-stretch gap-2 sm:gap-4 ">
            <p className="text-grey text-body-m w-[220px]">Email</p>
            <AppInput
              className="[flex:1_0_0]"
              value={state.email.value}
              onChange={(e) =>
                dispatch({
                  type: "email",
                  payload: {
                    value: e.target.value,
                    error:
                      e.target.value.trim() !== "" &&
                      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email.value)
                        ? "Please check again"
                        : "",
                    blur: state.email.blur,
                  },
                })
              }
              id="email"
              placeholder="e.g. email@example.com"
              type="email"
              blur={state.email.blur}
              errorValue={state.email.error}
              hasError={state.email.error.length > 0}
              onBlur={() =>
                dispatch({
                  type: "email",
                  payload: {
                    value: state.email.value,
                    error: state.email.error,
                    blur: true,
                  },
                })
              }
            />
          </div>
        </div>
      </section>
      <div className="flex flex-col justify-end self-stretch items-start pt-10">
        <div className="bg-borders h-[1px] w-full"></div>
        <div className="px-6 sm:px-10 py-3 flex flex-col self-end items-stretch">
          <AppButton
            onClick={submitProfileDetails}
            value="Save"
            loading={state.loading}
          />
        </div>
      </div>
    </Fragment>
  );
};
