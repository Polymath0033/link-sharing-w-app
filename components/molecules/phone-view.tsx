"use client";
import React, { FC, useEffect } from "react";
import { PillBox } from "./pill-box";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchLinks } from "@/redux/thunk-functions";
import Image from "next/image";
import { UserData } from "@/types/user-data";
import { Links } from "@/types/redux";
import { LinkPlaceholder } from "./link-placeholder";
export const PhoneView: FC<{
  id: string | undefined;
  user: UserData;
  isFetching: boolean;
  email: string | undefined;
  links: Links;
  isLinksLoading: boolean;
}> = ({ user, isFetching, email, links, isLinksLoading }) => {
  const firstNameLastName =
    user[0]?.first_name === undefined && user[0]?.last_name === undefined;
  const emailExist = user[0]?.email === "undefined" && email === "undefined";
  const linksLength = links.length;
  useEffect(() => {
    console.log(links);
  }, [links]);
  return (
    <div className=" absolute w-[calc(100%_-_24px)] h-[calc(100%_-_28px)] overflow-y-scroll no-scrollbar my-7 rounded-[50px] px-6 py-8 flex  items-center mt-7  flex-col gap-14 mx-6">
      <div
        className={`flex flex-col gap-[25px] items-center self-stretch ${
          isFetching && "animate-pulse"
        }`}
      >
        {isFetching ? (
          <div className="bg-[#EEE] h-24 w-24 rounded-[96px]"></div>
        ) : user[0]?.image_url.length > 0 ? (
          <Image
            src={user[0]?.image_url}
            alt={user[0]?.first_name}
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
        <div
          className={`flex flex-col ${
            isFetching ? "gap-[13px]" : "gap-2"
          } items-center`}
        >
          {isFetching && (
            <div className="bg-[#EEE] rounded-[104px] h-4 w-40"></div>
          )}
          {isFetching === false && (
            <>
              {firstNameLastName && (
                <div className="bg-[#EEE] rounded-[104px] h-4 w-40"></div>
              )}
              <h6 className="text-dark-grey text-heading-s !text-lg">
                {user && user[0]?.first_name + " " + user[0]?.last_name}
              </h6>
            </>
          )}

          {isFetching ? (
            <div className="bg-[#EEE] animate-pulse h-2 w-[72px] rounded-[104px]"></div>
          ) : (
            <>
              {emailExist && (
                <div className="bg-[#EEE]  h-2 w-[72px] rounded-[104px]"></div>
              )}
              <p className="text-grey  text-body-m !text-sm">
                {user[0]?.email !== "undefined" ? email : user[0]?.email}
              </p>
            </>
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
        <>
          <ul className="flex flex-col gap-5 w-full h-full overflow-y-scroll no-scrollbar ">
            {links.map((link) => (
              <PillBox key={link.id} title={link.platform} url={link.link} />
            ))}
            {linksLength < 5 && <LinkPlaceholder length={5 - linksLength} />}
          </ul>
        </>
      )}
    </div>
  );
};
