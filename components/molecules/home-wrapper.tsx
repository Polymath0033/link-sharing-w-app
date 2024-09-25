"use client";
import React, { FC, useState, useEffect, use } from "react";
import { AppHeader } from "@/components/molecules/header";
import { FrameOne } from "../atoms/frames/frame-one";
import { FrameTwo } from "../atoms/frames/frame-two";
import { PhoneView } from "./phone-view";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchUser, fetchUsersDetails } from "@/redux/thunk-functions";
import { HomePage } from "./home";
import { ProfileDetails } from "./profile-details";
import { fetchLinks } from "@/redux/thunk-functions";
import { LinksType } from "@/types/links";
import { Links } from "@/types/redux";
export const HomeWrapper: FC<{}> = ({}) => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth.user);
  const { user, isFetching } = useAppSelector((state) => state.user);
  const ui = useAppSelector((state) => state.ui);
  const { links, isLinksLoading } = useAppSelector((state) => state.links);
  const [previewLinks, setPreviewLinks] = useState<LinksType[]>([]);
  useEffect(() => {
    const fetchUser_ = async () => {
      try {
        await dispatch(fetchUser());
        if (auth?.id) {
          await dispatch(fetchUsersDetails(auth.id));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser_();
  }, [dispatch, auth?.id]);
  useEffect(() => {
    const fetchLinks_ = async () => {
      try {
        if (auth?.id !== undefined) {
          const a = await dispatch(fetchLinks({ user_id: auth.id }));
          const insertLinks = () => {
            let updatedLinks: LinksType[] = (a.payload as Links).map((li) => {
              return {
                platform: li.platform,
                link: li.link,
                dropdown: false,
                blur: false,
                error: "",
                placeholder: "",
                isNew: false,
                id: li.id,
                isDeleting: false,
              };
            });

            // Ensure no duplicates by filtering out existing IDs
            updatedLinks = updatedLinks.filter(
              (link, index, self) =>
                index === self.findIndex((t) => t.id === link.id)
            );

            return updatedLinks;
          };
          setPreviewLinks(insertLinks);
        }
      } catch (error) {}
    };
    fetchLinks_();
  }, [dispatch, auth?.id]);

  return (
    <div className="sm:p-6 flex flex-col">
      <AppHeader />
      <main className="flex [flex:1_0_0] mt-6 gap-6 self-stretch items-start h-screen md:h-[calc(100vh_+_200px)] p-4 sm:p-0">
        <section className="bg-white p-6 hidden md:flex gap-2 justify-center items-center self-stretch h-full w-2/5 max-w-[560px] rounded-xl ">
          {/* */}
          <div className="relative w-[307px] h-[631px]  flex items-center justify-center flex-col">
            <FrameOne />
            <FrameTwo />
            <PhoneView
              id={auth?.id}
              user={user}
              email={auth?.email}
              isFetching={isFetching}
              links={links}
              isLinksLoading={isLinksLoading}
            />
          </div>
        </section>
        <section className="flex flex-col relative items-start [flex:1_0_0] gap-10 bg-white h-full pt-10 pb-6 rounded-xl overflow-y-scroll no-scrollbar overflow-x-hidden md:scrollbar">
          {ui.header === "links" ? (
            <HomePage links={links} />
          ) : (
            <ProfileDetails user={user} />
          )}
        </section>
      </main>
    </div>
  );
};
