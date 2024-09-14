import { FC } from "react";

export const AppTab: FC<{
  value: string;
  active: boolean;
  onClick: () => void;
  children?: React.ReactNode;
  spanClassName?: string;
}> = ({ value, active, onClick, children, spanClassName }) => {
  return (
    <button
      role="tab"
      type="button"
      onClick={onClick}
      className={`px-[27px] py-[11px] flex items-center text-heading-s gap-2 rounded-lg   ${
        active
          ? "text-purple bg-light-purple"
          : "!text-grey bg-transparent hover:text-purple hover:bg-transparent"
      }`}
    >
      {children}
      {/* */}
      <span className={spanClassName}>{value}</span>
    </button>
  );
};
