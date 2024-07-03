import React from "react";

interface RecommendedNicknameListProps {
  searchResults: string[];
}

export default function RecommendedNicknameList({
  searchResults,
}: RecommendedNicknameListProps) {
  return (
    <>
      {searchResults.map((item, idx) => (
        // TODO: 백엔드 완성되면 Link로 교체 필요
        <button
          key={idx}
          className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 focus:bg-gray-100 dark:focus:bg-gray-600 focus:outline-none"
        >
          {item}
        </button>
      ))}
    </>
  );
}
