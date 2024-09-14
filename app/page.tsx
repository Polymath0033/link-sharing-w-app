import Image from "next/image";
import { AppHeader } from "@/components/molecules/header";
import { Fragment } from "react";
import { FrameOne } from "@/components/atoms/frames/frame-one";
import { FrameTwo } from "@/components/atoms/frames/frame-two";
import { OutlinedButton } from "@/components/atoms/buttons/outline-button";
import { AppButton } from "@/components/atoms/buttons/app-button";
import App from "next/app";
import { Card } from "@/components/molecules/card";
export default function Home() {
  return (
    <div className="sm:p-6 flex flex-col border">
      <AppHeader />
      <main className="flex [flex:1_0_0] mt-6 gap-6 self-stretch items-start h-full">
        <section className="bg-white p-6 hidden md:flex gap-2 justify-center items-center border self-stretch h-full w-2/5 max-w-[560px] rounded-xl">
          {/* */}
          <div className="relative h-full  flex items-center justify-center flex-col">
            <FrameOne />
            <FrameTwo />

            <div className=" absolute w-[calc(100%_-_24px)] h-[calc(100%_-_28px)] overflow-y-scroll no-scrollbar my-7 rounded-[50px] px-2 py-4 bg-red flex justify-center items-center mt-7 border  flex-col mx-6"></div>
          </div>
          {/* <div className="bg-illustration bg-contain h-[450px]"></div> */}
        </section>
        <section className="flex flex-col items-start [flex:1_0_0] gap-10 bg-white h-full pt-10 pb-6 rounded-xl">
          <div className="px-10">
            <h1 className="text-heading-m text-dark-grey ">
              Customize your links
            </h1>
            <p className="text-grey text-body-m">
              Add/edit/remove links below and then share all your profiles with
              the world!
            </p>
          </div>
          <div className="w-full px-10">
            <Card />
          </div>
          {/* <div className="flex flex-col self-stretch items-start flex-1 w-full gap-6 px-10">
            <OutlinedButton value="+ Add new link" className="w-full" />
            <div className="flex flex-col justify-center items-center p-5 gap-10 rounded-xl bg-light-grey h-full flex-1 w-full">
              <Image
                src="/images/illustration-empty.svg"
                alt="Illustration empty state"
                width={249}
                height={160}
              />
              <div className="flex flex-col gap-3 items-center">
                <h3 className="text-heading-m text-dark-grey">
                  Let’s get you started
                </h3>
                <p className="text-center text-grey text-body-m">
                  Use the “Add new link” button to get started. Once you have
                  more than one link, you can reorder and edit them. We’re here
                  to help you share your profiles with everyone!
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-end self-stretch items-start  ">
           
            <div className="bg-borders h-[1px] w-full"></div>
            <div className="px-10 py-3 flex flex-col self-end items-stretch">
              <AppButton value="Save" disabled={true} />
            </div>
          </div> */}
        </section>
      </main>
    </div>
  );
}
