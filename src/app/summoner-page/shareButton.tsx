import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ShareSvgIcon from "@/components/ui/shareSvgIcon";
import { useEffect, useState } from "react";

const copyUrl = () => {
  navigator.clipboard.writeText(window.location.href);
};

export default function ShareButton() {
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
        <button onClick={copyUrl} className="w-fit h-fit">
          <ShareSvgIcon />
        </button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="font-medium flex justify-center items-center">
          클립보드에 url이 복사되었습니다
        </div>
      </PopoverContent>
    </Popover>
  );
}
