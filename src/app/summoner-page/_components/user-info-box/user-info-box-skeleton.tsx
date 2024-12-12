import { Skeleton } from "@/components/ui";

export const UserInfoBoxSkeleton = () => {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="full h-[105px] w-[105px] rounded-xl" />
      <div className="flex flex-col gap-2 space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[60px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
};
