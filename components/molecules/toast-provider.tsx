"use client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { FC } from "react";
export const ToastProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <>
      {children}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        closeOnClick
        rtl={false}
        pauseOnHover
        draggable
      />
    </>
  );
};
