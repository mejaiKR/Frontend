import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import Image from "next/image";

export default function MejaiBox({ index }: { index: number }) {
  return (
    <>
      {index % 3 === 0 ? (
        <HoverCard openDelay={0} closeDelay={0}>
          <HoverCardTrigger>
            <div className="relative m-0.5">
              <Image
                key={index}
                draggable={false}
                src="/mejai.png"
                alt="Mejai's Soulstealer"
                width={40}
                height={40}
                className="w-auto h-auto"
              />
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="HoverCardContent font-[BFL-B]">
            1월 27일 3승 3패
          </HoverCardContent>
        </HoverCard>
      ) : (
        <div className="relative m-0.5">
          <Image
            key={index}
            draggable={false}
            src="/empty-item.png"
            alt="Mejai's Soulstealer"
            width={40}
            height={40}
            className="w-auto h-auto"
          />
        </div>
      )}
    </>
  );
}
