export function addBookmarkId(id: string) {
  const bookmarkString = localStorage.getItem("bookmark");
  const bookmarks: string[] = bookmarkString ? JSON.parse(bookmarkString) : [];
  if (!bookmarks.includes(id)) {
    bookmarks.unshift(id);
    if (bookmarks.length > 10) bookmarks.pop();
    localStorage.setItem("bookmark", JSON.stringify(bookmarks));
  }
}

export function removeBookmarkId(id: string) {
  const bookmarkString = localStorage.getItem("bookmark");
  const bookmarks: string[] = bookmarkString ? JSON.parse(bookmarkString) : [];
  const filteredBookmarks = bookmarks.filter((bookmarkId) => bookmarkId !== id);
  localStorage.setItem("bookmark", JSON.stringify(filteredBookmarks));
}

export function isLocalStorageBookmarked(id: string): boolean {
  if (typeof localStorage === "undefined") return false;
  const bookmarkString = localStorage.getItem("bookmark");
  const bookmarks: string[] = bookmarkString ? JSON.parse(bookmarkString) : [];
  return bookmarks.includes(id);
}
