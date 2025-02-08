import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AppTheme from "./theme/AppTheme";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.js Library System",
  description:
    "Generated using create next app and maintained by Larissa Farias",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AppTheme>{children}</AppTheme>
      </body>
    </html>
  );
}
