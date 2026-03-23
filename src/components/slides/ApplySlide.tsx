"use client";

import { useForm } from "react-hook-form";
import { useState, useCallback } from "react";

interface ApplyFormData {
  fullName: string;
  email: string;
  college: string;
  yearOfStudy: string;
  teamSize: string;
  problem: string;
  whoHasProblem: string;
  whyNow: string;
  whyYou: string;
  hoursPerWeek: string;
  supportArea: string;
  successVision: string;
  loomLink: string;
}

const STEPS = [
  { num: "01", label: "You" },
  { num: "02", label: "The problem" },
  { num: "03", label: "Why you" },
  { num: "04", label: "Commitment" },
  { num: "05", label: "Loom video" },
];

export default function ApplySlide() {
  const [currentStep, setCurrentStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit } = useForm<ApplyFormData>();

  const goStep = useCallback(
    (n: number) => {
      if (n < 0 || n >= STEPS.length || n === currentStep) return;

      const dir = n > currentStep ? 1 : -1;
      const steps = document.querySelectorAll<HTMLDivElement>(".fstep");
      const outgoing = steps[currentStep];
      const incoming = steps[n];

      if (outgoing) {
        outgoing.classList.remove("active-step");
        outgoing.style.opacity = "0";
        outgoing.style.transform = `translateX(${dir * -24}px)`;
        outgoing.style.pointerEvents = "none";
      }

      if (incoming) {
        incoming.style.transition = "none";
        incoming.style.opacity = "0";
        incoming.style.transform = `translateX(${dir * 32}px)`;
        incoming.style.pointerEvents = "none";

        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            incoming.style.transition = "";
            incoming.classList.add("active-step");
            incoming.scrollTop = 0;
          })
        );
      }

      setCurrentStep(n);
    },
    [currentStep]
  );

  const onSubmit = async (data: ApplyFormData) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) setSubmitted(true);
    } catch {
      // handle silently for now
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full py-[11px] px-[13px] bg-white/65 border border-border rounded-sm font-sans text-[13.5px] text-ink font-light outline-none transition-colors focus:border-gold placeholder:text-ink/[0.28]";

  const selectClass =
    "w-full py-[11px] px-[13px] pr-8 bg-white/65 border border-border rounded-sm font-sans text-[13.5px] text-ink font-light outline-none transition-colors focus:border-gold appearance-none cursor-pointer bg-no-repeat bg-[right_12px_center] bg-[length:10px_6px]";

  const textareaClass =
    "w-full py-[11px] px-[13px] bg-white/65 border border-border rounded-sm font-sans text-[13.5px] text-ink font-light outline-none transition-colors focus:border-gold placeholder:text-ink/[0.28] leading-[1.7] resize-none";

  const formProgress = ((currentStep + 1) / STEPS.length) * 100;

  if (submitted) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="text-[10px] tracking-[0.16em] uppercase text-gold font-normal mb-[18px]">
            Applied
          </div>
          <div className="font-serif text-[42px] font-light leading-none tracking-tight text-ink">
            Thank you.
          </div>
          <div className="text-[13.5px] text-ink-2 mt-2 font-light leading-[1.7]">
            We&rsquo;ll be in touch within a week.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[1fr_1.8fr] h-full">
      {/* Left: static info */}
      <div className="flex flex-col justify-end py-14 pl-[72px] pr-12 border-r border-border">
        <div className="text-[10px] tracking-[0.16em] uppercase text-gold font-normal mb-[18px]">
          Arc &middot; 01 &middot; Apply
        </div>
        <div className="font-serif text-[clamp(34px,3.8vw,50px)] font-light leading-[1.05] tracking-tight text-ink mb-5">
          Ready
          <br />
          to build?
        </div>
        <div className="w-7 h-px bg-gold my-5" />
        <p className="text-sm text-ink-2 leading-[1.8] font-light mb-7">
          We take 1&ndash;2 founders per cohort. Fill this out honestly &mdash;
          there are no right answers, only real ones.
        </p>

        {/* Step indicators */}
        <div className="flex flex-col gap-2.5">
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              onClick={() => goStep(i)}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div
                className={`w-[22px] h-[22px] rounded-full border flex items-center justify-center text-[10px] tracking-[0.06em] transition-all flex-shrink-0 ${
                  i === currentStep
                    ? "bg-ink border-ink text-bg"
                    : i < currentStep
                    ? "bg-gold border-gold text-bg"
                    : "border-border text-ink/40"
                }`}
              >
                {step.num}
              </div>
              <span
                className={`text-xs transition-colors ${
                  i === currentStep
                    ? "text-ink font-medium"
                    : "text-ink/45 group-hover:text-ink-2"
                }`}
              >
                {step.label}
              </span>
            </div>
          ))}
        </div>

        <p className="text-[11px] text-ink/25 mt-6 italic font-light">
          ~10 minutes &middot; We read every application
        </p>
      </div>

      {/* Right: multi-step form */}
      <div className="relative overflow-hidden">
        <form onSubmit={handleSubmit(onSubmit)} className="h-full relative">
          {/* Step 1: You */}
          <div
            className="fstep active-step absolute inset-0 overflow-y-auto px-[52px] pr-[72px] py-14 flex flex-col justify-center"
            data-index="0"
          >
            <div className="text-[10px] tracking-[0.16em] uppercase text-gold mb-3">
              01 &middot; You
            </div>
            <h3 className="font-serif text-[28px] font-light mb-7 leading-[1.2]">
              Let&rsquo;s start with who you are.
            </h3>
            <div className="flex flex-col gap-3.5 max-w-[520px]">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[9.5px] tracking-[0.12em] uppercase text-ink/35">
                    Full name
                  </label>
                  <input
                    className={inputClass}
                    type="text"
                    placeholder="Your name"
                    {...register("fullName", { required: true })}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[9.5px] tracking-[0.12em] uppercase text-ink/35">
                    Email
                  </label>
                  <input
                    className={inputClass}
                    type="email"
                    placeholder="you@email.com"
                    {...register("email", { required: true })}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[9.5px] tracking-[0.12em] uppercase text-ink/35">
                  College / University
                </label>
                <input
                  className={inputClass}
                  type="text"
                  placeholder="IIT Delhi, BITS Pilani, VIT&#8230;"
                  {...register("college")}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[9.5px] tracking-[0.12em] uppercase text-ink/35">
                    Year of study
                  </label>
                  <select
                    className={selectClass}
                    defaultValue=""
                    {...register("yearOfStudy")}
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    <option>1st year</option>
                    <option>2nd year</option>
                    <option>3rd year</option>
                    <option>4th year</option>
                    <option>Recent graduate</option>
                    <option>Working professional</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[9.5px] tracking-[0.12em] uppercase text-ink/35">
                    Team size
                  </label>
                  <select
                    className={selectClass}
                    defaultValue=""
                    {...register("teamSize")}
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    <option>Solo founder</option>
                    <option>With a co-founder</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-7">
              <button
                type="button"
                onClick={() => goStep(1)}
                className="bg-ink text-bg border-none py-[11px] px-[22px] font-sans text-[11px] tracking-[0.12em] uppercase cursor-pointer rounded-sm transition-opacity hover:opacity-80"
              >
                Next &mdash; The problem &rarr;
              </button>
            </div>
          </div>

          {/* Step 2: Problem */}
          <div
            className="fstep absolute inset-0 overflow-y-auto px-[52px] pr-[72px] py-14 flex flex-col justify-center opacity-0 pointer-events-none translate-x-8"
            data-index="1"
          >
            <div className="text-[10px] tracking-[0.16em] uppercase text-gold mb-3">
              02 &middot; The problem
            </div>
            <h3 className="font-serif text-[28px] font-light mb-7 leading-[1.2]">
              What are you solving, and for whom?
            </h3>
            <div className="flex flex-col gap-4 max-w-[520px]">
              <div className="flex flex-col gap-1">
                <label className="text-[9.5px] tracking-[0.12em] uppercase text-ink/35">
                  What problem are you solving?{" "}
                  <span className="text-ink/30 font-light normal-case tracking-normal text-[10px]">
                    &mdash; 1 to 2 sentences
                  </span>
                </label>
                <textarea
                  className={textareaClass}
                  rows={3}
                  placeholder="Describe the problem clearly. Not the solution — the problem."
                  {...register("problem", { required: true })}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[9.5px] tracking-[0.12em] uppercase text-ink/35">
                  Who has this problem?{" "}
                  <span className="text-ink/30 font-light normal-case tracking-normal text-[10px]">
                    &mdash; be specific
                  </span>
                </label>
                <input
                  className={inputClass}
                  type="text"
                  placeholder="e.g. Student founders in tier-2 cities trying to raise their first round"
                  {...register("whoHasProblem", { required: true })}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[9.5px] tracking-[0.12em] uppercase text-ink/35">
                  Why now?{" "}
                  <span className="text-ink/30 font-light normal-case tracking-normal text-[10px]">
                    &mdash; what&rsquo;s changed that makes this the right time
                  </span>
                </label>
                <textarea
                  className={textareaClass}
                  rows={3}
                  placeholder="What's shifted — technically, culturally, or in the market — that makes this urgent today?"
                  {...register("whyNow", { required: true })}
                />
              </div>
            </div>
            <div className="flex items-center gap-3 mt-7">
              <button
                type="button"
                onClick={() => goStep(0)}
                className="bg-transparent border border-border text-ink-2 py-[11px] px-[18px] font-sans text-[11px] tracking-[0.12em] uppercase cursor-pointer rounded-sm transition-all hover:border-ink/30"
              >
                &larr; Back
              </button>
              <button
                type="button"
                onClick={() => goStep(2)}
                className="bg-ink text-bg border-none py-[11px] px-[22px] font-sans text-[11px] tracking-[0.12em] uppercase cursor-pointer rounded-sm transition-opacity hover:opacity-80"
              >
                Next &mdash; Why you &rarr;
              </button>
            </div>
          </div>

          {/* Step 3: Why you */}
          <div
            className="fstep absolute inset-0 overflow-y-auto px-[52px] pr-[72px] py-14 flex flex-col justify-center opacity-0 pointer-events-none translate-x-8"
            data-index="2"
          >
            <div className="text-[10px] tracking-[0.16em] uppercase text-gold mb-3">
              03 &middot; Why you
            </div>
            <h3 className="font-serif text-[28px] font-light mb-3 leading-[1.2]">
              Why are you the right person
              <br />
              to build this?
            </h3>
            <p className="text-[13.5px] text-ink/[0.38] font-light mb-7 leading-[1.7] max-w-[460px]">
              Be honest, not impressive. Do you live this problem? Have you tried
              to solve it before? What do you know about this space that others
              don&rsquo;t?
            </p>
            <div className="max-w-[520px]">
              <div className="flex flex-col gap-1">
                <label className="text-[9.5px] tracking-[0.12em] uppercase text-ink/35">
                  Your answer
                </label>
                <textarea
                  className={textareaClass}
                  rows={6}
                  placeholder="Write openly. This is the most important question in the form."
                  {...register("whyYou", { required: true })}
                />
              </div>
            </div>
            <div className="flex items-center gap-3 mt-7">
              <button
                type="button"
                onClick={() => goStep(1)}
                className="bg-transparent border border-border text-ink-2 py-[11px] px-[18px] font-sans text-[11px] tracking-[0.12em] uppercase cursor-pointer rounded-sm transition-all hover:border-ink/30"
              >
                &larr; Back
              </button>
              <button
                type="button"
                onClick={() => goStep(3)}
                className="bg-ink text-bg border-none py-[11px] px-[22px] font-sans text-[11px] tracking-[0.12em] uppercase cursor-pointer rounded-sm transition-opacity hover:opacity-80"
              >
                Next &mdash; Commitment &rarr;
              </button>
            </div>
          </div>

          {/* Step 4: Commitment */}
          <div
            className="fstep absolute inset-0 overflow-y-auto px-[52px] pr-[72px] py-14 flex flex-col justify-center opacity-0 pointer-events-none translate-x-8"
            data-index="3"
          >
            <div className="text-[10px] tracking-[0.16em] uppercase text-gold mb-3">
              04 &middot; Commitment
            </div>
            <h3 className="font-serif text-[28px] font-light mb-7 leading-[1.2]">
              How serious are you about this?
            </h3>
            <div className="flex flex-col gap-4 max-w-[520px]">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[9.5px] tracking-[0.12em] uppercase text-ink/35">
                    Hours per week you can commit
                  </label>
                  <select
                    className={selectClass}
                    defaultValue=""
                    {...register("hoursPerWeek")}
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    <option>10–15 hrs/week</option>
                    <option>15–20 hrs/week</option>
                    <option>20–30 hrs/week</option>
                    <option>30+ hrs/week (full time)</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[9.5px] tracking-[0.12em] uppercase text-ink/35">
                    Where do you need most support?
                  </label>
                  <select
                    className={selectClass}
                    defaultValue=""
                    {...register("supportArea")}
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    <option>Technical &mdash; architecture &amp; code</option>
                    <option>Product &mdash; what to build, for whom</option>
                    <option>Fundraising &mdash; narrative &amp; investors</option>
                    <option>All three equally</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[9.5px] tracking-[0.12em] uppercase text-ink/35">
                  What does success look like at the end of 6 months?{" "}
                  <span className="text-ink/30 font-light normal-case tracking-normal text-[10px]">
                    &mdash; be specific
                  </span>
                </label>
                <textarea
                  className={textareaClass}
                  rows={3}
                  placeholder="Not just 'raise money' — what product, what users, what milestone would make you proud?"
                  {...register("successVision")}
                />
              </div>
            </div>
            <div className="flex items-center gap-3 mt-7">
              <button
                type="button"
                onClick={() => goStep(2)}
                className="bg-transparent border border-border text-ink-2 py-[11px] px-[18px] font-sans text-[11px] tracking-[0.12em] uppercase cursor-pointer rounded-sm transition-all hover:border-ink/30"
              >
                &larr; Back
              </button>
              <button
                type="button"
                onClick={() => goStep(4)}
                className="bg-ink text-bg border-none py-[11px] px-[22px] font-sans text-[11px] tracking-[0.12em] uppercase cursor-pointer rounded-sm transition-opacity hover:opacity-80"
              >
                Next &mdash; Loom video &rarr;
              </button>
            </div>
          </div>

          {/* Step 5: Loom */}
          <div
            className="fstep absolute inset-0 overflow-y-auto px-[52px] pr-[72px] py-14 flex flex-col justify-center opacity-0 pointer-events-none translate-x-8"
            data-index="4"
          >
            <div className="text-[10px] tracking-[0.16em] uppercase text-gold mb-3">
              05 &middot; Loom video
            </div>
            <h3 className="font-serif text-[28px] font-light mb-3 leading-[1.2]">
              One last thing &mdash;
              <br />
              let me hear you.
            </h3>
            <p className="text-[13.5px] text-ink/[0.38] font-light mb-8 leading-[1.8] max-w-[460px]">
              Record a 3-minute Loom. No script needed. Walk me through your idea
              and why you&rsquo;re building it. Just talk &mdash; that&rsquo;s it.
            </p>
            <div className="max-w-[520px] flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <label className="text-[9.5px] tracking-[0.12em] uppercase text-ink/35">
                  Loom link
                </label>
                <input
                  className={inputClass}
                  type="url"
                  placeholder="https://loom.com/share/&#8230;"
                  {...register("loomLink")}
                />
              </div>
              <p className="text-[11.5px] text-ink/[0.28] italic font-light leading-[1.7]">
                Cover: the problem, why you care, what you&rsquo;ve done so far.
                Under 3 minutes.
              </p>
            </div>
            <div className="flex items-center gap-3 mt-7">
              <button
                type="button"
                onClick={() => goStep(3)}
                className="bg-transparent border border-border text-ink-2 py-[11px] px-[18px] font-sans text-[11px] tracking-[0.12em] uppercase cursor-pointer rounded-sm transition-all hover:border-ink/30"
              >
                &larr; Back
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="bg-ink text-bg border-none py-[13px] px-7 font-sans text-[11px] tracking-[0.14em] uppercase cursor-pointer rounded-sm transition-opacity hover:opacity-80 disabled:opacity-50"
              >
                {submitting ? "Submitting\u2026" : "Submit application \u2192"}
              </button>
            </div>
          </div>
        </form>

        {/* Form progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-border">
          <div
            className="h-full bg-gold transition-[width] duration-500"
            style={{
              width: `${formProgress}%`,
              transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
