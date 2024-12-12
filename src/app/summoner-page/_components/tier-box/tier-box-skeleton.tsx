import { Skeleton } from "@/components/ui";

const TierUnitSkeleton = ({ type }: { type: "솔로랭크" | "자유랭크" }) => (
  <div className="flex w-1/2 flex-col items-center justify-center gap-4">
    <Skeleton className="h-4 w-16" />
    <Skeleton className="h-[90px] w-[90px] rounded-xl" />
    <div className="flex flex-col items-center gap-1">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-3 w-12" />
      <Skeleton className="h-3 w-20" />
    </div>
  </div>
);

export const TierBoxSkeleton = () => {
  return (
    <div className="flex w-full justify-center">
      <TierUnitSkeleton type="솔로랭크" />
      <TierUnitSkeleton type="자유랭크" />
    </div>
  );
};
