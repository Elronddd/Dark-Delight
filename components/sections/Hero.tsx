import Link from "next/link";
import ShinyButton from "@/components/ui/ShinyButton";
import NeonButton from "@/components/ui/NeonButton";
import HeroCanvasLoader from "./HeroCanvasLoader";
import { business } from "@/content/business";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-ink">
      <div aria-hidden className="absolute inset-0">
        <HeroCanvasLoader />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-32 md:px-10">
        <div className="max-w-xl">
          <p className="eyebrow mb-5">Patna · Bihar</p>
          <h1 className="font-display text-6xl leading-[1.05] text-cream md:text-7xl">
            {business.heroLine}
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-cream/70">
            {business.storyLine}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link href="/reservations">
              <ShinyButton>Reserve a Table</ShinyButton>
            </Link>
            <Link href="/menu">
              <NeonButton>View Menu</NeonButton>
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-center">
        <p className="eyebrow animate-pulse">Scroll to Explore</p>
      </div>
    </section>
  );
}
