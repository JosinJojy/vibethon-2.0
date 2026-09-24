import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "VIBETHON 2.0 | ENCIDE, MACE",
  description: "VIBETHON 2.0 is an 8-hour, on-site vibe coding hackathon organized by ENCIDE at Mar Athanasius College of Engineering, Kothamangalam. Build with modern AI tools while demonstrating your own technical understanding, originality, problem-solving and product decisions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${inter.variable} antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground selection:bg-accent-red selection:text-white">
        {children}
      </body>
    </html>
  );
}
