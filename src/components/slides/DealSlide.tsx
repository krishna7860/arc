const DEAL_NUMS = [
  { num: "2\u20135%", lbl: "equity via SAFE" },
  { num: "Pro-rata", lbl: "in seed round" },
  { num: "$500/mo", lbl: "cash monthly", sub: true },
  { num: "$6,000", lbl: "total cash \u00b7 6mo" },
];

const CAN = [
  "Teach you to run a fundraise yourself",
  "Review every iteration of your deck",
  "Facilitate intros where our network fits",
  "Pressure-test your pitch with mock Q&A",
];

const CANNOT = [
  "Guarantee an investor meeting",
  "Close a round by demo day",
  "Replace your own hustle in outreach",
];

export default function DealSlide() {
  return (
    <>
      {/* Decorative quarter arcs bottom-left */}
      <svg
        className="absolute bottom-0 left-0 w-[320px] h-[320px] pointer-events-none opacity-45"
        viewBox="0 0 320 320"
      >
        <circle cx="0" cy="320" r="220" fill="none" stroke="#8B6338" strokeWidth="0.5" />
        <circle cx="0" cy="320" r="160" fill="none" stroke="#8B6338" strokeWidth="0.5" opacity="0.6" />
        <circle cx="0" cy="320" r="100" fill="none" stroke="#8B6338" strokeWidth="0.5" opacity="0.4" />
      </svg>

      <div className="text-[12px] tracking-[0.14em] uppercase text-gold font-medium mb-[18px]">
        The Deal
      </div>
      <div className="grid grid-cols-[1fr_1.1fr] gap-16 items-start mt-2">
        <div>
          <div className="font-serif text-[36px] font-light leading-none tracking-tight text-ink">
            Fair terms.
          </div>
          <div className="w-7 h-px bg-gold my-5" />
          <div className="text-[13px] text-ink-2 leading-[1.85] font-light">
            2&ndash;5% equity via SAFE note, priced against total value delivered
            &mdash; $500/mo cash, $300/mo in AI tooling, and $200/mo in infra
            credits. $1,000 every month for 6 months. You keep full control of your
            company.
          </div>
          <div className="grid grid-cols-2 gap-4 mt-5">
            {DEAL_NUMS.map((d) => (
              <div
                key={d.lbl}
                className="p-4 border border-border rounded-sm text-center bg-card"
              >
                <div className="font-serif text-[30px] font-light text-ink leading-none">
                  {d.sub ? (
                    <>
                      $500<span className="text-[15px]">/mo</span>
                    </>
                  ) : (
                    d.num
                  )}
                </div>
                <div className="text-[11px] tracking-[0.08em] uppercase text-ink/40 mt-1.5">
                  {d.lbl}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="text-[12px] tracking-[0.12em] uppercase text-gold font-medium mb-2.5">
            What we can and cannot do
          </div>
          <ul className="list-none">
            {CAN.map((item) => (
              <li
                key={item}
                className="text-sm text-ink-2 font-light leading-[1.65] py-[7px] border-b border-border flex gap-2.5 items-start"
              >
                <span className="text-[#7AAE55] text-[11px] flex-shrink-0 mt-0.5">
                  ✓
                </span>
                {item}
              </li>
            ))}
            {CANNOT.map((item, i) => (
              <li
                key={item}
                className={`text-sm text-ink-2 font-light leading-[1.65] py-[7px] flex gap-2.5 items-start ${
                  i < CANNOT.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <span className="text-[#B07A65] text-[11px] flex-shrink-0 mt-0.5">
                  —
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
