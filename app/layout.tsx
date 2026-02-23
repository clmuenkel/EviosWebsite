import type { Metadata } from "next";
import "./globals.css";
import { Header } from "./components/Header";

export const metadata: Metadata = {
  title: "Evios",
  description:
    "Done-for-you custom software and automation for home service contractors, integrated into your existing tools.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <Header />
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
