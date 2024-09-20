"use client";
import { Provider } from "react-redux";
import { store } from "@/redux";
import React from "react";
import { ToastProvider } from "../molecules/toast-provider";
const LayoutWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Provider store={store}>
      {children}
      {/* <ToastProvider>{children}</ToastProvider> */}
    </Provider>
  );
};

export default LayoutWrapper;
