import Image from "next/image";
import { AppHeader } from "@/components/molecules/header";
import { Fragment } from "react";
export default function Home() {
  return (
    <div className="sm:p-6 flex flex-col border">
      <AppHeader />
      <main className="flex [flex:1_0_0] mt-6 gap-6 self-stretch items-start h-full">
        <section className="bg-white p-6 hidden md:flex gap-2 justify-center items-center  self-stretch h-full w-2/5 max-w-[560px] rounded-xl">
          Hello
        </section>
        <section className="flex flex-col items-start [flex:1_0_0] gap-10 bg-white h-full p-10 rounded-xl">
          Yusuf Olosan
        </section>
      </main>
    </div>
  );
}
