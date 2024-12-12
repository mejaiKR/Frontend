import { Card, CardContent, Skeleton } from "@/components";

export const MonthMejaiCardSkeleton = () => {
  return (
    <Card>
      <CardContent className="flex aspect-square flex-col items-center justify-center p-6">
        <div className="mt-1 flex w-full flex-col items-center justify-between">
          <Skeleton className="h-8 w-24" />
          <div className="mt-2 flex h-1 w-full justify-center">
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="mb-4 mt-4 h-8 w-32" />
          <Skeleton className="mb-2 h-4 w-24" />
          <div className="grid w-full grid-cols-7 gap-1">
            {Array.from({ length: 35 }, (_, i) => (
              <Skeleton key={i} className="w-full rounded-md" />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
