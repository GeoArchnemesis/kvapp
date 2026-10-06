import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Kvapp",
  description:
    "ხელოვნური ინტელექტით შექმნილი კვების გეგმები, ნამდვილი ქართველი დიეტოლოგები და თქვენი სავარჯიშო დარბაზი — ყველაფერი ერთად.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ka" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
