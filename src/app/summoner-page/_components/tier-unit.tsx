import Image from "next/image";

import { RankInfo, RankType } from "@/types";

type Props = {
  rankInfo: RankInfo;
  rankType: RankType;
};

export const TierUnit = ({ rankInfo, rankType }: Props) => {
  return (
    <div className="flex w-1/2 flex-col items-center justify-center">
      <span>{rankType === "soloRank" ? "솔로랭크" : "자유랭크"}</span>
      <Image
        src={rankInfo.tierIcon}
        alt="Profile Icon"
        draggable={false}
        width={90}
        height={90}
        priority={true} // lazy loading에서 제외
      />
      <div className="flex h-full flex-col items-center justify-center">
        <h1 className="text-sm font-bold">
          {rankInfo.tier} {rankInfo.rank}
        </h1>
        <h4 className="mt-1 text-xs">{rankInfo.leaguePoints}LP</h4>
        <h5 className="mt-1 text-xs font-light text-gray-500">
          {rankInfo.wins}승 {rankInfo.losses}패
        </h5>
      </div>
    </div>
  );
};
