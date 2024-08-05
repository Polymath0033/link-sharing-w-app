import { FC } from "react";
export const OutlineButton: FC<{
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
      disabled={disabled}
      className={`flex gap-2  justify-center items-center py-[11px] text-heading-s text-white px-[27px] max-w-[227px] w-full rounded-lg border border-purple hover:bg-purple-hover  disabled:opacity-25 disabled:cursor-not-allowed ${className}`}
    >
      {value}
    </button>
  );
};
