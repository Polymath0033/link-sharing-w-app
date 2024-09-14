import { FC } from "react";
export const CustomSelectIcon: FC<{ path: string[] }> = ({ path }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      fill="none"
      viewBox="0 0 16 16"
    >
      {path.length === 1 ? (
        <path fill="currentColor" d={path[0]} />
      ) : path.length === 2 ? (
        <>
          <g clipPath="url(#a)">
            <path fill="currentColor" d={path[0]} />
          </g>
          <defs>
            <clipPath id="a">
              <path fill="#fff" d={path[1]} />
            </clipPath>
          </defs>
        </>
      ) : (
        <>
          <g clipPath="url(#a)">
            <path fill="currentColor" d={path[0]} />
            <path
              fill="#fff"
              fillRule="evenodd"
              d={path[1]}
              clipRule="evenodd"
            />
            <path fill="#fff" d={path[2]} />
          </g>
          <defs></defs>
          <clipPath id="a">
            <path fill="#fff" d={path[3]} />
          </clipPath>
        </>
      )}
    </svg>
  );
};
