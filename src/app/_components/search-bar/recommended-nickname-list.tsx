import Link from "next/link";
import { SetterOrUpdater } from "recoil";

type Props = Readonly<{
  searchResults: string[];
  setIsVisibleDropdown: SetterOrUpdater<boolean>;
}>;

export const RecommendedNicknameList = ({
  searchResults,
  setIsVisibleDropdown,
}: Props) => {
  const handleClick = () => {
    setIsVisibleDropdown(false);
  };

  return (
    <>
      {searchResults.map((item) => (
        <Link
          key={item}
          href={`/summoner-page?id=${item.split("#")[0]}&tag=${item.split("#")[1]}`}
          className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:hover:bg-gray-600 dark:focus:bg-gray-600"
          onClick={handleClick}
        >
          {item}
        </Link>
      ))}
    </>
  );
};
