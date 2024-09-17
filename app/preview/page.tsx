import { FC } from "react";
import { AppButton } from "@/components/atoms/buttons/app-button";
import { OutlinedButton } from "@/components/atoms/buttons/outline-button";
const PreviewPage: FC = () => {
  return (
    <div className="relative bg-white sm:bg-inherit h-screen sm:h-full">
      <div className="bg-purple hidden sm:block absolute top-0 left-0 w-full rounded-br-[32px] rounded-bl-[32px] h-[357px] "></div>
      <header className=" h-16 sm:bg-white flex justify-between relative top-4 left-0 w-full sm:top-6 sm:left-6 sm:w-[calc(100%_-_48px)] items-center py-0 sm:p-4 px-6 sm:pl-6 sm:rounded-xl">
        <OutlinedButton value="Back to Editor" />
        <AppButton value="Share link" className="!w-fit" />
      </header>
      <section className="sm:shadow-box-shadow flex gap-2 py-12 px-14 bg-white relative mx-auto rounded-3xl mt-[106px] h-fit z-10 w-[349px] sm:mb-16">
        <div className="flex flex-col gap-14 items-start [flex:1_0_0] ">
          <div className="flex gap-[25px] flex-col items-center self-stretch">
            <div className="w-[104px] h-[104px] rounded-[104px] border-4 border-purple "></div>
            <div className="flex flex-col gap-2  items-center">
              <h2 className="text-dark-grey text-heading-m text-center">
                Ben Wright
              </h2>
              <p className="text-grey text-body-m">ben@example.com</p>
            </div>
          </div>
          <ul className="flex flex-col gap-5 self-stretch items-start">
            <li className="flex p-4 gap-2 rounded-lg bg-[#1A1A1A] items-center text-white self-stretch">
              Github
            </li>
            <li className="flex p-4 gap-2 rounded-lg bg-[#1A1A1A] items-center text-white self-stretch">
              Github
            </li>
            <li className="flex p-4 gap-2 rounded-lg bg-[#1A1A1A] items-center text-white self-stretch">
              Github
            </li>
            <li className="flex p-4 gap-2 rounded-lg bg-[#1A1A1A] items-center text-white self-stretch">
              Github
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};
export default PreviewPage;
