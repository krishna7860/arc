export default function ArcLogo({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div className={className} style={style}>
      <svg
        width="180"
        height="60"
        viewBox="0 0 180 60"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="1"
          y="1"
          width="58"
          height="58"
          rx="5"
          fill="none"
          stroke="#111110"
          strokeWidth="0.9"
        />
        <path
          d="M 12 44 C 22 26, 33 14, 46 8"
          fill="none"
          stroke="#8B6338"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <circle cx="46" cy="8" r="3.5" fill="#8B6338" />
        <text
          x="72"
          y="34"
          fontFamily="Georgia, 'Times New Roman', serif"
          fontSize="28"
          fontWeight="400"
          fill="#111110"
          letterSpacing="0.04em"
        >
          Arc
        </text>
        <text
          x="73"
          y="50"
          fontFamily="'DM Sans', sans-serif"
          fontSize="11"
          fill="#8B6338"
          letterSpacing="0.18em"
          fontWeight="400"
        >
          · 01
        </text>
      </svg>
    </div>
  );
}
