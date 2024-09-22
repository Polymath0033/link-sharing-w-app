"use client";
import React, { FC, useEffect } from "react";
import { PillBox } from "./pill-box";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  fetchLinks,
  fetchUser,
  fetchUsersDetails,
} from "@/redux/thunk-functions";
import Image from "next/image";
export const PhoneView: FC = () => {
  const dispatch = useAppDispatch();
  const { links, isLinksLoading } = useAppSelector((state) => state.links);
  const { user, isAuthLoading } = useAppSelector((state) => state.auth);
  const userDetails = useAppSelector((state) => state.user);

  useEffect(() => {
    const fetchLinks_ = async () => {
      try {
        // const user = await dispatch(fetchUser());
        //const id = (user.payload as { id: string })?.id;
        if (user?.id) {
          await dispatch(fetchLinks({ user_id: user.id }));
          await dispatch(fetchUsersDetails(user.id));
        }
      } catch (error) {}
    };
    fetchLinks_();
  }, [dispatch, user?.id]);
  // useEffect(() => {
  //   const fetchUser_ = async () => {
  //     try {
  //       await dispatch(fetchUser());
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchUser_();
  // }, [dispatch]);
  return (
    <div className=" absolute w-[calc(100%_-_24px)] h-[calc(100%_-_28px)] overflow-y-scroll no-scrollbar my-7 rounded-[50px] px-6 py-8 flex  items-center mt-7  flex-col gap-14 mx-6">
      <div
        className={`flex flex-col gap-[25px] items-center self-stretch ${
          userDetails.isFetching && "animate-pulse"
        }`}
      >
        {userDetails.isFetching ? (
          <div className="bg-[#EEE] h-24 w-24 rounded-[96px]"></div>
        ) : userDetails.user[0]?.image_url.length > 0 ? (
          <Image
            src={userDetails.user[0]?.image_url}
            alt={userDetails.user[0]?.first_name}
            width={96}
            height={96}
            className="rounded-[96px] h-24 w-24 border-4 border-purple"
          />
        ) : (
          //generate svg for user image
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="97"
            height="96"
            viewBox="0 0 97 96"
            fill="none"
          >
            <circle cx="48.5" cy="48" r="48" fill="#EEEEEE" />
          </svg>
        )}
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          width="97"
          height="96"
          viewBox="0 0 97 96"
          fill="none"
        >
          <circle cx="48.5" cy="48" r="48" fill="#EEEEEE" />
        </svg> */}
        <div
          className={`flex flex-col ${
            userDetails.isFetching ? "gap-[13px]" : "gap-2"
          } items-center`}
        >
          {userDetails.isFetching && (
            <div className="bg-[#EEE] rounded-[104px] h-4 w-40"></div>
          )}
          {userDetails.isFetching === false && (
            <h6 className="text-dark-grey text-heading-s !text-lg">
              {userDetails.user[0]?.first_name +
                " " +
                userDetails.user[0]?.last_name}
            </h6>
          )}
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
            <div className="w-full" key={i}>
              <span className=" h-[44px]  bg-[#EEE] flex rounded-lg w-full">
                {" "}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <ul className="flex flex-col gap-5 w-full h-full overflow-y-scroll no-scrollbar ">
          {links.map((link) => (
            <PillBox key={link.id} title={link.platform} url={link.link} />
          ))}
        </ul>
      )}
    </div>
  );
};
