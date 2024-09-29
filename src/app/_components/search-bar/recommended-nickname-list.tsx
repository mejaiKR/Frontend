import Link from "next/link";
import { SetterOrUpdater } from "recoil";

interface RecommendedNicknameListProps {
  searchResults: string[];
  setIsVisibleDropdown: SetterOrUpdater<boolean>;
}

export default function RecommendedNicknameList({
  searchResults,
  setIsVisibleDropdown,
}: RecommendedNicknameListProps) {
  const handleClick = () => {
    setIsVisibleDropdown(false);
  };

  return (
    <>
      {searchResults.map((item, idx) => (
        <Link
          key={idx}
          href={`/summoner-page?id=${item.split("#")[0]}&tag=${item.split("#")[1]}`}
          className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 focus:bg-gray-100 dark:focus:bg-gray-600 focus:outline-none"
          onClick={handleClick}
        >
          {item}
        </Link>
      ))}
    </>
  );
}
