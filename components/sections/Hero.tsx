import Link from "next/link";
import ShinyButton from "@/components/ui/ShinyButton";
import NeonButton from "@/components/ui/NeonButton";
import HeroCanvasLoader from "./HeroCanvasLoader";
import SplitHeading from "@/components/ui/SplitHeading";
import { business } from "@/content/business";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-ink">
      <div aria-hidden className="absolute inset-0">
        <HeroCanvasLoader />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-32 md:px-10">
        <div className="max-w-xl">
          <p className="eyebrow enter-fade-up mb-5" style={{ animationDelay: "0.05s" }}>
            Patna · Bihar
          </p>
          <SplitHeading
            as="h1"
            trigger="mount"
            delay={0.15}
            className="font-display text-6xl leading-[1.05] text-cream md:text-7xl"
            text={business.heroLine}
          />
          <p
            className="enter-fade-up mt-6 max-w-md text-lg leading-relaxed text-cream/70"
            style={{ animationDelay: "0.7s" }}
          >
            {business.storyLine}
          </p>

          <div className="enter-fade-up mt-10 flex flex-wrap items-center gap-4" style={{ animationDelay: "0.9s" }}>
            <Link href="/reservations">
              <ShinyButton>Reserve a Table</ShinyButton>
            </Link>
            <Link href="/menu">
              <NeonButton>View Menu</NeonButton>
            </Link>
          </div>
        </div>
      </div>

      <div
        className="enter-fade-up absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-center"
        style={{ animationDelay: "1.1s" }}
      >
        <p className="eyebrow animate-pulse">Scroll to Explore</p>
      </div>
    </section>
  );
}
