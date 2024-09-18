import { FC } from "react";
import Link from "next/link";
import { selectIcons } from "@/utils/icon";
import { CustomSelectIcon } from "./custom-svg";
export const PillBox: FC<{ title: string; url: string }> = ({ title, url }) => {
  const selected = selectIcons.find(
    (icon) =>
      icon.name.toLocaleLowerCase().replace(" ", "") ===
      title.toLocaleLowerCase().replace(" ", "")
  );
  const bg = selected?.color;
  const path = selected?.path;
  return (
    <li className="w-full">
      {url ? (
        <Link
          href={url}
          style={{ backgroundColor: bg }}
          className={`flex items-center gap-2 rounded-lg px-4 py-[11px] h-[44px] self-stretch text-white  w-full`}
          target="_blank"
        >
          {path && <CustomSelectIcon path={path} />}
          <span className="[flex:1_0_0] text-white text-body-s">{title}</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M2.66666 7.3333V8.66664H10.6667L6.99999 12.3333L7.94666 13.28L13.2267 7.99997L7.94666 2.71997L6.99999 3.66664L10.6667 7.3333H2.66666Z"
              fill="white"
            />
          </svg>
        </Link>
      ) : (
        <span className=" h-[44px] bg-[#EEE] flex rounded-lg w-full"> </span>
      )}
    </li>
  );
};
