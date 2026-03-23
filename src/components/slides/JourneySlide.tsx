const ROWS = [
  {
    mo: "Month 1",
    phase: "Validate",
    desc: "20+ user interviews · ICP defined · 25–50 waitlist signups · competitive landscape mapped",
    gate: "Gate: Proven problem + real user pull",
  },
  {
    mo: "Month 2–4",
    phase: "Build",
    desc: "v1 live by month 3 · 10+ beta users · weekly async Loom reviews · AI tool stack unlocked",
    gate: "Gate: Live product + returning users",
  },
  {
    mo: "Month 5",
    phase: "Traction",
    desc: "First revenue or D30 retention · one north star metric · growth loop identified",
    gate: "Gate: Traction story in 2 sentences",
  },
  {
    mo: "Month 6",
    phase: "Raise",
    desc: "Deck done · outreach running · intros facilitated · mock Q&A pressure tested · demo day",
    gate: "Exit: Investor-ready and in market",
  },
];

export default function JourneySlide() {
  return (
    <>
      <div className="text-[12px] tracking-[0.14em] uppercase text-gold font-medium mb-[18px]">
        The Journey
      </div>
      <div className="font-serif text-[36px] font-light leading-none tracking-tight text-ink">
        Month by month.
      </div>
      <div className="mt-3">
        {ROWS.map((row, i) => (
          <div
            key={row.phase}
            className={`grid grid-cols-[90px_1fr_1fr] gap-5 py-[13px] border-t border-border items-start ${
              i === ROWS.length - 1 ? "border-b border-b-border" : ""
            }`}
          >
            <div className="text-[12px] tracking-[0.1em] uppercase text-gold font-medium pt-[3px]">
              {row.mo}
            </div>
            <div>
              <div className="text-[15px] font-medium text-ink mb-1">
                {row.phase}
              </div>
              <div className="text-[13.5px] text-ink-2 font-light leading-[1.7]">
                {row.desc}
              </div>
            </div>
            <div className="text-[12.5px] text-ink/35 italic leading-[1.6] text-right pt-[3px]">
              {row.gate}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
