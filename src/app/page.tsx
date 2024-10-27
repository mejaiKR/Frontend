import Image from "next/image";

export default function Home() {
  return (
    <div className="h-46 w-full flex justify-center items-center py-10">
      <Image src="/yumi-banner.png" alt="banner" width={200} height={300} />
    </div>
  );
}
