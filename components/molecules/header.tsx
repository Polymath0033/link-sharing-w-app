"use client";
import Link from "next/link";
import { FC, useState } from "react";
import Image from "next/image";
import { AppTab } from "../atoms/buttons/app-tab";
import { OutlinedButton } from "../atoms/buttons/outline-button";
import { usePathname } from "next/navigation";

export const AppHeader: FC<{}> = ({}) => {
  const [activeTab, setActiveTab] = useState<"links" | "profile">("links");
  const pathname = usePathname();
  return (
    <header className="w-full h-16 bg-white flex justify-between items-center p-4 pl-6 rounded-xl">
      <Link href="/">
        <Image
          src="/images/logo-devlinks-large.svg"
          alt="DevLinks"
          width={100}
          height={40}
          className="hidden sm:block cursor-pointer"
        />
        <Image
          src="/images/logo-devlinks-small.svg"
          alt="DevLinks"
          width={32}
          height={32}
          className="block sm:hidden h-8 w-8  cursor-pointer"
        />
      </Link>
      <div role="tablist" className="flex items-center" aria-label="Tab List">
        <div role="tab">
          <Link
            href={"/"}
            role="tab"
            className={`px-[27px] py-[11px] flex items-center text-heading-s gap-2 rounded-lg   ${
              pathname === "/"
                ? "text-purple bg-light-purple"
                : "!text-grey bg-transparent hover:text-purple hover:bg-transparent"
            }`}
          >
            <span className="hidden sm:block">Links</span>

            <i>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="20"
                viewBox="0 0 21 20"
                fill="none"
              >
                <path
                  d="M11.1542 14.6509C11.2416 14.738 11.311 14.8415 11.3583 14.9554C11.4056 15.0694 11.43 15.1916 11.43 15.3149C11.43 15.4383 11.4056 15.5605 11.3583 15.6745C11.311 15.7884 11.2416 15.8919 11.1542 15.979L10.6902 16.4431C9.81081 17.3224 8.61815 17.8164 7.37455 17.8164C6.13095 17.8164 4.93828 17.3224 4.05892 16.4431C3.17957 15.5637 2.68555 14.371 2.68555 13.1274C2.68555 11.8838 3.17957 10.6912 4.05892 9.81181L5.9433 7.92822C6.78821 7.08122 7.925 6.58933 9.12082 6.55331C10.3166 6.51729 11.481 6.93986 12.3753 7.73447C12.4677 7.81655 12.5429 7.91601 12.5968 8.02717C12.6507 8.13833 12.6822 8.25902 12.6895 8.38235C12.6967 8.50568 12.6796 8.62923 12.6391 8.74595C12.5986 8.86266 12.5355 8.97026 12.4535 9.06259C12.3714 9.15493 12.2719 9.2302 12.1608 9.28409C12.0496 9.33799 11.9289 9.36947 11.8056 9.37672C11.6822 9.38398 11.5587 9.36687 11.442 9.32638C11.3253 9.28588 11.2177 9.2228 11.1253 9.14072C10.589 8.66441 9.89098 8.41102 9.17401 8.43237C8.45704 8.45371 7.77532 8.74819 7.2683 9.25556L5.38549 11.1368C4.85795 11.6643 4.56159 12.3798 4.56159 13.1259C4.56159 13.8719 4.85795 14.5874 5.38549 15.1149C5.91302 15.6425 6.62851 15.9388 7.37455 15.9388C8.12059 15.9388 8.83608 15.6425 9.36361 15.1149L9.82767 14.6509C9.91474 14.5637 10.0181 14.4946 10.1319 14.4474C10.2458 14.4002 10.3678 14.3759 10.491 14.3759C10.6142 14.3759 10.7362 14.4002 10.85 14.4474C10.9638 14.4946 11.0672 14.5637 11.1542 14.6509ZM16.9417 3.55713C16.0617 2.67912 14.8693 2.18604 13.6261 2.18604C12.383 2.18604 11.1906 2.67912 10.3105 3.55713L9.84642 4.02119C9.6703 4.19731 9.57136 4.43618 9.57136 4.68525C9.57136 4.93432 9.6703 5.17319 9.84642 5.34931C10.0225 5.52543 10.2614 5.62438 10.5105 5.62438C10.7596 5.62438 10.9984 5.52543 11.1745 5.34931L11.6386 4.88525C12.1661 4.35772 12.8816 4.06135 13.6277 4.06135C14.3737 4.06135 15.0892 4.35772 15.6167 4.88525C16.1443 5.41278 16.4406 6.12827 16.4406 6.87431C16.4406 7.62036 16.1443 8.33584 15.6167 8.86338L13.7331 10.7478C13.2257 11.2549 12.5436 11.549 11.8264 11.5697C11.1093 11.5905 10.4113 11.3364 9.87533 10.8595C9.78299 10.7774 9.6754 10.7143 9.55868 10.6738C9.44196 10.6333 9.31841 10.6162 9.19509 10.6235C9.07176 10.6307 8.95107 10.6622 8.8399 10.7161C8.72874 10.77 8.62928 10.8453 8.5472 10.9376C8.46513 11.0299 8.40204 11.1375 8.36155 11.2542C8.32106 11.371 8.30395 11.4945 8.3112 11.6178C8.31846 11.7412 8.34993 11.8619 8.40383 11.973C8.45773 12.0842 8.53299 12.1836 8.62533 12.2657C9.51906 13.0601 10.6826 13.483 11.8779 13.4477C13.0731 13.4124 14.2097 12.9217 15.055 12.0759L16.9394 10.1923C17.8184 9.31242 18.3124 8.1197 18.3128 6.87597C18.3133 5.63224 17.8201 4.43917 16.9417 3.55869V3.55713Z"
                  fill="currentColor"
                />
              </svg>
            </i>
          </Link>
        </div>
        <div role="tab">
          <Link
            href={"/profile-details"}
            role="tab"
            className={`px-[27px] py-[11px] flex items-center text-heading-s gap-2 rounded-lg   ${
              pathname === "/profile-details"
                ? "text-purple bg-light-purple"
                : "!text-grey bg-transparent hover:text-purple hover:bg-transparent"
            }`}
          >
            <span className="hidden sm:block"> Profile Details</span>

            <i>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="20"
                viewBox="0 0 21 20"
                fill="none"
              >
                <path
                  d="M10.5 1.5625C8.83122 1.5625 7.19992 2.05735 5.81238 2.98448C4.42484 3.9116 3.34338 5.22936 2.70477 6.77111C2.06616 8.31286 1.89907 10.0094 2.22463 11.6461C2.55019 13.2828 3.35379 14.7862 4.53379 15.9662C5.7138 17.1462 7.21721 17.9498 8.85393 18.2754C10.4906 18.6009 12.1871 18.4338 13.7289 17.7952C15.2706 17.1566 16.5884 16.0752 17.5155 14.6876C18.4427 13.3001 18.9375 11.6688 18.9375 10C18.935 7.763 18.0453 5.61833 16.4635 4.03653C14.8817 2.45473 12.737 1.56498 10.5 1.5625ZM6.71641 15.357C7.15163 14.7619 7.72107 14.2779 8.37849 13.9442C9.0359 13.6106 9.76276 13.4367 10.5 13.4367C11.2373 13.4367 11.9641 13.6106 12.6215 13.9442C13.2789 14.2779 13.8484 14.7619 14.2836 15.357C13.1778 16.1412 11.8556 16.5625 10.5 16.5625C9.14436 16.5625 7.82221 16.1412 6.71641 15.357ZM8.3125 9.375C8.3125 8.94235 8.4408 8.51942 8.68116 8.15969C8.92153 7.79996 9.26317 7.51958 9.66288 7.35401C10.0626 7.18845 10.5024 7.14513 10.9268 7.22953C11.3511 7.31394 11.7409 7.52228 12.0468 7.8282C12.3527 8.13413 12.5611 8.52391 12.6455 8.94824C12.7299 9.37257 12.6866 9.81241 12.521 10.2121C12.3554 10.6118 12.075 10.9535 11.7153 11.1938C11.3556 11.4342 10.9327 11.5625 10.5 11.5625C9.91984 11.5625 9.36344 11.332 8.95321 10.9218C8.54297 10.5116 8.3125 9.95516 8.3125 9.375ZM15.6563 14.0578C15.0486 13.2849 14.2741 12.6595 13.3906 12.2281C13.9537 11.658 14.3355 10.934 14.4881 10.1474C14.6408 9.36074 14.5573 8.54653 14.2484 7.80718C13.9394 7.06783 13.4187 6.43637 12.7517 5.99223C12.0847 5.5481 11.3013 5.31112 10.5 5.31112C9.69869 5.31112 8.91528 5.5481 8.24831 5.99223C7.58135 6.43637 7.06062 7.06783 6.75165 7.80718C6.44267 8.54653 6.35925 9.36074 6.51187 10.1474C6.66449 10.934 7.04634 11.658 7.60938 12.2281C6.72592 12.6595 5.9514 13.2849 5.34375 14.0578C4.58051 13.0903 4.10512 11.9274 3.972 10.7022C3.83888 9.47711 4.05341 8.23925 4.59104 7.13037C5.12867 6.02148 5.96767 5.08639 7.01199 4.43212C8.05631 3.77786 9.26375 3.43086 10.4961 3.43086C11.7284 3.43086 12.9359 3.77786 13.9802 4.43212C15.0245 5.08639 15.8635 6.02148 16.4012 7.13037C16.9388 8.23925 17.1533 9.47711 17.0202 10.7022C16.8871 11.9274 16.4117 13.0903 15.6484 14.0578H15.6563Z"
                  fill="currentColor"
                />
              </svg>
            </i>
          </Link>
        </div>
      </div>
      <Link href={"/preview"}>
        <OutlinedButton value={"preview"} spanClassName="hidden sm:block">
          <i className="block sm:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M19.6096 9.61953C19.5807 9.55625 18.8963 8.03672 17.3846 6.525C15.3619 4.50547 12.8127 3.4375 10.0002 3.4375C7.18769 3.4375 4.63847 4.50547 2.61815 6.525C1.10643 8.03672 0.42206 9.55625 0.39081 9.61953C0.337882 9.73953 0.310547 9.86924 0.310547 10.0004C0.310547 10.1315 0.337882 10.2613 0.39081 10.3813C0.419716 10.4453 1.10409 11.9641 2.61659 13.4758C4.63847 15.4953 7.18769 16.5625 10.0002 16.5625C12.8127 16.5625 15.3619 15.4953 17.3814 13.4758C18.8939 11.9641 19.5783 10.4453 19.6072 10.3813C19.6605 10.2614 19.6882 10.1318 19.6887 10.0006C19.6891 9.86949 19.6621 9.73969 19.6096 9.61953ZM16.0111 12.1977C14.3338 13.8492 12.3119 14.6875 10.0002 14.6875C7.68847 14.6875 5.66659 13.8492 3.99159 12.1969C3.33249 11.5447 2.76553 10.8056 2.30643 10C2.76566 9.19474 3.33261 8.45589 3.99159 7.80391C5.66737 6.15078 7.68847 5.3125 10.0002 5.3125C12.3119 5.3125 14.333 6.15078 16.0088 7.80391C16.6678 8.45583 17.2348 9.19469 17.6939 10C17.2348 10.8055 16.6678 11.5447 16.0088 12.1969L16.0111 12.1977ZM10.0002 6.5625C9.32031 6.5625 8.65571 6.76411 8.09041 7.14182C7.52512 7.51954 7.08453 8.0564 6.82435 8.68453C6.56417 9.31265 6.4961 10.0038 6.62874 10.6706C6.76137 11.3374 7.08876 11.9499 7.56951 12.4307C8.05025 12.9114 8.66275 13.2388 9.32956 13.3714C9.99637 13.5041 10.6875 13.436 11.3157 13.1758C11.9438 12.9157 12.4806 12.4751 12.8584 11.9098C13.2361 11.3445 13.4377 10.6799 13.4377 10C13.4367 9.08864 13.0742 8.21489 12.4297 7.57046C11.7853 6.92603 10.9115 6.56353 10.0002 6.5625ZM10.0002 11.5625C9.69115 11.5625 9.38906 11.4709 9.13211 11.2992C8.87515 11.1275 8.67488 10.8835 8.55662 10.5979C8.43836 10.3124 8.40742 9.99827 8.46771 9.69517C8.528 9.39208 8.67681 9.11367 8.89533 8.89515C9.11385 8.67663 9.39226 8.52781 9.69536 8.46752C9.99845 8.40723 10.3126 8.43818 10.5981 8.55644C10.8836 8.6747 11.1277 8.87497 11.2994 9.13192C11.471 9.38887 11.5627 9.69097 11.5627 10C11.5627 10.4144 11.3981 10.8118 11.105 11.1049C10.812 11.3979 10.4146 11.5625 10.0002 11.5625Z"
                fill="currentColor"
              />
            </svg>
          </i>
        </OutlinedButton>
      </Link>
    </header>
  );
};
