import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { UserNav } from "./components/user-nav";
import { ComboboxDemo } from "./components/command";
import { MainNav } from "./components/main-nav";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Dead Project Snipper",
  description: "Example dashboard app built using the components.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <ComboboxDemo />
              <UserNav />
            </div>
          </div>
        </div>
        </div>

        {children}
      </body>
    </html>
  );
}
