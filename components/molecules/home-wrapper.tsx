import React, { FC } from "react";
import { AppHeader } from "@/components/molecules/header";
import { FrameOne } from "../atoms/frames/frame-one";
import { FrameTwo } from "../atoms/frames/frame-two";
import { PillBox } from "./pill-box";
export const HomeWrapper: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="sm:p-6 flex flex-col">
      <AppHeader />
      <main className="flex [flex:1_0_0] mt-6 gap-6 self-stretch items-start h-screen md:h-[calc(100vh_+_200px)] p-4 sm:p-0">
        <section className="bg-white p-6 hidden md:flex gap-2 justify-center items-center self-stretch h-full w-2/5 max-w-[560px] rounded-xl ">
          {/* */}
          <div className="relative w-[307px] h-[631px]  flex items-center justify-center flex-col">
            <FrameOne />
            <FrameTwo />

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
                  <div className="bg-[#EEE] rounded-[104px] h-4 w-40"></div>
                  <div className="bg-[#EEE] h-2 w-[72px] rounded-[104px] "></div>
                </div>
              </div>

              <ul className="flex flex-col gap-5 w-full">
                <PillBox title="Github" url="https://x.com/Olosanyusuf" />
                <PillBox title="Twitter" url="https://x.com/Olosanyusuf" />
                <PillBox title="Linked in" url="https://x.com/Olosanyusuf" />
                <PillBox title="code wars" url="https://x.com/Olosanyusuf" />
                <PillBox title="" url="" />
              </ul>
            </div>
          </div>
          {/* <div className="bg-illustration bg-contain h-[450px]"></div> */}
        </section>
        <section className="flex flex-col relative items-start [flex:1_0_0] gap-10 bg-white h-full pt-10 pb-6 rounded-xl overflow-y-scroll no-scrollbar overflow-x-hidden md:scrollbar">
          {children}
        </section>
      </main>
    </div>
  );
};
