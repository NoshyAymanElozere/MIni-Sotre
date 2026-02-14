import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import QueryProvider from "@/components/providers/QueryProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mini Store",
  description: "A simple e-commerce mini store built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <QueryProvider>
          {children}
        </QueryProvider>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
