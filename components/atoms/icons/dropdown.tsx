import { FC } from "react";

export const DropdownIcon: FC<{ dropdown: boolean }> = ({ dropdown }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="9"
      fill="none"
      viewBox="0 0 14 9"
      className={`transform transition-transform duration-300
        ${dropdown ? "rotate-180 text-purple" : "relative rotate-0 text-grey"}`}
    >
      <path stroke="currentColor" strokeWidth="2" d="m1 1 6 6 6-6" />
    </svg>
  );
};
