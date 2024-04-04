import MainSearchBar from "@/app/mainSearchBar";

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <h1 className="mt-36 mb-28 font-[GMARKET-Bold] scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-7xl">
        mejai.gg
      </h1>
      <MainSearchBar />
    </div>
  );
}
