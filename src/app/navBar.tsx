import Image from "next/image";
import { ModeToggle } from "@/app/modeToggle";
import React from "react";
import NavSearchBar from "@/app/navSearchBar";
import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
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
          <span className="font-[GMARKET-Bold] self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            mejai.gg
          </span>
        </Link>
        <NavSearchBar />
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
