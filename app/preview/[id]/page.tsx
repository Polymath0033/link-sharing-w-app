"use client";
import { FC, useEffect } from "react";
import { AppButton } from "@/components/atoms/buttons/app-button";
import { OutlinedButton } from "@/components/atoms/buttons/outline-button";
import { supabase } from "@/utils/supabase/client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchLinks, fetchUsersDetails } from "@/redux/thunk-functions";
import { PillBox } from "@/components/molecules/pill-box";
import Image from "next/image";
import { toast } from "react-toastify";
const PreviewPageID: FC = ({}) => {
  // const params = useParams();
  const dispatch = useAppDispatch();
  const { links, isLinksLoading } = useAppSelector((state) => state.links);
  const { user, isFetching } = useAppSelector((state) => state.user);
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      console.log(id);
      try {
        if (id) {
          await dispatch(fetchUsersDetails(id as string));
          await dispatch(fetchLinks({ user_id: id as string }));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast("Link copied to clipboard", {
      position: "bottom-center",
      autoClose: 2000,
      bodyStyle: {
        fontSize: "12px !important",
        backgroundClip: "#333 !important",
        borderRadius: 12 + "px",
      },
    });
  };
  return (
    <div className="relative bg-white sm:bg-inherit h-screen sm:h-full">
      <div className="bg-purple hidden sm:block absolute top-0 left-0 w-full rounded-br-[32px] rounded-bl-[32px] h-[357px] "></div>
      <header className=" h-16 sm:bg-white flex justify-between relative top-4 left-0 w-full sm:top-6 sm:left-6 sm:w-[calc(100%_-_48px)] items-center py-0 sm:p-4 px-6 sm:pl-6 sm:rounded-xl">
        <Link href="/">
          <OutlinedButton value="Back to Editor" />
        </Link>
        <AppButton onClick={copyLink} value="Share link" className="!w-fit" />
      </header>
      <section className="sm:shadow-box-shadow flex gap-2 py-12 px-14 bg-white relative mx-auto rounded-3xl mt-[106px] h-fit z-10 w-[349px] sm:mb-16">
        <div className="flex flex-col gap-14 items-start [flex:1_0_0] ">
          <div
            className={`flex flex-col gap-[25px] items-center self-stretch ${
              isFetching && "animate-pulse"
            }`}
          >
            {isFetching ? (
              <div className="bg-[#EEE] h-24 w-24 rounded-[96px]"></div>
            ) : user.length > 0 && user[0]?.image_url.length > 0 ? (
              <Image
                src={user[0]?.image_url}
                alt={user[0]?.first_name}
                width={96}
                height={96}
                className="rounded-[96px] h-24 w-24 border-4 border-purple"
              />
            ) : (
              //generate svg for user image
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="97"
                height="96"
                viewBox="0 0 97 96"
                fill="none"
              >
                <circle cx="48.5" cy="48" r="48" fill="#EEEEEE" />
              </svg>
            )}
            <div
              className={`flex flex-col ${
                isFetching ? "gap-[13px]" : "gap-2"
              } items-center`}
            >
              {isFetching && (
                <div className="bg-[#EEE] rounded-[104px] h-4 w-40"></div>
              )}
              {isFetching === false && (
                <h6 className="text-dark-grey text-heading-s !text-lg">
                  {user[0]?.first_name === ""
                    ? ""
                    : user[0]?.first_name + " " + user[0]?.last_name === ""
                    ? ""
                    : user[0]?.last_name}
                </h6>
              )}
              {isFetching ? (
                <div className="bg-[#EEE] animate-pulse h-2 w-[72px] rounded-[104px]"></div>
              ) : (
                <p className="text-grey  text-body-m !text-sm">
                  {user[0]?.email}
                </p>
              )}
            </div>
          </div>
          {/* <div className="flex gap-[25px] flex-col items-center self-stretch">
            <div className="w-[104px] h-[104px] rounded-[104px] border-4 border-purple "></div>
            <div className="flex flex-col gap-2  items-center">
              <h2 className="text-dark-grey text-heading-m text-center">
                Ben Wright
              </h2>
              <p className="text-grey text-body-m">ben@example.com</p>
            </div>
          </div> */}
          {isLinksLoading ? (
            <div className="flex flex-col gap-5 w-full animate-pulse">
              {new Array(5).fill(0).map((_, i) => (
                <div className="w-full" key={i}>
                  <span className=" h-[44px]  bg-[#EEE] flex rounded-lg w-full">
                    {" "}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <ul className="flex flex-col gap-5 w-full">
              {links.map((link) => (
                <PillBox key={link.id} title={link.platform} url={link.link} />
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
};
export default PreviewPageID;
