import { ScrollArea } from "@/components/ui/scroll-area";

export default function SearchHistoryBox() {
  return (
    <ScrollArea className="h-29 w-full rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 flex justify-center text-sm font-medium leading-none">
          검색기록
        </h4>
      </div>
    </ScrollArea>
  );
}
