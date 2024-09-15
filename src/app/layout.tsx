import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import KakaoProvider from "@/app/kakao-provider";
import Nav from "@/app/nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nextjs Kakao Login",
  description: "Kakao Login with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <KakaoProvider>
          <Nav />
          {children}
        </KakaoProvider>
      </body>
    </html>
  );
}
