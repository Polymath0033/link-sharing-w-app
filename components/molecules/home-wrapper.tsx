"use client";
import React, { FC, useState, useEffect } from "react";
import { AppHeader } from "@/components/molecules/header";
import { FrameOne } from "../atoms/frames/frame-one";
import { FrameTwo } from "../atoms/frames/frame-two";
import { PhoneView } from "./phone-view";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchUser, fetchUsersDetails } from "@/redux/thunk-functions";
import { HomePage } from "./home";
import { ProfileDetails } from "./profile-details";
import { fetchLinks } from "@/redux/thunk-functions";
import { useSearchParams } from "next/navigation";
import { uiAction } from "@/redux/ui-slice";
export const HomeWrapper: FC<{}> = ({}) => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth.user);
  const { user, isFetching } = useAppSelector((state) => state.user);
  const ui = useAppSelector((state) => state.ui);
  const searchParams = useSearchParams();
  const { links, isLinksLoading } = useAppSelector((state) => state.links);
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
  useEffect(() => {
    const fetchLinks_ = async () => {
      try {
        if (auth?.id !== undefined) {
          await dispatch(fetchLinks({ user_id: auth.id }));
        }
      } catch (error) {}
    };
    fetchLinks_();
  }, [dispatch, auth?.id]);
  useEffect(() => {
    if (!user) {
      const params = new URLSearchParams(searchParams);
      dispatch(uiAction.handleUi(params.get("header") as "links" | "profile"));
    }
  }, [dispatch, searchParams, user]);
  return (
    <div className="sm:p-6 flex flex-col">
      <AppHeader />
      <main className="flex [flex:1_0_0] mt-6 gap-6 self-stretch items-start h-screen md:h-[calc(100vh_+_200px)] p-4 sm:p-0">
        <section className="bg-white p-6 hidden md:flex gap-2 justify-center items-center self-stretch h-full w-2/5 max-w-[560px] rounded-xl ">
          {/* */}
          <div className="relative w-[307px] h-[631px]  flex items-center justify-center flex-col">
            <FrameOne />
            <FrameTwo />
            <PhoneView
              id={auth?.id}
              user={user}
              email={auth?.email}
              isFetching={isFetching}
              links={links}
              isLinksLoading={isLinksLoading}
            />
          </div>
        </section>
        <section className="flex flex-col relative items-start [flex:1_0_0] gap-10 bg-white h-full pt-10 pb-6 rounded-xl overflow-y-scroll no-scrollbar overflow-x-hidden md:scrollbar">
          {ui.header === "links" ? (
            <HomePage links={links} />
          ) : (
            <ProfileDetails user={user} email={auth?.email} />
          )}
        </section>
      </main>
    </div>
  );
};
