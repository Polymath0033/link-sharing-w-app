"use client";
import { FC, Fragment, useEffect, useState } from "react";
import { Card } from "../molecules/card";
import { OutlinedButton } from "../atoms/buttons/outline-button";
import { AppButton } from "../atoms/buttons/app-button";
import Image from "next/image";
import { supabase } from "@/utils/supabase/client";
import { toast } from "react-toastify";
export const HomePage: FC = () => {
  const [links_, setLinks_] = useState<
    { platform: string; link: string | "Github"; dropdown: boolean }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data_, setData_] = useState(null);
  const addNewLink = () => {
    setLinks_((prevLinks) => [
      ...prevLinks,
      { platform: "", link: "", dropdown: false },
    ]); // Immutable update
  };

  const updateLink = (index: number, newLink: string) => {
    setLinks_((prevLinks) =>
      prevLinks.map((link, i) =>
        i === index ? { ...link, link: newLink } : link
      )
    );
  };
  const updatePlatform = (index: number, newPlatform: string) => {
    setLinks_((prevLinks) =>
      prevLinks.map((link, i) =>
        i === index ? { ...link, platform: newPlatform } : link
      )
    );
  };
  const updateDropdown = (index: number) => {
    const updatedLinks = links_.map((link, i) => {
      console.log(i === index);
      if (i === index) {
        return { ...link, dropdown: !link.dropdown };
      } else {
        return { ...link, dropdown: false };
      }
    });

    setLinks_(updatedLinks);
  };
  const closeDropdown = (index: number) => {
    setLinks_((prevLinks) =>
      prevLinks.map((link, i) =>
        i === index ? { ...link, dropdown: false } : link
      )
    );
  };

  const removeLink = (index: number) => {
    setLinks_((prevLinks) => prevLinks.filter((_, i) => i !== index));
  };

  const submitHandler = async () => {
    const _links: { platform: string; link: string }[] = [];
    for (let link_ of links_) {
      if (link_.platform === "") {
        _links.push({ link: link_.link, platform: "Github" });
      } else {
        _links.push({ link: link_.link, platform: link_.platform });
      }
    }
    //  setLoading(true);
    const user = await supabase.auth.getUser();
    const id = user.data.user?.id;

    console.log(links_);
    const { data: links, error } = await supabase
      .from("links")
      .insert(_links)
      .select();
    //let { data: links, error } = await supabase.from("links").select("*");
    //.select("*");
    //  console.log(fetch);
    console.log(links);
    console.log(links);
    console.log(error);
    setLoading(false);
    if (error) {
      console.log(error);
      setLoading(false);
    } else {
      console.log(links);
    }
  };
  const clickToast = () => {
    console.log("clicked");
    console.log(toast);
    toast.success("success!");
  };
  return (
    <Fragment>
      <div className="px-6 sm:px-10">
        <h1 className="text-heading-m text-dark-grey">
          Customize your links{" "}
          <button onClick={() => clickToast()}>test the toast</button>
        </h1>
        <p className="text-grey text-body-m">
          Add/edit/remove links below and then share all your profiles with the
          world!
        </p>
      </div>
      <div className="flex flex-col self-stretch items-start flex-1 w-full gap-6 px-6 sm:px-10 pb-20 md:pb-0">
        <OutlinedButton
          onClick={addNewLink}
          value="+ Add new link"
          className="w-full"
        />
        {links_.length < 1 ? (
          <div className="flex flex-col justify-center items-center p-5 gap-10 rounded-xl bg-light-grey h-full flex-1 w-full">
            <Image
              src="/images/illustration-empty.svg"
              alt="Illustration empty state"
              width={249}
              height={160}
            />
            <div className="flex flex-col gap-3 items-center">
              <h3 className="text-heading-m text-dark-grey text-center sm:text-start">
                Let’s get you started
              </h3>
              <p className="text-center text-grey text-body-m">
                Use the “Add new link” button to get started. Once you have more
                than one link, you can reorder and edit them. We’re here to help
                you share your profiles with everyone!
              </p>
            </div>
          </div>
        ) : (
          links_.map((link, index) => (
            <Card
              key={index}
              index={index}
              platform={link.platform}
              link={link.link}
              dropdown={link.dropdown}
              onUpdatePlatform={(newPlatform: string) =>
                updatePlatform(index, newPlatform)
              }
              onUpdateLink={(newLink: string) => updateLink(index, newLink)}
              removeLink={() => removeLink(index)}
              updateDropdown={() => updateDropdown(index)}
              closeDropdown={() => closeDropdown(index)}
            />
          ))
        )}
      </div>

      <div className="flex flex-col justify-end self-stretch items-start  fixed bottom-6 rounded-br-xl rounded-bl-xl mt-8 left-6 w-[calc(100%_-_48px)] md:w-full md:left-0 z-50 bg-white md:relative">
        <div className="bg-borders h-[1px] w-full"></div>
        <div className="px-6 sm:px-10 py-3 flex flex-col sm:self-end w-full relative z-50 sm:w-fit items-stretch">
          <AppButton
            onClick={submitHandler}
            loading={loading}
            value="Save"
            className="!w-full"
            disabled={links_.length < 1}
          />
        </div>
      </div>
      <div className="flex md:hidden w-[calc(100%_-_48px)] fixed left-6 bottom-0 z-50 bg-light-grey h-6 "></div>
    </Fragment>
  );
};
