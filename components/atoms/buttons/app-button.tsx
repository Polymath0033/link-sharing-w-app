import { FC } from "react";

export const AppButton: FC<{
  type?: "button" | "reset" | "submit";
  value: string;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}> = ({ type = "button", value, disabled = false, onClick, className }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`flex gap-2  justify-center items-center py-[11px] text-heading-s text-white px-[27px]  w-full rounded-lg bg-purple hover:bg-purple-hover hover:shadow-active-selection disabled:opacity-25 disabled:cursor-not-allowed ${className}`}
      disabled={disabled}
    >
      {value}
    </button>
  );
};
