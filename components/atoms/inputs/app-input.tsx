import { FC, HTMLInputTypeAttribute } from "react";

export const AppInput: FC<{
  title?: string;
  id: string;
  type?: HTMLInputTypeAttribute;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  hasIcon?: boolean;
  children?: React.ReactNode;
  hasError?: boolean;
  errorValue?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
  className?: string;
}> = ({
  title,
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  hasIcon = false,
  children,
  hasError = false,
  errorValue,
  onBlur,
  className,
}) => {
  return (
    <label htmlFor={id} className={`w-full ${className}`}>
      {title && (
        <span className="text-body-s text-dark-grey  mb-[6px] block">
          {title}
        </span>
      )}
      <div className="relative w-full ">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e)}
          id={id}
          name={id}
          onBlur={(e) => onBlur && onBlur(e)}
          required={required}
          className={`px-4 z-10 py-3 w-full bg-white outline-none border border-borders rounded-lg text-body-m text-dark-grey placeholder:opacity-50  focus:border-purple  focus:shadow-active-selection focus:ring-1 focus:ring-purple transition-all duration-200 ease-in-out
 ${hasIcon && "pl-12"} ${hasError && "border-red ring-1 ring-red pr-32 "}
         `}
        />
        {hasIcon && (
          <div className="w-4 h-4 ml-4 absolute top-1/2 -translate-y-1/2  z-20 ">
            {children}
          </div>
        )}
        {hasError && (
          <span className="text-body-s text-red right-4 absolute top-1/2 -translate-y-1/2  z-20 ">
            {errorValue}
          </span>
        )}
      </div>
    </label>
  );
};
