import { useRouter } from "next/navigation";
import { useRef, useState, FormEvent, RefObject } from "react";
import { useDropdown } from "@/components/provider/dropdown-provider";
import { addSearchHistory } from "@/lib/search-history-func";

interface UseSummonerNavigationReturn {
  inputRef: RefObject<HTMLInputElement>;
  curInputValue: string;
  setCurInputValue: (value: string) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  moveToSummonerPage: (id: string, tag: string) => void;
}

export function useSummonerNavigation(): UseSummonerNavigationReturn {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [curInputValue, setCurInputValue] = useState<string>("");
  const { setIsDropdownVisible } = useDropdown();

  const moveToSummonerPage = (id: string, tag: string): void => {
    router.push(`/summoner-page?id=${id}&tag=${tag}`);
    addSearchHistory(`${id}#${tag}`);
    setCurInputValue("");
    setIsDropdownVisible(false);
    inputRef.current?.blur();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    let id: string, tag: string;

    if (!curInputValue) return;
    if (curInputValue.includes("#")) {
      [id, tag] = curInputValue.split("#");
    } else {
      id = curInputValue;
      tag = "KR1";
    }

    moveToSummonerPage(id, tag);
  };

  return {
    inputRef,
    curInputValue,
    setCurInputValue,
    handleSubmit,
    moveToSummonerPage,
  };
}
