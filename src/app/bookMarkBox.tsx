"use client";

function getBookmarks(): string[] {
  const bookmarkString = localStorage.getItem("bookmark");
  return bookmarkString ? JSON.parse(bookmarkString) : [];
}

export default function BookMarkBox() {
  const bookmarks = getBookmarks();
  return (
    <div className="h-100 w-full flex">
      <div className="w-1/2 h-full">
        <div className="w-full h-10 border-2 border-black">북마크</div>
        {bookmarks.map((id) => (
          <div key={id} className="w-full h-10 border-2 border-black">
            {id}
          </div>
        ))}
      </div>
      <div className="w-1/2 h-full">
        <div className="w-full h-10 border-2 border-black">검색기록</div>
        <div className="w-full h-10 border-2 border-black">1</div>
        <div className="w-full h-10 border-2 border-black">2</div>
        <div className="w-full h-10 border-2 border-black">3</div>
      </div>
    </div>
  );
}
