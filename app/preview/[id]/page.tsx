import { FC } from "react";
import { OutlinedButton } from "@/components/atoms/buttons/outline-button";
import { supabase } from "@/utils/supabase/client";
import Link from "next/link";
import { PillBox } from "@/components/molecules/pill-box";
import Image from "next/image";
import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { ClipboardBtn } from "@/components/atoms/clipboard-btn";
export const revalidate = 0;
// Async function to fetch data from Supabase

const fetchUserDetails = async (id: string) => {
  const { data, error } = await supabase
    .from("user")
    .select("*")
    .eq("user_id", id);

  if (error) {
    console.error("Error fetching user details", error);
    return null;
  }
  return data;
};

const fetchLinks = async (userId: string) => {
  const { data, error } = await supabase
    .from("links")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching links", error);
    return [];
  }
  return data;
};

interface PreviewPageIDProps {
  params: { id: string };
}
interface PreviewPageIDProps {
  params: { id: string };
}

export async function generateMetadata(
  { params }: PreviewPageIDProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const user = await fetchUserDetails(params.id);
  if (user && user.length > 0) {
    const { first_name, last_name } = user[0];
    const title = `${first_name} ${last_name} - Profile`;
    const image_url = user[0]?.image_url;
    const ogImageUrl = `https://dev-links-webapp.vercel.app/api/og?first_name=${first_name}&last_name=${last_name}&user_image=${image_url}`;
    return {
      title: title,
      description: `View the profile of ${first_name} ${last_name}.`,
      openGraph: {
        title: title,
        description: `View the profile of ${first_name} ${last_name}.`,
        images: [
          {
            url: ogImageUrl,
            width: 1200,
            height: 630,
            alt: `${first_name} ${last_name}'s profile image`,
          },
        ],
      },
    };
  }

  return {
    title: "Profile",
    description: "View the profile of this user.",
  };
}
const PreviewPageID: FC<PreviewPageIDProps> = async ({ params }) => {
  const { id } = params;

  // Fetch user details and links on the server side
  const user = await fetchUserDetails(id);
  const links = await fetchLinks(id);
  // console.log(user)
  if (!user) {
    return notFound(); // Redirect to the 404 page if the user does not exist
  }

  return (
    <div className="relative bg-white sm:bg-inherit h-screen sm:h-full">
      <div className="bg-purple hidden sm:block absolute top-0 left-0 w-full rounded-br-[32px] rounded-bl-[32px] h-[357px] "></div>
      <header className=" h-16 sm:bg-white flex justify-between relative top-4 left-0 w-full sm:top-6 sm:left-6 sm:w-[calc(100%_-_48px)] items-center py-0 sm:p-4 px-6 sm:pl-6 sm:rounded-xl">
        <Link href="/">
          <OutlinedButton value="Back to Editor" />
        </Link>
        <ClipboardBtn />
      </header>
      <section className="sm:shadow-box-shadow flex gap-2 py-12 px-14 bg-white relative mx-auto rounded-3xl mt-[106px] h-fit z-10 w-[349px] sm:mb-16">
        <div className="flex flex-col gap-14 items-start [flex:1_0_0] ">
          <div
            className={`flex flex-col gap-[25px] items-center self-stretch ${
              !user && "animate-pulse"
            }`}
          >
            {!user ? (
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
            <div className={`flex flex-col gap-2 items-center`}>
              <h6 className="text-dark-grey text-heading-s !text-lg">
                {user && user[0]?.first_name + " " + user[0]?.last_name}
              </h6>
              <p className="text-grey text-body-m !text-sm">
                {user && user[0]?.email}
              </p>
            </div>
          </div>
          {links.length === 0 ? (
            <div className="flex flex-col gap-5 w-full animate-pulse">
              {new Array(5).fill(0).map((_, i) => (
                <div className="w-full" key={i}>
                  <span className="h-[44px] bg-[#EEE] flex rounded-lg w-full"></span>
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
