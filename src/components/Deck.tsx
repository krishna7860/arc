"use client";

import { useRef, useEffect, useCallback } from "react";
import { useSlides } from "@/hooks/useSlides";
import ArcLogo from "@/components/ArcLogo";
import HeroSlide from "@/components/slides/HeroSlide";
import VisionSlide from "@/components/slides/VisionSlide";
import WhoSlide from "@/components/slides/WhoSlide";
import ProgramSlide from "@/components/slides/ProgramSlide";
import JourneySlide from "@/components/slides/JourneySlide";
import GetSlide from "@/components/slides/GetSlide";
import DealSlide from "@/components/slides/DealSlide";
import ApplySlide from "@/components/slides/ApplySlide";

const SLIDE_TITLES = [
  "Hero",
  "Vision",
  "Who",
  "Program",
  "Journey",
  "What You Get",
  "Deal",
  "Apply",
];

// Slides that need dot-grid background
const DOT_GRID_SLIDES = new Set([2, 3, 4, 5, 6]);
// Slides with no padding (custom layout)
const NO_PADDING_SLIDES = new Set([1, 7]);

export default function Deck() {
  const { current, goTo, next, prev, progress, counter, total } = useSlides(8);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);

  const setSlideRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      slidesRef.current[index] = el;
    },
    []
  );

  useEffect(() => {
    const handler = (e: Event) => {
      const { from, to, direction } = (e as CustomEvent).detail;
      const outSlide = slidesRef.current[from];
      const inSlide = slidesRef.current[to];
      if (!outSlide || !inSlide) return;

      inSlide.style.transition = "none";
      inSlide.style.opacity = "0";
      inSlide.style.transform = `translateY(${direction * 20}px)`;
      inSlide.style.pointerEvents = "none";

      outSlide.classList.add("leaving");
      outSlide.style.opacity = "0";
      outSlide.style.transform = `translateY(${direction * -12}px)`;

      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          inSlide.classList.add("entering");
          inSlide.style.opacity = "1";
          inSlide.style.transform = "translateY(0)";

          setTimeout(() => {
            outSlide.classList.remove("active", "leaving");
            outSlide.style.opacity = "";
            outSlide.style.transform = "";

            inSlide.classList.add("active");
            inSlide.classList.remove("entering");
            inSlide.style.opacity = "";
            inSlide.style.transform = "";
            inSlide.style.transition = "";
            inSlide.style.pointerEvents = "";
          }, 560);
        })
      );
    };

    window.addEventListener("slide-transition", handler);
    return () => window.removeEventListener("slide-transition", handler);
  }, []);

  useEffect(() => {
    slidesRef.current.forEach((slide, i) => {
      if (slide) {
        slide.classList.toggle("active", i === 0);
      }
    });
  }, []);

  const slides = [
    <HeroSlide key="hero" onNext={next} />,
    <VisionSlide key="vision" />,
    <WhoSlide key="who" />,
    <ProgramSlide key="program" />,
    <JourneySlide key="journey" />,
    <GetSlide key="get" />,
    <DealSlide key="deal" />,
    <ApplySlide key="apply" />,
  ];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-bg">
      {/* Progress bar */}
      <div
        className="absolute top-0 left-0 h-px bg-gold z-[100] transition-[width] duration-600"
        style={{
          width: `${progress}%`,
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />

      {/* Logo — hides on Vision slide */}
      <ArcLogo
        className="absolute top-7 left-16 z-[100] pointer-events-none transition-opacity duration-300"
        style={{ opacity: current === 1 ? 0 : 1 }}
      />

      {/* Slides */}
      {slides.map((slideContent, i) => (
        <div
          key={i}
          ref={setSlideRef(i)}
          className={`slide overflow-hidden ${
            DOT_GRID_SLIDES.has(i) ? "dot-grid-bg" : ""
          } ${NO_PADDING_SLIDES.has(i) ? "!p-0 !justify-stretch" : ""}`}
        >
          {slideContent}
        </div>
      ))}

      {/* Nav dots */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-[9px] z-[100]">
        {SLIDE_TITLES.map((title, i) => (
          <div
            key={title}
            onClick={() => goTo(i)}
            title={title}
            className={`w-1 h-1 rounded-full cursor-pointer transition-all duration-300 ${
              i === current
                ? "bg-gold scale-[1.6]"
                : "bg-ink/[0.18] hover:bg-ink/30"
            }`}
          />
        ))}
      </div>

      {/* Counter */}
      <div className="absolute bottom-6 left-[72px] text-[10.5px] tracking-[0.1em] text-ink/25 z-[100] font-light">
        {counter}
      </div>

      {/* Arrows */}
      <div className="absolute bottom-[18px] right-[72px] flex gap-2.5 z-[100]">
        <button
          onClick={prev}
          disabled={current === 0}
          className="w-[34px] h-[34px] rounded-full border border-border bg-transparent flex items-center justify-center text-sm text-ink-2 transition-all hover:bg-ink/5 hover:border-ink/20 disabled:opacity-20 disabled:cursor-default cursor-pointer"
        >
          ←
        </button>
        <button
          onClick={next}
          disabled={current === total - 1}
          className="w-[34px] h-[34px] rounded-full border border-border bg-transparent flex items-center justify-center text-sm text-ink-2 transition-all hover:bg-ink/5 hover:border-ink/20 disabled:opacity-20 disabled:cursor-default cursor-pointer"
        >
          →
        </button>
      </div>
    </div>
  );
}
