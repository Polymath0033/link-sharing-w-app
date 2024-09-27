// import { FC } from "react";
// import Link from "next/link";
// import { selectIcons } from "@/utils/icon";
// import { CustomSelectIcon } from "./custom-svg";

// export const PillBox: FC<{ title: string; url: string }> = ({ title, url }) => {
//   const selected = selectIcons.find(
//     (icon) =>
//       icon.name.toLocaleLowerCase().replace(" ", "") ===
//       title.toLocaleLowerCase().replace(" ", "")
//   );
//

//   const bg = selected?.color;
//   const path = selected?.path;
//   return (
//     <li className="w-full">
//       {url ? (
//         <Link
//           href={url}
//           style={{ backgroundColor: bg }}
//           className={`flex items-center gap-2 rounded-lg px-4 py-[11px] h-[44px] self-stretch text-white w-full ${
//             isFrontendMentor && "border border-borders "
//           }`}
//           target="_blank"
//         >
//           {path && <CustomSelectIcon path={path} />}
//           <span
//             className={`[flex:1_0_0] text-white text-body-s ${
//               isFrontendMentor ? "!text-dark-grey" : ""
//             }`}
//           >
//             {title}
//           </span>

//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="16"
//             height="16"
//             viewBox="0 0 16 16"
//             fill="none"
//           >
//             <path
//               d="M2.66666 7.3333V8.66664H10.6667L6.99999 12.3333L7.94666 13.28L13.2267 7.99997L7.94666 2.71997L6.99999 3.66664L10.6667 7.3333H2.66666Z"
//               fill={isFrontendMentor ? "#333" : "#fff"}
//             />
//           </svg>
//         </Link>
//       ) : (
//         <span className="h-[44px] bg-[#EEE] flex rounded-lg w-full"> </span>
//       )}
//     </li>
//   );
// };
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
  const isFrontendMentor = title === "Frontend Mentor";
  const bg = selected?.color;
  const path = selected?.path;
  return (
    <li className="w-full">
      {url ? (
        <Link
          href={url}
          style={{ backgroundColor: bg }}
          className={`flex items-center gap-2 rounded-lg px-4 py-4 self-stretch text-white  w-full ${
            isFrontendMentor && "border border-borders"
          }`}
          target="_blank"
        >
          {path && (
            <>
              {isFrontendMentor ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="23"
                  height="20"
                  viewBox="0 0 23 20"
                  fill="none"
                >
                  <path
                    d="M21.6905 10.4854C21.5943 10.4854 21.4992 10.4653 21.4112 10.4262L15.5545 7.80353C15.4344 7.74955 15.3325 7.66202 15.2609 7.55146C15.1894 7.44091 15.1514 7.31204 15.1514 7.18037C15.1514 7.0487 15.1894 6.91983 15.2609 6.80928C15.3325 6.69872 15.4344 6.61119 15.5545 6.55722L21.4112 3.9436C21.5766 3.87021 21.7642 3.86529 21.9332 3.9299C22.1021 3.99451 22.2386 4.12341 22.3128 4.28839C22.3861 4.45382 22.3909 4.64158 22.3261 4.81054C22.2613 4.97951 22.1322 5.11592 21.9671 5.18991L17.5049 7.18128L21.968 9.17992C22.1107 9.24355 22.2273 9.35424 22.2982 9.49348C22.3691 9.63272 22.39 9.79208 22.3575 9.94493C22.325 10.0978 22.2411 10.2348 22.1197 10.3332C21.9983 10.4316 21.8468 10.4853 21.6905 10.4854Z"
                    fill="#67BECE"
                  />
                  <path
                    d="M13.7087 20C7.26973 20 1.64041 15.6534 0.0220298 9.42916C-0.0235705 9.25412 0.00223218 9.06813 0.0937616 8.91211C0.185291 8.75609 0.33505 8.64283 0.510092 8.59723C0.685134 8.55162 0.871122 8.57743 1.02714 8.66896C1.18316 8.76049 1.29643 8.91024 1.34203 9.08529C2.05596 11.8212 3.65733 14.243 5.89524 15.9712C8.13315 17.6995 10.8811 18.6365 13.7087 18.6355C13.8896 18.6355 14.0632 18.7074 14.1911 18.8353C14.3191 18.9633 14.391 19.1368 14.391 19.3178C14.391 19.4987 14.3191 19.6723 14.1911 19.8002C14.0632 19.9282 13.8896 20 13.7087 20Z"
                    fill="#3F54A3"
                  />
                  <path
                    d="M11.3581 14.3344C11.1771 14.3344 11.0036 14.2625 10.8756 14.1345C10.7477 14.0066 10.6758 13.833 10.6758 13.6521V0.682286C10.6758 0.501333 10.7477 0.32779 10.8756 0.199837C11.0036 0.0718835 11.1771 0 11.3581 0C11.539 0 11.7126 0.0718835 11.8405 0.199837C11.9685 0.32779 12.0404 0.501333 12.0404 0.682286V13.6521C12.0404 13.833 11.9685 14.0066 11.8405 14.1345C11.7126 14.2625 11.539 14.3344 11.3581 14.3344Z"
                    fill="#67BECE"
                  />
                </svg>
              ) : (
                <CustomSelectIcon path={path} />
              )}
            </>
          )}
          <span
            className={`[flex:1_0_0] text-white text-body-m ${
              isFrontendMentor && "!text-dark-grey"
            } `}
          >
            {title}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M2.66666 7.3333V8.66664H10.6667L6.99999 12.3333L7.94666 13.28L13.2267 7.99997L7.94666 2.71997L6.99999 3.66664L10.6667 7.3333H2.66666Z"
              fill={`${isFrontendMentor ? "#737373" : "#fff"}`}
            />
          </svg>
        </Link>
      ) : (
        <span className=" h-[44px] bg-[#EEE] flex rounded-lg w-full"> </span>
      )}
    </li>
  );
};
