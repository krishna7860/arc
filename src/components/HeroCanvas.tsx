"use client";

export default function HeroCanvas({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center pointer-events-none ${className}`}>
      <svg
        width="420"
        height="420"
        viewBox="0 0 340 340"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Border */}
        <rect
          x="1"
          y="1"
          width="338"
          height="338"
          rx="4"
          fill="none"
          stroke="rgba(139,99,56,0.4)"
          strokeWidth="1"
        />

        {/* Dot grid */}
        <g opacity="0.55">
          {Array.from({ length: 9 }, (_, row) =>
            Array.from({ length: 9 }, (_, col) => (
              <circle
                key={`${row}-${col}`}
                cx={34 + col * 34}
                cy={34 + row * 34}
                r="1.5"
                fill="#B8935A"
              />
            ))
          )}
        </g>

        {/* Axes */}
        <line
          x1="34"
          y1="306"
          x2="306"
          y2="306"
          stroke="rgba(139,99,56,0.55)"
          strokeWidth="0.8"
        />
        <line
          x1="34"
          y1="306"
          x2="34"
          y2="34"
          stroke="rgba(139,99,56,0.55)"
          strokeWidth="0.8"
        />

        {/* Growth curve - animated */}
        <path
          d="M 34 306 C 80 275, 140 215, 200 155 C 245 110, 275 65, 306 34"
          fill="none"
          stroke="#7A5530"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeDasharray="520"
          strokeDashoffset="520"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="520"
            to="0"
            dur="2.4s"
            begin="0.5s"
            fill="freeze"
            calcMode="spline"
            keySplines="0.4 0 0.2 1"
          />
        </path>

        {/* Point: 0 (origin) */}
        <g opacity="0">
          <circle cx="34" cy="306" r="4.5" fill="#7A5530" />
          <circle
            cx="34"
            cy="306"
            r="10"
            fill="none"
            stroke="#7A5530"
            strokeWidth="0.8"
            opacity="0.5"
          />
          <text
            x="46"
            y="322"
            fontFamily="'DM Sans', sans-serif"
            fontSize="10"
            fill="#7A5530"
            letterSpacing="0.1em"
            fontWeight="500"
          >
            0
          </text>
          <animate
            attributeName="opacity"
            from="0"
            to="1"
            dur="0.3s"
            begin="0.6s"
            fill="freeze"
          />
        </g>

        {/* Point: MVP */}
        <g opacity="0">
          <circle cx="200" cy="155" r="4" fill="#7A5530" />
          <circle
            cx="200"
            cy="155"
            r="9"
            fill="none"
            stroke="#7A5530"
            strokeWidth="0.8"
            opacity="0.4"
          />
          <text
            x="212"
            y="151"
            fontFamily="'DM Sans', sans-serif"
            fontSize="10"
            fill="#7A5530"
            letterSpacing="0.08em"
            fontWeight="500"
          >
            MVP
          </text>
          <animate
            attributeName="opacity"
            from="0"
            to="1"
            dur="0.3s"
            begin="1.8s"
            fill="freeze"
          />
        </g>

        {/* Point: Pre-Seed */}
        <g opacity="0">
          <circle cx="306" cy="34" r="5" fill="#7A5530" />
          <circle
            cx="306"
            cy="34"
            r="13"
            fill="none"
            stroke="#7A5530"
            strokeWidth="0.8"
            opacity="0.35"
          >
            <animate
              attributeName="r"
              values="13;19;13"
              dur="2.5s"
              begin="3s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.35;0.08;0.35"
              dur="2.5s"
              begin="3s"
              repeatCount="indefinite"
            />
          </circle>
          <text
            x="306"
            y="20"
            textAnchor="middle"
            fontFamily="'DM Sans', sans-serif"
            fontSize="10"
            fill="#7A5530"
            letterSpacing="0.08em"
            fontWeight="500"
          >
            Pre-Seed
          </text>
          <animate
            attributeName="opacity"
            from="0"
            to="1"
            dur="0.3s"
            begin="2.8s"
            fill="freeze"
          />
        </g>

        {/* Axis labels */}
        <text
          x="170"
          y="328"
          textAnchor="middle"
          fontFamily="'DM Sans', sans-serif"
          fontSize="9"
          fill="rgba(122,85,48,0.65)"
          letterSpacing="0.12em"
        >
          TIME
        </text>
        <text
          x="16"
          y="170"
          textAnchor="middle"
          fontFamily="'DM Sans', sans-serif"
          fontSize="9"
          fill="rgba(122,85,48,0.65)"
          letterSpacing="0.12em"
          transform="rotate(-90, 16, 170)"
        >
          GROWTH
        </text>
      </svg>
    </div>
  );
}
