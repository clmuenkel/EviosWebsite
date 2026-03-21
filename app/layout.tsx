import type { Metadata } from "next";
import "./globals.css";
import { Header } from "./components/Header";
import { MeshBackground } from "./components/MeshBackground";

export const metadata: Metadata = {
  title: "Evios",
  description:
    "Done-for-you custom software and automation for home service contractors, integrated into your existing tools.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <MeshBackground />
        <Header />
        <main className="relative z-[1] pt-16">{children}</main>
      </body>
    </html>
  );
}
