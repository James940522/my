import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReactQueryProvider } from "../shared/providers/ReactQueryProvider";
import { ModalRegistry } from "../shared/providers/ModalRegistry";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Todo 애플리케이션",
  description: "비동기 Todo 애플리케이션 데모",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <ReactQueryProvider>
            {children}
            <ModalRegistry />
          </ReactQueryProvider>
        </Providers>
      </body>
    </html>
  );
}
