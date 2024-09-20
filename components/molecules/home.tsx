"use client";
import { FC, Fragment, useEffect, useState, useCallback } from "react";
import { Card } from "../molecules/card";
import { OutlinedButton } from "../atoms/buttons/outline-button";
import { AppButton } from "../atoms/buttons/app-button";
import Image from "next/image";
import { supabase } from "@/utils/supabase/client";
import { toast } from "react-toastify";
import { selectIcons } from "@/utils/icon";
import { SelectIcon } from "@/types/select-icon";
import { LinksType } from "@/types/links";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { urlPrefixes } from "@/utils/url-prefixes";
import { addLinks, fetchLinks, fetchUser } from "@/redux/thunk-functions";
export const HomePage: FC = () => {
  const dispatch = useAppDispatch();
  const linkStore = useAppSelector((state) => state.links.links);
  const [links_, setLinks_] = useState<LinksType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data_, setData_] = useState(null);

  const addNewLink = () => {
    setLinks_((prevLinks) => [
      ...prevLinks,
      {
        platform: "",
        link: "",
        dropdown: false,
        blur: false,
        error: "",
        placeholder: "",
      },
    ]);
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
  const updateBlur = (index: number) => {
    setLinks_((prevLinks) =>
      prevLinks.map((link, i) => (i === index ? { ...link, blur: true } : link))
    );
  };
  const removeLink = (index: number) => {
    setLinks_((prevLinks) => prevLinks.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const modifyLinksPlaceholder = () => {
      const _links = links_.map((link) => {
        return {
          ...link,
          placeholder:
            urlPrefixes[link.platform as keyof typeof urlPrefixes] ||
            "https://github.com/",
        };
      });
      setLinks_((prevLinks) => {
        // Only update the state if the new links are different from the previous ones
        const hasChanges = _links.some(
          (link, index) => link.placeholder !== prevLinks[index].placeholder
        );
        return hasChanges ? _links : prevLinks;
      });
    };

    modifyLinksPlaceholder();
  }, [links_, urlPrefixes]);
  useEffect(() => {
    // dispatch(fetchUser());
    // console.log("auth", auth);
    const fetchUserData = async () => {
      const user = await dispatch(fetchUser());
    };
    fetchUserData();
  }, []);
  // useEffect(() => {
  //   const fetchLinks = async () => {
  //     const user = await supabase.auth.getUser();
  //     const id = user.data.user?.id;
  //     const { data, error } = await supabase
  //       .from("links")
  //       .select("*")
  //       .eq("user_id", id);
  //     if (error) {
  //       console.log(error);
  //       // setError(error);
  //     } else {
  //       console.log(data);
  //     }
  //   };
  //   fetchLinks();
  // }, []);
  const submitHandler = async () => {
    let isValid = true;
    //const regex = new RegExp()
    const _links = links_.map((link) => {
      return {
        ...link,
        platform: link.platform === "" ? "Github" : link.platform,
      };
    });
    _links.forEach((link) => {
      if (link.link.trim() === "") {
        isValid = false;
        return { ...link, error: "Can't be empty", blur: true };
      } else {
        return { ...link, error: "", blur: true };
      }
    });
    _links.forEach((link) => {
      if (
        new RegExp(`${urlPrefixes[link.platform]}`).test(link.link) === false
      ) {
        isValid = false;
        link.error = "Enter a valid link that matches the platform";
        link.blur = true;
      } else {
        link.error = "";
        link.blur = true;
      }
    });
    setLinks_(_links);
    if (!isValid) {
      return;
    }
    setLoading(true);
    try {
      const user = await dispatch(fetchUser());
      const id = (user.payload as { id: string })?.id;
      console.log("id", id);
      const linksData: { platform: string; link: string; user_id: string }[] =
        [];
      for (let link_ of links_) {
        if (id) {
          linksData.push({
            link: link_.link,
            platform: link_.platform,
            user_id: id,
          });
        }
      }
      // console.log(linksData);
      await dispatch(addLinks(linksData));
      const userLinks = await dispatch(fetchLinks({ user_id: id }));
      console.log("userLinks", userLinks);
      setLoading(false);

      //  console.log("links", linkStore);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <Fragment>
      <div className="px-6 sm:px-10">
        <h1 className="text-heading-m text-dark-grey">Customize your links </h1>
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
              links={link}
              onUpdatePlatform={(newPlatform: string) =>
                updatePlatform(index, newPlatform)
              }
              onUpdateLink={(newLink: string) => updateLink(index, newLink)}
              removeLink={() => removeLink(index)}
              updateDropdown={() => updateDropdown(index)}
              closeDropdown={() => closeDropdown(index)}
              onBlur={() => updateBlur(index)}
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
