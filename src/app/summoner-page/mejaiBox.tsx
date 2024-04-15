"use client";

import { useState } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import Image from "next/image";

interface MejaiBoxProps {
  date: string;
  gameCount: number;
}

export default function MejaiBox({ date, gameCount }: MejaiBoxProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {gameCount !== 0 ? (
        <HoverCard
          open={isOpen}
          onOpenChange={setIsOpen}
          openDelay={0}
          closeDelay={0}
        >
          <HoverCardTrigger asChild onClick={handleToggle}>
            <div className="relative m-0.5">
              <Image
                draggable={false}
                src="/mejai.png"
                alt="Mejai's Soulstealer"
                width={40}
                height={40}
                className="w-auto h-auto"
              />
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="HoverCardContent flex flex-col items-center justify-center text-xs">
            <p>{date}</p>
            <p>{gameCount}판</p>
          </HoverCardContent>
        </HoverCard>
      ) : (
        <div className="relative m-0.5">
          <Image
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
