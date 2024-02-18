import Image from "next/image";
import React from "react";

export default function Mejais({ index }: { index: number }) {
  return (
    <div className="relative m-0.5">
      <Image
        key={index}
        src="/mejai.png"
        alt="Mejai's Soulstealer"
        width={40}
        height={40}
        className="w-auto h-auto"
      />
      <span
        className="absolute top-2 right-0 text-white text-lg"
        style={{
          textShadow:
            "2px 0 0 #000, -2px 0 0 #000, 0 2px 0 #000, 0 -2px 0 #000, 1px 1px #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000",
        }}
      >
        {20}
      </span>
    </div>
  );
}
