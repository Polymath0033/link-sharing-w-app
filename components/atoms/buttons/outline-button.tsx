import { FC } from "react";
export const OutlinedButton: FC<{
  type?: "button" | "reset" | "submit";
  value: string;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
  spanClassName?: string;
}> = ({
  type = "button",
  value,
  disabled = false,
  onClick,
  className,
  children,
  spanClassName,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`flex gap-2  justify-center items-center py-[11px] text-heading-s text-purple bg-white px-4 sm:px-[27px] w-fit rounded-lg border border-purple hover:bg-light-purple  disabled:opacity-25 disabled:cursor-not-allowed ${className}`}
    >
      {children}
      <span className={spanClassName}>{value}</span>
    </button>
  );
};
