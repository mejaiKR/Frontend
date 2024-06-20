import MainSearchBar from "@/app/_component/mainSearchBar";
import dynamic from "next/dynamic";

const LocalStatusBox = dynamic(
  () => import("@/app/_component/localStatusBox"),
  {
    ssr: false,
  },
);

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <h1 className="mt-28 mb-28 font-[GMARKET-Bold] text-5xl font-extrabold tracking-tight lg:text-7xl">
        mejai.kr
      </h1>
      <MainSearchBar />
      <LocalStatusBox />
    </div>
  );
}
