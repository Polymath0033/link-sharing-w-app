import { FC } from "react";
export const LinkPlaceholder: FC<{ length: number }> = ({ length }) => {
  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length }).map((_, index) => (
        <span
          key={index}
          className=" h-[44px] bg-[#EEE] flex rounded-lg w-full"
        >
          {" "}
        </span>
      ))}
    </div>
  );
};
