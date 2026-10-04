import type { Metadata } from "next";
import { Anton, Courier_Prime, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const anton = Anton({
  weight: "400",
  variable: "--font-anton",
  subsets: ["latin"],
  display: "swap",
});

const courierPrime = Courier_Prime({
  weight: ["400", "700"],
  variable: "--font-courier",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  style: ["italic"],
  variable: "--font-playfair",
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
  keywords: [
    "VIBETHON",
    "VIBETHON 2.0",
    "ENCIDE",
    "VIBETHON MACE",
    "VIBETHON ENCIDE",
    "MACE",
    "Mar Athanasius College of Engineering",
    "Hackathon",
    "Coding",
    "Vibe Coding",
    "AI",
    "Artificial Intelligence",
    "Tech Event",
    "Kerala Hackathon",
    "Kothamangalam"
  ],
  authors: [{ name: "ENCIDE", url: "https://www.encide.in" }],
  creator: "ENCIDE",
  publisher: "ENCIDE",
  openGraph: {
    title: "VIBETHON 2.0 | ENCIDE, MACE",
    description: "Join VIBETHON 2.0, an 8-hour on-site vibe coding hackathon organized by ENCIDE at Mar Athanasius College of Engineering, Kothamangalam. Build with modern AI tools.",
    url: "https://www.encide.in",
    siteName: "VIBETHON 2.0",
    images: [
      {
        url: "/brand/encide-logo.webp",
        width: 1200,
        height: 630,
        alt: "VIBETHON 2.0 by ENCIDE",
      }
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VIBETHON 2.0 | ENCIDE, MACE",
    description: "Join VIBETHON 2.0, an 8-hour on-site vibe coding hackathon organized by ENCIDE at Mar Athanasius College of Engineering.",
    images: ["/brand/encide-logo.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${courierPrime.variable} ${playfair.variable} ${inter.variable} antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground selection:bg-accent-red selection:text-white">
        <a href="#hero" className="absolute top-0 left-0 -translate-y-full focus:translate-y-0 bg-accent-red text-white px-4 py-2 z-[100] transition-transform">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
