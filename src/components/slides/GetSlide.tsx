const CARDS = [
  {
    amt: "$500",
    unit: "/mo",
    lbl: "Cash · monthly",
    items: [
      "Paid every month for 6 months",
      "No strings, founder's discretion",
      "Runway, spend, whatever you need",
    ],
  },
  {
    amt: "$300",
    unit: "/mo",
    lbl: "AI Tool Stack",
    items: [
      "Claude Pro + API credits",
      "Cursor or Windsurf IDE",
      "v0 + Vercel + Railway",
      "Notion AI + Linear",
    ],
  },
  {
    amt: "$200",
    unit: "/mo",
    lbl: "Infra & Cloud",
    items: [
      "AWS / GCP / Vercel credits",
      "Database hosting covered",
      "Scales with your usage",
    ],
  },
];

export default function GetSlide() {
  return (
    <>
      <div className="text-[12px] tracking-[0.14em] uppercase text-gold font-medium mb-[18px]">
        What You Get
      </div>
      <div className="font-serif text-[42px] font-light leading-none tracking-tight text-ink">
        Capital. Tools. Guidance.
      </div>
      <div className="grid grid-cols-3 gap-5 mt-5">
        {CARDS.map((card) => (
          <div
            key={card.lbl}
            className="p-[22px_20px] border border-border rounded-sm bg-card"
          >
            <div className="font-serif text-[38px] font-light text-ink leading-none">
              {card.amt}
              <span className="text-sm">{card.unit}</span>
            </div>
            <div className="text-[11px] tracking-[0.1em] uppercase text-gold font-medium my-2 mb-3.5">
              {card.lbl}
            </div>
            <ul className="list-none">
              {card.items.map((item) => (
                <li
                  key={item}
                  className="text-sm text-ink-2 font-light leading-[1.75] flex gap-[7px]"
                >
                  <span className="text-ink/20 text-xs flex-shrink-0 mt-px">
                    —
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-baseline gap-7 flex-wrap">
        <div className="font-serif text-[28px] font-light text-ink">
          $6,000{" "}
          <span className="text-sm text-ink-2 font-sans font-light">
            total per founder &middot; solo cohort
          </span>
        </div>
        <div className="text-[11px] text-ink/30 italic">
          $1,000/mo &times; 6 months &middot; 1&ndash;2 founders per cohort
        </div>
      </div>
    </>
  );
}
