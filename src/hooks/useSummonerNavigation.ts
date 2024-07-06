import { useRouter } from "next/navigation";
import { useRef, FormEvent, RefObject } from "react";
import { useDropdown } from "@/components/provider/dropdown-provider";
import { addSearchHistory } from "@/lib/search-history-func";
import { useRecoilState } from "recoil";
import { searchInputValueState } from "@/lib/recoil/atoms";

interface UseSummonerNavigationReturn {
  inputRef: RefObject<HTMLInputElement>;
  searchInputValue: string;
  setSearchInputValue: (value: string) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  moveToSummonerPage: (id: string, tag: string) => void;
}

export function useSummonerNavigation(): UseSummonerNavigationReturn {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchInputValue, setSearchInputValue] = useRecoilState(
    searchInputValueState,
  );
  const { setIsDropdownVisible } = useDropdown();

  const moveToSummonerPage = (id: string, tag: string): void => {
    router.push(`/summoner-page?id=${id}&tag=${tag}`);
    addSearchHistory(`${id}#${tag}`);
    setSearchInputValue("");
    setIsDropdownVisible(false);
    inputRef.current?.blur();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    let id: string, tag: string;

    if (!searchInputValue) return;
    if (searchInputValue.includes("#")) {
      [id, tag] = searchInputValue.split("#");
    } else {
      id = searchInputValue;
      tag = "KR1";
    }

    moveToSummonerPage(id, tag);
  };

  return {
    inputRef,
    searchInputValue,
    setSearchInputValue,
    handleSubmit,
    moveToSummonerPage,
  };
}
