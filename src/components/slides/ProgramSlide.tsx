const PHASES = [
  {
    n: "01",
    name: "Validate",
    desc: "Prove the problem is real before writing a line of code. User interviews, ICP definition, early demand signal.",
    mo: "Month 1",
  },
  {
    n: "02",
    name: "Build",
    desc: "Ship fast using AI tooling. 2-week sprints. Live product with real users by month 3. Feedback loop by month 4.",
    mo: "Month 2\u20134",
  },
  {
    n: "03",
    name: "Raise",
    desc: "Build traction, craft the narrative, sharpen the deck. Exit with outreach running and the skills to close your round.",
    mo: "Month 5\u20136",
  },
];

export default function ProgramSlide() {
  return (
    <>
      {/* Large deco numeral */}
      <div className="absolute -bottom-10 right-16 font-serif text-[260px] font-light text-ink/[0.04] leading-none pointer-events-none select-none tracking-tighter">
        02
      </div>

      <div className="text-[10px] tracking-[0.16em] uppercase text-gold font-normal mb-[18px]">
        The Program
      </div>
      <div className="font-serif text-[42px] font-light leading-none tracking-tight text-ink">
        Three phases. One outcome.
      </div>
      <div className="grid grid-cols-3 gap-5 mt-5">
        {PHASES.map((phase) => (
          <div
            key={phase.n}
            className="p-[22px_20px] border border-border rounded-sm bg-card hover:border-gold transition-colors"
          >
            <div className="font-serif text-[40px] font-light text-ink/10 leading-none mb-3.5">
              {phase.n}
            </div>
            <div className="text-[15px] font-medium text-ink mb-2">
              {phase.name}
            </div>
            <div className="text-sm text-ink-2 leading-[1.75] font-light">
              {phase.desc}
            </div>
            <div className="text-[10px] tracking-[0.12em] uppercase text-gold mt-3">
              {phase.mo}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 text-xs text-ink/30 font-light tracking-wide">
        Fully online &middot; Async-first &middot; 1&ndash;2 founders per cohort &middot; $50K&ndash;$300K pre-seed target
      </div>
    </>
  );
}
