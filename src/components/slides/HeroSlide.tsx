import HeroCanvas from "@/components/HeroCanvas";

export default function HeroSlide({ onNext }: { onNext: () => void }) {
  return (
    <>
      {/* Large deco numeral */}
      <div className="absolute -bottom-10 right-16 font-serif text-[260px] font-light text-ink/[0.04] leading-none pointer-events-none select-none tracking-tighter">
        01
      </div>

      {/* Right canvas graphic */}
      <div className="absolute right-0 top-0 w-1/2 h-full z-0 pointer-events-none">
        <HeroCanvas className="w-full h-full" />
      </div>

      {/* Hero content */}
      <div className="relative z-[1] flex flex-col justify-end h-full pb-[88px]">
        <div
          className="flex gap-2 mb-6"
          style={{ animation: "fadeUp 0.7s ease both 0.3s" }}
        >
          <span className="inline-block text-[10px] tracking-[0.1em] uppercase px-2.5 py-1 border border-ink/[0.28] rounded-sm text-ink/60 font-normal">
            Online Program
          </span>
          <span className="inline-block text-[10px] tracking-[0.1em] uppercase px-2.5 py-1 border border-ink/[0.28] rounded-sm text-ink/60 font-normal">
            Cohort 01 &middot; Open
          </span>
        </div>
        <div
          className="font-serif text-[clamp(72px,10vw,100px)] font-light leading-none tracking-tight text-ink"
          style={{ animation: "fadeUp 0.8s ease both 0.5s" }}
        >
          0 → Pre-Seed
        </div>
        <div
          className="text-[15px] text-ink-2 mt-4 max-w-[420px] leading-[1.65] font-light"
          style={{ animation: "fadeUp 0.8s ease both 0.7s" }}
        >
          A 6-month online program for founders building their first product and
          raising their first round.
        </div>
        <button
          onClick={onNext}
          className="mt-9 inline-flex items-center gap-2.5 text-[11px] tracking-[0.14em] uppercase bg-ink text-bg py-3 px-7 rounded-sm border-none cursor-pointer font-sans font-normal w-fit transition-opacity hover:opacity-80"
          style={{ animation: "fadeUp 0.8s ease both 0.9s" }}
        >
          Begin <span>→</span>
        </button>
      </div>
    </>
  );
}
