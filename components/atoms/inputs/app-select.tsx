"use client";
import { FC, Fragment, useState } from "react";
import Image from "next/image";
import { DropdownIcon } from "../icons/dropdown";
import { selectIcons } from "@/utils/icon";
import { SelectIcon } from "@/types/select-icon";
import { CustomSelectIcon } from "../../molecules/custom-svg";

export const AppSelect: FC<{
  onSelect: (val: string) => void;
}> = ({ onSelect }) => {
  const [dropdown, setDropdown] = useState(false);
  const [selected, setSelected] = useState<string>("Github"); // Change Selected type to string
  const dropdownHandler = () => {
    console.log("dropdownHandler");
    setDropdown(!dropdown);
  };
  console.log(selectIcons.find(({ name }) => name === selected)?.path);
  console.log(selected.length);
  console.log(selected);

  const selectHandler = (value: string) => {
    console.log("selectHandler");
    setSelected(value);
    onSelect(value);
    setDropdown(false);
  };
  const selectName = selectIcons.find(({ name }) => name === selected)?.name;
  return (
    <>
      <div className="flex flex-col gap-2 justify-center w-full relative z-50">
        <p className="text-dark-grey text-body-s text-start">Platform</p>
        <div
          onClick={dropdownHandler}
          className="flex items-center w-full justify-between py-3 px-4 rounded-lg border border-borders bg-white"
        >
          <div className={`flex gap-3 items-center text-grey`}>
            {selectIcons.find(({ name }) => name === selected)?.path ? (
              <CustomSelectIcon
                path={selectIcons.find(({ name }) => name === selected)?.path!}
              />
            ) : (
              ""
            )}
            <p className="text-dark-grey text-body-m">{selected.toString()}</p>
            {/* <Image
              src={"/images/icon-twitter.svg"}
              alt={name}
              width={16}
              height={16}
              className="w-8 h-8 rounded-lg"
            />
            <h5 className="text-grey text-base font-bold leading-[150%]">
              {name} {dropdown ? "▲" : "▼"}
            </h5> */}
          </div>
          <button type="button" className="text-grey text-body-m">
            <DropdownIcon dropdown={dropdown} />

            {""}
          </button>
        </div>
        {dropdown && (
          <div className="absolute bg-white border shadow-box-shadow border-borders rounded-lg w-full top-20 px-3 py-4 overflow-y-scroll overflow-x-hidden h-[350px] scrollbar">
            <ul className=" flex flex-col gap-3 justify-center items-start">
              {selectIcons.map(({ path, name }, index) => (
                <li
                  onClick={() => selectHandler(name)}
                  key={index}
                  className={`flex items-center gap-3  w-full pb-3 border-b border-borders last-of-type:border-b-0 last-of-type:pb-0  ${
                    selected === name ? "text-purple" : "text-grey"
                  }`}
                >
                  <CustomSelectIcon path={path} />
                  <p
                    className={`${
                      selected === name ? "text-purple" : "text-dark-grey"
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
      <div
        className="fixed top-0 left-0 w-full h-screen overflow-hidden bg-transparent"
        onClick={() => setDropdown(false)}
      ></div>
    </>
  );
};
