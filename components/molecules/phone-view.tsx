"use client";
import React, { FC, useEffect } from "react";
import { PillBox } from "./pill-box";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchLinks, fetchUser } from "@/redux/thunk-functions";
export const PhoneView: FC = () => {
  const dispatch = useAppDispatch();
  const { links, isLinksLoading } = useAppSelector((state) => state.links);
  const { user, isAuthLoading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const fetchLinks_ = async () => {
      try {
        const user = await dispatch(fetchUser());
        const id = (user.payload as { id: string })?.id;
        if (id) {
          await dispatch(fetchLinks({ user_id: id }));
        }
      } catch (error) {}
    };
    fetchLinks_();
  }, []);
  useEffect(() => {
    const fetchUser_ = async () => {
      try {
        const data = await dispatch(fetchUser());
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser_();
  }, []);

  return (
    <div className=" absolute w-[calc(100%_-_24px)] h-[calc(100%_-_28px)] overflow-y-scroll no-scrollbar my-7 rounded-[50px] px-6 py-8 flex  items-center mt-7  flex-col gap-14 mx-6">
      <div className="flex flex-col gap-[25px] items-center self-stretch">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="97"
          height="96"
          viewBox="0 0 97 96"
          fill="none"
        >
          <circle cx="48.5" cy="48" r="48" fill="#EEEEEE" />
        </svg>
        <div className="flex flex-col gap-[13px] items-center">
          {/* <div className="bg-[#EEE] rounded-[104px] h-4 w-40"></div> */}
          <h6 className="text-dark-grey text-heading-s !text-lg">Ben Wright</h6>
          {isAuthLoading ? (
            <div className="bg-[#EEE] animate-pulse h-2 w-[72px] rounded-[104px]"></div>
          ) : (
            <p className="text-grey  text-body-m !text-sm">{user?.email}</p>
          )}
        </div>
      </div>
      {/* {isLinksLoading && "Loading...."} */}
      {isLinksLoading ? (
        <div className="flex flex-col gap-5 w-full animate-pulse">
          {new Array(5).fill(0).map((_, i) => (
            <div className="w-full">
              <span
                key={i}
                className=" h-[44px]  bg-[#EEE] flex rounded-lg w-full"
              >
                {" "}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <ul className="flex flex-col gap-5 w-full">
          {links.map((link) => (
            <PillBox key={link.id} title={link.platform} url={link.link} />
          ))}
        </ul>
      )}
    </div>
  );
};
