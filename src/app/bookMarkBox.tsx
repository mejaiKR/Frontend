import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { removeBookmarkId } from "@/lib/bookMarkFunc";
import { useState } from "react";

function getBookmarks(): string[] {
  const bookmarkString = localStorage.getItem("bookmark");
  return bookmarkString ? JSON.parse(bookmarkString) : [];
}

export default function BookMarkBox() {
  const [bookmarkArr, setBookmarkArr] = useState(getBookmarks());

  return (
    <ScrollArea className="h-29 w-full rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 flex justify-center font-medium leading-none">
          즐겨찾기
        </h4>
        {bookmarkArr.map((bookmark) => {
          const [id, key] = bookmark.split("#");
          return (
            <>
              <Separator className="my-1" />
              <div className="flex justify-between items-center w-full">
                <Link href={`/summoner-page?id=${id}&tag=${key}`}>
                  <div className=" text-xs w-full h-10 flex justify-center items-center">
                    {bookmark}
                  </div>
                </Link>
                <button
                  onClick={() => {
                    removeBookmarkId(bookmark);
                    setBookmarkArr(getBookmarks());
                  }}
                  className="text-xs"
                >
                  x
                </button>
              </div>
            </>
          );
        })}
      </div>
    </ScrollArea>
  );
}
