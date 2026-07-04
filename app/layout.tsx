import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScrollProvider from "@/lib/scroll/SmoothScrollProvider";
import { getRestaurantJsonLd } from "@/lib/seo/jsonld";
import CustomCursor from "@/components/ui/CustomCursor";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://darkdelight.example"),
  title: "Dark Delight — Restaurant & Cafe | Patna",
  description:
    "A cosy corner for coffee, comfort food & good company in Anandpuri, Patna. Life begins after flavour.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getRestaurantJsonLd()) }}
        />
      </head>
      <body
        className={`${fraunces.variable} ${inter.variable} font-sans antialiased bg-ink text-cream`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-ember focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        <CustomCursor />
        <SmoothScrollProvider>
          <Navbar />
          <div id="main-content">{children}</div>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
