import Image from "next/image";
import Link from "next/link";

import { ModeToggle } from "@/components/ui/mode-toggle";

export const NavBar = () => {
  return (
    <nav className="border-gray-200">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between p-4">
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
          <span className="self-center whitespace-nowrap font-gmarketBold text-2xl font-semibold dark:text-white">
            mejai.kr
          </span>
        </Link>
        <ModeToggle />
      </div>
    </nav>
  );
};
