import Image from "next/image";
import React from "react";
import Link from "next/link";
import { ModeToggle } from "@/components/ui/mode-toggle";

export default function NavBar() {
  return (
    <nav className="border-gray-200 ">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <Image
            src="/mejai.png"
            alt="loading"
            draggable={false}
            width={40}
            height={40}
          />
          <span className="font-gmarketBold self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            mejai.kr
          </span>
        </Link>
        <ModeToggle />
      </div>
    </nav>
  );
}
