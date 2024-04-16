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
  imageUrl: string;
}

export default function MejaiBox({ date, gameCount, imageUrl }: MejaiBoxProps) {
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
            <div className=" m-0.5">
              <Image
                draggable={false}
                src={imageUrl}
                alt="Mejai's Soulstealer"
                width={90}
                height={90}
                className="w-full h-full"
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
            width={90}
            height={90}
            className="w-full h-full"
          />
        </div>
      )}
    </>
  );
}
