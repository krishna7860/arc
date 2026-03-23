import Image from "next/image";

export default function VisionSlide() {
  return (
    <div className="grid grid-cols-2 h-full">
      {/* Left half: full-bleed photo */}
      <div className="relative overflow-hidden">
        {/* Bottom dissolve */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[140px] z-[3] pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(246,244,239,0.6))",
          }}
        />
        {/* Right edge dissolve */}
        <div
          className="absolute top-0 right-0 bottom-0 w-[80px] z-[3] pointer-events-none"
          style={{
            background: "linear-gradient(to right, transparent, var(--bg))",
          }}
        />
        {/* Gold corner bracket */}
        <div className="absolute top-12 left-12 w-7 h-px z-[5] pointer-events-none bg-[rgba(139,99,56,0.9)]" />
        <div className="absolute top-12 left-12 w-px h-7 z-[5] pointer-events-none bg-[rgba(139,99,56,0.9)]" />

        <Image
          src="/krishna.jpg"
          alt="Krishna Sharma"
          fill
          className="object-cover animate-photo-reveal"
          style={{
            objectPosition: "30% 35%",
            filter: "sepia(0.12) contrast(0.97) brightness(0.97)",
          }}
          sizes="50vw"
          priority
        />
      </div>

      {/* Right half: content */}
      <div className="flex flex-col justify-center px-16 py-16 pl-14 relative">
        <div className="text-[10px] tracking-[0.16em] uppercase text-gold font-normal mb-8">
          Vision
        </div>

        {/* Big banner quote */}
        <div className="font-serif font-light text-[clamp(36px,3.8vw,52px)] leading-[1.15] tracking-tight text-ink mb-7">
          India has an
          <br />
          <em className="text-gold">extraordinary</em>
          <br />
          generation of
          <br />
          student builders.
        </div>

        <div className="w-7 h-px bg-gold mb-6" />

        {/* Body */}
        <div className="flex flex-col gap-4">
          <p className="text-[15px] text-ink-2 leading-[1.85] font-light">
            I&rsquo;m starting my journey as an angel investor — not with a fund,
            not with a thesis, just with genuine conviction that the right founders
            need more than money.
          </p>
          <p className="text-[15px] text-ink-2 leading-[1.85] font-light">
            The technical depth is real. The hunger is real. What&rsquo;s missing is
            access — to someone who&rsquo;s been in the weeds, who will sit with
            you on your idea, tell you the hard truth, and stay with you every step
            of the way.
          </p>
          <p className="text-[15px] text-ink-2 leading-[1.85] font-light">
            Not a mentor at arm&rsquo;s length. More like a brother who&rsquo;s built
            in Web3, AI, and SaaS — and wants to give you a real head start.
          </p>
        </div>

        {/* Attribution */}
        <div className="mt-7 text-[12.5px] text-ink/[0.38] tracking-[0.04em]">
          — Krishna Sharma &middot; 6 years building in Web3, AI &amp; SaaS &middot;{" "}
          <a
            href="https://x.com/0xkrishnaa"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold no-underline"
          >
            @0xkrishnaa
          </a>
        </div>

        {/* Support CTA */}
        <div className="mt-5">
          <a
            href="mailto:rohansharma.8574@gmail.com?subject=Supporting the Vision"
            className="inline-flex items-center gap-2.5 py-2.5 px-5 border border-gold/55 rounded-sm bg-gold/10 transition-all hover:bg-gold/[0.16] hover:border-gold"
          >
            <span className="text-[10px] tracking-[0.14em] uppercase text-gold font-normal">
              Want to support the vision?
            </span>
            <span className="text-xs text-gold">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}
