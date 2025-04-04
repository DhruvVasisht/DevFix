import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";

// Configure Open Sans
const font = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevFixx",
  description: "Created By Dhruv Vasisht",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
