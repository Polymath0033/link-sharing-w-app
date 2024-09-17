import React, { FC } from "react";
import { AppHeader } from "@/components/molecules/header";
import { FrameOne } from "../atoms/frames/frame-one";
import { FrameTwo } from "../atoms/frames/frame-two";
export const HomeWrapper: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="sm:p-6 flex flex-col">
      <AppHeader />
      <main className="flex [flex:1_0_0] mt-6 gap-6 self-stretch items-start h-[calc(100vh_+_200px)]">
        <section className="bg-white p-6 hidden md:flex gap-2 justify-center items-center self-stretch h-full w-2/5 max-w-[560px] rounded-xl ">
          {/* */}
          <div className="relative  border  w-[307px] h-[631px]  flex items-center justify-center flex-col">
            <FrameOne />
            <FrameTwo />

            <div className=" absolute w-[calc(100%_-_24px)] h-[calc(100%_-_28px)] overflow-y-scroll no-scrollbar my-7 rounded-[50px] px-2 py-4 bg-red flex justify-center items-center mt-7 border  flex-col mx-6"></div>
          </div>
          {/* <div className="bg-illustration bg-contain h-[450px]"></div> */}
        </section>
        <section className="flex flex-col items-start [flex:1_0_0] gap-10 bg-white h-full pt-10 pb-6 rounded-xl overflow-y-scroll overflow-x-hidden scrollbar">
          {children}
        </section>
      </main>
    </div>
  );
};
