import type { Metadata } from "next";
import localFont from "next/font/local";
import { Geist } from "next/font/google";
import { Toaster } from "sonner";

import "./globals.css";

import { QueryProvider } from "@/components/providers/query-provider";
import { cn } from "@/lib/utils";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "AI Mock Interview Platform",
  description: "Practice AI-powered interviews",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "font-sans",
        geist.variable,
        geistSans.variable,
        geistMono.variable
      )}
    >
      <body>
        <QueryProvider>
          {children}

          <Toaster
            position="top-right"
            richColors
            closeButton
          />
        </QueryProvider>
      </body>
    </html>
  );
}