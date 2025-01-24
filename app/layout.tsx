"use client";

// import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { StyledEngineProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import AppTheme from "./theme/AppTheme";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// TODO: adjust this to be able to use metadata here removing the "use client" statement
//          the use client is being used because of the material ui theme setup
// export const metadata: Metadata = {
//   title: "Next.js Library System",
//   description: "Generated using create next app and maintained by Larissa Farias",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AppTheme>
          <StyledEngineProvider injectFirst>
            <CssBaseline enableColorScheme />
            {children}
          </StyledEngineProvider>
        </AppTheme>
      </body>
    </html>
  );
}
