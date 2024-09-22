"use client";
import React, { FC, use, useEffect } from "react";
import { AppHeader } from "@/components/molecules/header";
import { FrameOne } from "../atoms/frames/frame-one";
import { FrameTwo } from "../atoms/frames/frame-two";
import { PhoneView } from "./phone-view";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchUser, fetchUsersDetails } from "@/redux/thunk-functions";
export const HomeWrapper: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth.user);
  useEffect(() => {
    const fetchUser_ = async () => {
      try {
        await dispatch(fetchUser());
        if (auth?.id) {
          await dispatch(fetchUsersDetails(auth.id));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser_();
  }, [dispatch, auth?.id]);
  return (
    <div className="sm:p-6 flex flex-col">
      <AppHeader />
      <main className="flex [flex:1_0_0] mt-6 gap-6 self-stretch items-start h-screen md:h-[calc(100vh_+_200px)] p-4 sm:p-0">
        <section className="bg-white p-6 hidden md:flex gap-2 justify-center items-center self-stretch h-full w-2/5 max-w-[560px] rounded-xl ">
          {/* */}
          <div className="relative w-[307px] h-[631px]  flex items-center justify-center flex-col">
            <FrameOne />
            <FrameTwo />
            <PhoneView />
          </div>
        </section>
        <section className="flex flex-col relative items-start [flex:1_0_0] gap-10 bg-white h-full pt-10 pb-6 rounded-xl overflow-y-scroll no-scrollbar overflow-x-hidden md:scrollbar">
          {children}
        </section>
      </main>
    </div>
  );
};
