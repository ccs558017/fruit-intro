import type { Metadata, Viewport } from "next";
import { Noto_Serif_TC, Noto_Sans_TC } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LuckyDraw from "@/components/LuckyDraw";
import NamePrompt from "@/components/NamePrompt";

const notoSerif = Noto_Serif_TC({
  variable: "--font-noto-serif",
  weight: ["500", "900"],
  preload: false,
});

const notoSans = Noto_Sans_TC({
  variable: "--font-noto-sans",
  weight: ["400", "500", "700"],
  preload: false,
});

export const metadata: Metadata = {
  title: "台灣水果誌",
  description: "認識台灣四季的在地水果",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-Hant"
      className={`${notoSerif.variable} ${notoSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <LuckyDraw />
        <NamePrompt />
      </body>
    </html>
  );
}
