export function addSearchHistory(id: string) {
  const searchHistoryString = localStorage.getItem("searchHistory");
  const searchHistories: string[] = searchHistoryString
    ? JSON.parse(searchHistoryString)
    : [];
  if (!searchHistories.includes(id)) {
    searchHistories.unshift(id);
    if (searchHistories.length > 10) searchHistories.pop();
    localStorage.setItem("searchHistory", JSON.stringify(searchHistories));
  } else {
    const filteredSearchHistories = searchHistories.filter(
      (searchHistoryId) => searchHistoryId !== id,
    );
    filteredSearchHistories.unshift(id);
    localStorage.setItem(
      "searchHistory",
      JSON.stringify(filteredSearchHistories),
    );
  }
}

export function removeSearchHistory(id: string) {
  const searchHistoryString = localStorage.getItem("searchHistory");
  const searchHistories: string[] = searchHistoryString
    ? JSON.parse(searchHistoryString)
    : [];
  const filteredSearchHistories = searchHistories.filter(
    (searchHistoryId) => searchHistoryId !== id,
  );
  localStorage.setItem(
    "searchHistory",
    JSON.stringify(filteredSearchHistories),
  );
}

export function isSearchHistory(id: string): boolean {
  if (typeof localStorage === "undefined") return false;
  const searchHistoryString = localStorage.getItem("searchHistory");
  const searchHistories: string[] = searchHistoryString
    ? JSON.parse(searchHistoryString)
    : [];
  return searchHistories.includes(id);
}
