import { Skeleton } from "@/components/ui";

export const ImageSkeleton = () => {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="full h-24 w-24" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
};
