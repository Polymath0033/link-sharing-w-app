"use client";
import { FC } from "react";
import { HomeWrapper } from "@/components/molecules/home-wrapper";
import { ProfileDetails } from "@/components/molecules/profile-details";
const ProfileDetailsPage: FC = () => {
  return (
    <HomeWrapper>
      <ProfileDetails />
    </HomeWrapper>
  );
};
export default ProfileDetailsPage;
