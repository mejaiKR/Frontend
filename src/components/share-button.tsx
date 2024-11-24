"use client";

import { useEffect, useState } from "react";

import { ShareSvgIcon } from "@/components/ui";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const copyUrl = () => {
  navigator.clipboard.writeText(window.location.href);
};

export const ShareButton = () => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  useEffect(() => {
    // 팝오버 닫기 타임아웃 이벤트
    if (popoverOpen) {
      const timer = setTimeout(() => {
        setPopoverOpen(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [popoverOpen]);

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger asChild>
        <button onClick={copyUrl} className="h-fit w-fit">
          <ShareSvgIcon />
        </button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex items-center justify-center font-medium">
          클립보드에 url이 복사되었습니다
        </div>
      </PopoverContent>
    </Popover>
  );
};
