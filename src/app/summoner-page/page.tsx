import React from "react";
import Jandi from "@/app/summoner-page/jandi";
import UserInfoBox from "@/app/summoner-page/userInfoBox";
import TierBox from "@/app/summoner-page/tierBox";

export default function SummonerPage() {
  return (
    <>
      <UserInfoBox />
      <TierBox />
      <Jandi />
    </>
  );
}
