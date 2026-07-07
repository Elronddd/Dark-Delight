import type { Metadata } from "next";
import { Unbounded } from "next/font/google";
import { MotionConfig } from "framer-motion";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScrollProvider from "@/lib/scroll/SmoothScrollProvider";
import { getRestaurantJsonLd } from "@/lib/seo/jsonld";
import CustomCursor from "@/components/ui/CustomCursor";
import { SPRING_CURSOR_RING } from "@/lib/animations/transitions";

const unbounded = Unbounded({
  subsets: ["latin"],
  variable: "--font-unbounded",
  weight: ["400", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://darkdelight-3d.example"),
  title: "Dark Delight — Restaurant & Cafe | Patna",
  description:
    "A rich pour, a slower evening — coffee and comfort food in the heart of Patna. Steeped in warmth.",
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
      <body className={`${unbounded.variable} font-sans antialiased bg-ink text-cream`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-rose focus:px-4 focus:py-2 focus:text-cream"
        >
          Skip to content
        </a>
        <MotionConfig transition={SPRING_CURSOR_RING} reducedMotion="user">
          <CustomCursor />
          <SmoothScrollProvider>
            <Navbar />
            <div id="main-content">{children}</div>
            <Footer />
          </SmoothScrollProvider>
        </MotionConfig>
      </body>
    </html>
  );
}
