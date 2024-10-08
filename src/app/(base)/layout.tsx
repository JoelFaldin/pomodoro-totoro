import Provider from "../providers/SessionProvider";
import localFont from "next/font/local";
import type { Metadata } from "next";

import Navbar from "../components/Navbar";
import "../globals.css";

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

export const metadata: Metadata = {
  title: "Pomodoro Totoro Timer",
  description: "Improve your time management with the Pomodoro Technique!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <link rel="icon" href="/totoro_icon.ico" sizes="any" />
      <div
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>
          <Navbar />
          {children}
        </Provider>
      </div>
    </>
  );
}
