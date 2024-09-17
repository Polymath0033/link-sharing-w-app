"use client";
import { FC, Fragment, useEffect, useState } from "react";
import { Card } from "../molecules/card";
import { OutlinedButton } from "../atoms/buttons/outline-button";
import { AppButton } from "../atoms/buttons/app-button";
import Image from "next/image";

export const HomePage: FC = () => {
  const [links, setLinks] = useState<
    { platform: string; link: string; dropdown: boolean }[]
  >([]);

  const addNewLink = () => {
    setLinks((prevLinks) => [
      ...prevLinks,
      { platform: "", link: "", dropdown: false },
    ]); // Immutable update
  };

  const updateLink = (index: number, newLink: string) => {
    setLinks((prevLinks) =>
      prevLinks.map((link, i) =>
        i === index ? { ...link, link: newLink } : link
      )
    );
  };
  const updatePlatform = (index: number, newPlatform: string) => {
    setLinks((prevLinks) =>
      prevLinks.map((link, i) =>
        i === index ? { ...link, platform: newPlatform } : link
      )
    );
  };
  const updateDropdown = (index: number) => {
    const updatedLinks = links.map((link, i) => {
      console.log(i === index);
      if (i === index) {
        return { ...link, dropdown: !link.dropdown };
      } else {
        return { ...link, dropdown: false };
      }
    });

    setLinks(updatedLinks);
  };
  const closeDropdown = (index: number) => {
    setLinks((prevLinks) =>
      prevLinks.map((link, i) =>
        i === index ? { ...link, dropdown: false } : link
      )
    );
  };

  const removeLink = (index: number) => {
    setLinks((prevLinks) => prevLinks.filter((_, i) => i !== index));
  };

  useEffect(() => {
    console.log(links);
  }, [links]);

  return (
    <Fragment>
      <div className="px-10">
        <h1 className="text-heading-m text-dark-grey">Customize your links</h1>
        <p className="text-grey text-body-m">
          Add/edit/remove links below and then share all your profiles with the
          world!
        </p>
      </div>
      <div className="flex flex-col self-stretch items-start flex-1 w-full gap-6 px-10">
        <OutlinedButton
          onClick={addNewLink}
          value="+ Add new link"
          className="w-full"
        />
        {links.length < 1 ? (
          <div className="flex flex-col justify-center items-center p-5 gap-10 rounded-xl bg-light-grey h-full flex-1 w-full">
            <Image
              src="/images/illustration-empty.svg"
              alt="Illustration empty state"
              width={249}
              height={160}
            />
            <div className="flex flex-col gap-3 items-center">
              <h3 className="text-heading-m text-dark-grey">
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
          links.map((link, index) => (
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

      <div className="flex flex-col justify-end self-stretch items-start  ">
        <div className="bg-borders h-[1px] w-full"></div>
        <div className="px-10 py-3 flex flex-col self-end items-stretch">
          <AppButton value="Save" disabled={links.length < 1} />
        </div>
      </div>
    </Fragment>
  );
};
