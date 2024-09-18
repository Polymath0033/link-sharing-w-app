"use client";
import { Provider } from "react-redux";
import { store } from "@/redux";
import React from "react";
const LayoutWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <Provider store={store}>{children}</Provider>;
};

export default LayoutWrapper;
