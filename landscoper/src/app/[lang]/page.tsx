import Hero from "@/components/hero";
import PropertyList from "@/components/property-list";
import Image from "next/image";
import { getDictionary } from "./dictionaries";

interface HomeProp {
  params: Promise<{
    lang: string
  }>
}

export default async function Home({ params }: HomeProp) {
  const { lang } = await params;
  const dict = await getDictionary(lang)
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-funnel-display)]">
      <main className="flex flex-col gap-10 row-start-2 items-center sm:items-start">
        <Hero dict={dict} />
        <Image
          className=""
          src="/images/landscoper-logo-v2.svg"
          alt="Landscoper logo"
          width={180}
          height={38}
          priority
        />
        <PropertyList />
      </main>
    </div>
  );
}
