import type { Metadata } from "next";
import localFont from "next/font/local";

import "@/styles/globals.css";

import Header from "@/components/layout/Header";

const suit = localFont({
  src: "../../public/fonts/SUIT-Variable.woff2",
  display: "swap",
  style: "normal",
  weight: "45 920",
  variable: "--font-suit",
});

export const metadata: Metadata = {
  title: "CEOS 21th Vote",
  description: "CEOS 21기 투표 서비스",
  robots: "index, follow",
  authors: [{ name: "Sujin" }, { name: "Chaeyoung" }],
  icons: {
    icon: "/svgs/favicon.svg",
  },
  openGraph: {
    title: "CEOS 21th Vote",
    description: "CEOS 21기 활동을 위한 투표 플랫폼입니다.",
    // url: "https://vote-ceos-21th.vercel.app", // 실제 배포 URL로 수정
    siteName: "CEOS Vote",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={suit.className}>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
