import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { getDictionary } from "./dictionaries";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const funnelDisplay = localFont({
  src: "../fonts/FunnelDisplay-VariableFont_wght.ttf",
  variable: "--font-funnel-display",
  weight: "100 900"
})

export const metadata: Metadata = {
  title: "Landscoper",
  description: "Powered by Gebeta Maps",
};

interface LangParams {
  lang: string;
}

export async function generateStaticParams() {
  return [{ lang: "am" }, { lang: "en" }]
}

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<LangParams>
}>) {
  const { lang } = await params
  const dict = await getDictionary(lang)

  return (
    <html lang={lang}>
      <body
        className={`${funnelDisplay.variable} ${geistMono.variable} antialiased`}
      >
        <div className="">
          <Header dict={dict} />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
