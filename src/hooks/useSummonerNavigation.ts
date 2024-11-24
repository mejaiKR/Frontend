import { FormEvent, RefObject, useRef } from "react";

import { useRouter } from "next/navigation";
import { useRecoilState, useSetRecoilState } from "recoil";

import {
  isVisibleDropdownState,
  searchInputValueState,
} from "@/lib/recoil/atoms";
import { addSearchHistory } from "@/lib/search-history-func";

interface UseSummonerNavigationReturn {
  inputRef: RefObject<HTMLInputElement>;
  searchInputValue: string;
  setSearchInputValue: (value: string) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  moveToSummonerPage: (id: string, tag: string) => void;
}

export const useSummonerNavigation = (): UseSummonerNavigationReturn => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchInputValue, setSearchInputValue] = useRecoilState(
    searchInputValueState,
  );
  const setIsVisibleDropdown = useSetRecoilState(isVisibleDropdownState);

  const moveToSummonerPage = (id: string, tag: string): void => {
    router.push(`/summoner-page?id=${id}&tag=${tag}`);
    addSearchHistory(`${id}#${tag}`);
    setSearchInputValue("");
    setIsVisibleDropdown(false);
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
};
