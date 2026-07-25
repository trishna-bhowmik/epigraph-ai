import type { Metadata } from "next";
import localFont from "next/font/local";
import { Geist } from "next/font/google";
import { Toaster } from "sonner";

import "./globals.css";

import { QueryProvider } from "@/components/providers/QueryProvider";
import { AuthProvider } from "@/contexts/AuthContext";

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
  title: "EpiGraph AI | Epidemic Intelligence",
  description: "Model, predict, and explain disease spread with graph AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
