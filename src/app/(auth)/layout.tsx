import { Metadata } from "next";
import { Toaster } from "sonner";

import localFont from "next/font/local";
import "../globals.css"
import Provider from "../providers/SessionProvider";

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
  title: "Login | Pomodoro Totoro Timer",
  description: "Create an account and log in to unlock special functionalities"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <link rel="icon" href="/totoro_icon.ico" sizes="any" />
      <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Provider>
          <main>
            <Toaster richColors position="bottom-center" />
            {children}
          </main>
        </Provider>
      </div>
    </>
  )
}