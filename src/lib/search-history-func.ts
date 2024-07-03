export function addSearchHistory(id: string) {
  const searchHistoryString = localStorage.getItem("searchHistory");
  const searchHistories: string[] = searchHistoryString
    ? JSON.parse(searchHistoryString)
    : [];
  if (!searchHistories.includes(id)) {
    searchHistories.unshift(id);
    if (searchHistories.length > 10) searchHistories.pop();
    localStorage.setItem("searchHistory", JSON.stringify(searchHistories));
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
  const searchHistoryString = localStorage.getItem("searchHistory");
  const searchHistories: string[] = searchHistoryString
    ? JSON.parse(searchHistoryString)
    : [];
  return searchHistories.includes(id);
}
