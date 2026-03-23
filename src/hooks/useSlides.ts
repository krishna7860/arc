"use client";

import { useState, useCallback, useEffect, useRef } from "react";

export function useSlides(total: number) {
  const [current, setCurrent] = useState(0);
  const busyRef = useRef(false);
  const wheelLockRef = useRef(false);
  const touchYRef = useRef(0);

  const goTo = useCallback(
    (n: number, dir?: number) => {
      if (n === current || busyRef.current || n < 0 || n >= total) return;
      busyRef.current = true;

      const d = dir !== undefined ? dir : n > current ? 1 : -1;

      // Dispatch custom event for the Deck to handle transitions
      window.dispatchEvent(
        new CustomEvent("slide-transition", {
          detail: { from: current, to: n, direction: d },
        })
      );

      setTimeout(() => {
        setCurrent(n);
        busyRef.current = false;
      }, 560);
    },
    [current, total]
  );

  const next = useCallback(() => goTo(current + 1, 1), [goTo, current]);
  const prev = useCallback(() => goTo(current - 1, -1), [goTo, current]);

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") next();
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") prev();
    };

    const handleWheel = (e: WheelEvent) => {
      // Skip wheel nav when inside the apply form
      const target = e.target as HTMLElement;
      const insideForm = target.closest("#s8, [data-slide='apply']");
      const insideScrollable = target.closest(".fstep");
      if (insideForm && insideScrollable) return;

      e.preventDefault();
      if (wheelLockRef.current) return;
      wheelLockRef.current = true;
      if (e.deltaY > 30) next();
      else if (e.deltaY < -30) prev();
      setTimeout(() => {
        wheelLockRef.current = false;
      }, 800);
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchYRef.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      // Skip touch nav when inside the apply form
      const target = e.target as HTMLElement;
      if (target.closest("#s8, [data-slide='apply']")) return;

      const dy = touchYRef.current - e.changedTouches[0].clientY;
      if (Math.abs(dy) > 44) {
        if (dy > 0) { next(); } else { prev(); }
      }
    };

    document.addEventListener("keydown", handleKeydown);
    document.addEventListener("wheel", handleWheel, { passive: false });
    document.addEventListener("touchstart", handleTouchStart, { passive: true });
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
      document.removeEventListener("wheel", handleWheel);
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [next, prev]);

  const progress = ((current + 1) / total) * 100;
  const counter = `${String(current + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;

  return { current, goTo, next, prev, progress, counter, total };
}
