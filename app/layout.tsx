import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CleanFlow - Modern Cleaning Business Management",
  description: "The all-in-one platform for scheduling, managing, and growing your cleaning service.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
