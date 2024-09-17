"use client";
import { FC, Fragment, useState } from "react";
import Image from "next/image";
import { DropdownIcon } from "../icons/dropdown";
import { selectIcons } from "@/utils/icon";
import { SelectIcon } from "@/types/select-icon";
import { CustomSelectIcon } from "../../molecules/custom-svg";

export const AppSelect: FC<{
  onSelect: (val: string) => void;
  platform: string;
  dropdown: boolean;
  dropdownHandler: () => void;
  closeDropdown: () => void;
}> = ({
  onSelect,
  platform = "Github",
  dropdown,
  dropdownHandler,
  closeDropdown,
}) => {
  return (
    <>
      <div className="flex flex-col gap-2 justify-center w-full relative">
        <p className="text-dark-grey text-body-s text-start">Platform</p>
        <div
          onClick={dropdownHandler}
          className="flex items-center w-full justify-between py-3 px-4 rounded-lg border border-borders bg-white"
        >
          <div className={`flex gap-3 items-center text-grey`}>
            {platform.length < 1 ? (
              <CustomSelectIcon
                path={selectIcons.find(({ name }) => name === "Github")?.path!}
              />
            ) : selectIcons.find(({ name }) => name === platform)?.path ? (
              <CustomSelectIcon
                path={selectIcons.find(({ name }) => name === platform)?.path!}
              />
            ) : (
              ""
            )}
            <p className="text-dark-grey text-body-m">
              {platform.length < 1 ? "Github" : platform}
            </p>
          </div>
          <button type="button" className="text-grey text-body-m">
            <DropdownIcon dropdown={dropdown} />

            {""}
          </button>
        </div>
        {dropdown && (
          <div className="absolute bg-white border shadow-box-shadow border-borders rounded-lg w-full top-20 px-3 py-4 overflow-y-scroll overflow-x-hidden h-[350px] scrollbar z-50">
            <ul className=" flex flex-col gap-3 justify-center items-start">
              {selectIcons.map(({ path, name }, index) => (
                <li
                  onClick={() => {
                    onSelect(name);
                    closeDropdown();
                  }}
                  key={index}
                  className={`flex items-center gap-3  w-full pb-3 border-b border-borders last-of-type:border-b-0 last-of-type:pb-0  ${
                    platform === name ? "text-purple" : "text-grey"
                  }`}
                >
                  <CustomSelectIcon path={path} />
                  <p
                    className={`${
                      platform === name ? "text-purple" : "text-dark-grey"
                    } text-body-m`}
                  >
                    {name}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {/* <div
        className="fixed top-0 left-0 w-full h-screen overflow-hidden bg-transparent"
        onClick={closeDropdown}
      ></div> */}
    </>
  );
};
