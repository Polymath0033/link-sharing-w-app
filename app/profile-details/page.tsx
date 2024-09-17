"use client";
import { FC, useState } from "react";
import { HomeWrapper } from "@/components/molecules/home-wrapper";
import { AppInput } from "@/components/atoms/inputs/app-input";
import { AppButton } from "@/components/atoms/buttons/app-button";
const ProfileDetailsPage: FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  return (
    <HomeWrapper>
      <div className=" px-6 sm:px-10 ">
        <h1 className="text-heading-m text-dark-grey">Profile Details</h1>
        <p className="text-grey text-body-m">
          Add your details to create a personal touch to your profile.
        </p>
      </div>
      <section className="rounded-xl px-6 sm:px-10 w-full flex flex-col gap-6 ">
        <div className="flex flex-col sm:flex-row justify-center sm:items-center self-stretch gap-3 sm:gap-4 bg-light-grey rounded-xl w-full p-5">
          <p className="text-grey text-body-m w-[220px]">Profile picture</p>
          <div className="flex flex-col sm:flex-row justify-center items-start sm:items-center gap-6 [flex:1_0_0] ">
            <div className="flex justify-center items-center flex-col gap-2 pt-[61px] pr-[38px] pb-[60px] pl-[39px] rounded-xl bg-light-purple ">
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="ph:image">
                  <path
                    id="Vector"
                    d="M33.75 6.25H6.25C5.58696 6.25 4.95107 6.51339 4.48223 6.98223C4.01339 7.45107 3.75 8.08696 3.75 8.75V31.25C3.75 31.913 4.01339 32.5489 4.48223 33.0178C4.95107 33.4866 5.58696 33.75 6.25 33.75H33.75C34.413 33.75 35.0489 33.4866 35.5178 33.0178C35.9866 32.5489 36.25 31.913 36.25 31.25V8.75C36.25 8.08696 35.9866 7.45107 35.5178 6.98223C35.0489 6.51339 34.413 6.25 33.75 6.25ZM33.75 8.75V24.8047L29.6766 20.7328C29.4444 20.5006 29.1688 20.3164 28.8654 20.1907C28.5621 20.0651 28.2369 20.0004 27.9086 20.0004C27.5802 20.0004 27.2551 20.0651 26.9518 20.1907C26.6484 20.3164 26.3728 20.5006 26.1406 20.7328L23.0156 23.8578L16.1406 16.9828C15.6718 16.5143 15.0362 16.2512 14.3734 16.2512C13.7107 16.2512 13.075 16.5143 12.6062 16.9828L6.25 23.3391V8.75H33.75ZM6.25 26.875L14.375 18.75L26.875 31.25H6.25V26.875ZM33.75 31.25H30.4109L24.7859 25.625L27.9109 22.5L33.75 28.3406V31.25ZM22.5 15.625C22.5 15.2542 22.61 14.8916 22.816 14.5833C23.022 14.275 23.3149 14.0346 23.6575 13.8927C24.0001 13.7508 24.3771 13.7137 24.7408 13.786C25.1045 13.8584 25.4386 14.037 25.7008 14.2992C25.963 14.5614 26.1416 14.8955 26.214 15.2592C26.2863 15.6229 26.2492 15.9999 26.1073 16.3425C25.9654 16.6851 25.725 16.978 25.4167 17.184C25.1084 17.39 24.7458 17.5 24.375 17.5C23.8777 17.5 23.4008 17.3025 23.0492 16.9508C22.6975 16.5992 22.5 16.1223 22.5 15.625Z"
                    fill="#633CFF"
                  />
                </g>
              </svg>
              <p className="text-purple text-heading-s">+ Upload Image</p>
            </div>
            <p className="text-grey text-body-s [flex:1_0_0]">
              Image must be below 1024x1024px. Use PNG or JPG format.
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-center self-stretch gap-3 bg-light-grey rounded-xl w-full p-5">
          <div className="flex flex-col sm:flex-row justify-center items-start sm:items-center  self-stretch gap-2 sm:gap-4">
            <p className="text-grey text-body-m w-[220px]">First Name*</p>
            <AppInput
              className="[flex:1_0_0]"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              id="first-name"
              placeholder="e.g John"
            />
          </div>
          <div className="flex flex-col sm:flex-row items-start justify-center sm:items-center self-stretch gap-2 sm:gap-4">
            <p className="text-grey text-body-m w-[220px]">Last Name*</p>
            <AppInput
              className="[flex:1_0_0]"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              id="last-name"
              placeholder="e.g. Appleseed"
            />
          </div>
          <div className="flex flex-col sm:flex-row items-start justify-center sm:items-center self-stretch gap-2 sm:gap-4 ">
            <p className="text-grey text-body-m w-[220px]">Email</p>
            <AppInput
              className="[flex:1_0_0]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              placeholder="e.g. email@example.com"
              type="email"
            />
          </div>
        </div>
      </section>
      <div className="flex flex-col justify-end self-stretch items-start pt-10">
        <div className="bg-borders h-[1px] w-full"></div>
        <div className="px-6 sm:px-10 py-3 flex flex-col self-end items-stretch">
          <AppButton value="Save" />
        </div>
      </div>

      {/* <form className="gap-6 flex flex-col"></form> */}
    </HomeWrapper>
  );
};
export default ProfileDetailsPage;
