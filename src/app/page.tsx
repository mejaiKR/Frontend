import MainSearchBar from "@/app/mainSearchBar";

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <h1 className="mt-28 font-[GMARKET-Bold] scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-7xl mb-6">
        mejai.gg
      </h1>
      <blockquote className="text-xl italic font-semibold text-gray-900 dark:text-white mb-6">
        {/*<p>슈우웃</p>*/}
      </blockquote>
      <MainSearchBar />
    </div>
  );
}
