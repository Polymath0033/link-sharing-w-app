"use client";

import { FC, useState, useEffect } from "react";

export const ProgressBar: FC = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((oldProgress) =>
        oldProgress === 100 ? 0 : oldProgress + 10
      );
    }, 600);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div className="fixed top-0 left-0 w-full h-[3px] bg-transparent   text-red text-lg">
      <div
        className="h-full bg-red transition-[width] ease-in-out duration-[0.5s]"
        style={{ width: `${progress}%` }}
      ></div>
      <div className="flex items-center absolute top-full right-0 w-full p-10">
        <div className="w-5 h-5 rounded-[50%] border-2 border-t-transparent animate-spin mr-3"></div>
      </div>
    </div>
  );
};
