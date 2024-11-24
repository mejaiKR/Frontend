import Image from "next/image";

export default function Home() {
  return (
    <div className="h-46 flex w-full items-center justify-center py-10">
      <Image src="/moving-yumi.gif" alt="banner" width={200} height={300} />
    </div>
  );
}
