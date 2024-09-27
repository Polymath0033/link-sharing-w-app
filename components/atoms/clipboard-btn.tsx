"use client";
import { FC } from "react";
import { AppButton } from "./buttons/app-button";
import { useAppDispatch } from "@/hooks/redux";
import { toastHandler } from "@/redux/thunk-functions";
export const ClipboardBtn: FC = () => {
  const dispatch = useAppDispatch();
  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    dispatch(
      toastHandler({
        type: "preview",
        message: "The link has been copied to your clipboard!",
      })
    );
  };
  return <AppButton onClick={copyLink} value="Share link" className="!w-fit" />;
};
