"use client";
import { useAppSelector } from "@/hooks/redux";
import React, { FC, Fragment } from "react";
import { AppToast } from "./app-toast";
export const BodyWrapper: FC<{}> = ({}) => {
  const { toastShow } = useAppSelector((state) => state.ui);
  return <Fragment>{toastShow && <AppToast />}</Fragment>;
};
