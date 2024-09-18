import { FC, FormEvent } from "react";

export const AppButton: FC<{
  type?: "button" | "reset" | "submit";
  value: string;
  disabled?: boolean;
  onClick?: () => void;
  onSubmit?: (e: FormEvent) => void;
  className?: string;
  loading?: boolean;
}> = ({
  type = "button",
  value,
  disabled = false,
  onClick,
  className,
  onSubmit,
  loading,
}) => {
  return (
    <button
      type={type}
      onClick={onClick || onSubmit}
      className={`flex gap-2  justify-center items-center py-[11px] text-heading-s text-white px-[27px]  w-full rounded-lg bg-purple hover:bg-purple-hover hover:shadow-active-selection disabled:opacity-25 disabled:cursor-not-allowed ${className}`}
      disabled={disabled}
    >
      {value}
      {loading && (
        <div className="w-5 h-5 border-t-2 border-l-2 border-white rounded-full animate-spin"></div>
      )}
    </button>
  );
};
