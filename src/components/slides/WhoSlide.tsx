const WHO_ITEMS = [
  {
    name: "Student founders",
    desc: "You\u2019re in college or just out. You have an idea and the drive to build it. You need structure, tools, and someone to pressure-test your thinking.",
  },
  {
    name: "First-time builders",
    desc: "You can ship code but have never taken something from 0 to users to revenue. You want to learn the full loop \u2014 not just the technical side.",
  },
  {
    name: "Domain obsessed",
    desc: "You\u2019re solving a problem you actually have or deeply understand. Not chasing trends. Not doing \u201cAI startup\u201d because it\u2019s hot.",
  },
  {
    name: "Coachable",
    desc: "You can take honest feedback. You\u2019d rather hear what\u2019s wrong early than find out from the market six months later.",
  },
];

export default function WhoSlide() {
  return (
    <>
      {/* Decorative quarter arcs */}
      <svg
        className="absolute top-0 right-0 w-[300px] h-[300px] pointer-events-none opacity-50"
        viewBox="0 0 300 300"
      >
        <circle cx="300" cy="0" r="200" fill="none" stroke="#8B6338" strokeWidth="0.5" />
        <circle cx="300" cy="0" r="150" fill="none" stroke="#8B6338" strokeWidth="0.5" opacity="0.6" />
        <circle cx="300" cy="0" r="100" fill="none" stroke="#8B6338" strokeWidth="0.5" opacity="0.4" />
      </svg>

      <div className="text-[12px] tracking-[0.14em] uppercase text-gold font-medium mb-[18px]">
        Who this is for
      </div>
      <div className="font-serif text-[42px] font-light leading-none tracking-tight text-ink">
        Builders at the beginning.
      </div>
      <div className="w-7 h-px bg-gold my-5" />
      <div className="grid grid-cols-2 mt-1.5">
        {WHO_ITEMS.map((item, i) => (
          <div
            key={item.name}
            className={`py-5 border-t border-border ${
              i % 2 === 0 ? "pr-10" : "pl-10 border-l border-l-border"
            }`}
          >
            <div className="text-sm font-medium text-ink mb-1.5">
              {item.name}
            </div>
            <div className="text-sm text-ink-2 leading-[1.8] font-light">
              {item.desc}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
