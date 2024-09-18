import React from "react";
import Image from "next/image";
import Link from "next/link";
export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="w-full h-full relative bg-white sm:bg-inherit  flex flex-col px-8 sm:px-0 py-8 sm:!py-12 sm:justify-center items-center">
      <Link
        href={"/"}
        className="flex gap-1 items-center justify-start self-stretch sm:self-center mb-16 sm:mb-[51px]"
      >
        <Image
          src="/images/logo-devlinks-large.svg"
          alt="DevLinks"
          width={100}
          height={40}
          className="w-auto h-8 sm:h-10 cursor-pointer"
        />
      </Link>
      {children}
    </main>
  );
}
