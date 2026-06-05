"use client";

import { useEffect, useState } from "react";
import { CheckCircle, ChevronRight } from "lucide-react";
import Link from "next/link";
import Marquee from "react-fast-marquee";

const features = [
  "Unlimited invoices",
  "Unlimited proposals",
  "Client management",
  "Invoice status tracking",
  "PDF downloads",
  "Email delivery to clients",
  "Auto-increment invoice numbers",
  "Custom business profile on PDFs",
  "Mobile-friendly dashboard",
  "Secure data protection",
];

const FeatureItem = ({ feature }: { feature: string }) => (
  <div className="group flex items-center gap-3 px-6 py-2">
    <CheckCircle
      size={18}
      className="text-amber-400 shrink-0 transition-transform group-hover:scale-110"
    />

    <span className="text-slate-300 text-sm transition-colors group-hover:text-white whitespace-nowrap">
      {feature}
    </span>
  </div>
);

const MarqueeFeatures = () => (
  <div className="space-y-4">
    <Marquee
      speed={30}
      pauseOnHover
      gradient
      gradientColor="#0F172ACC"
      gradientWidth={50}
    >
      {features.map((feature) => (
        <FeatureItem key={feature} feature={feature} />
      ))}
    </Marquee>

    <Marquee
      speed={25}
      direction="right"
      pauseOnHover
      gradient
      gradientColor="#0F172ACC"
      gradientWidth={100}
    >
      {[...features].reverse().map((feature) => (
        <FeatureItem key={feature} feature={feature} />
      ))}
    </Marquee>
  </div>
);

const GridFeatures = () => (
  <div className="grid grid-cols-1 sm:grid-cols-[auto_auto] gap-x-12 gap-y-4 justify-center">
    {features.map((feature) => (
      <FeatureItem key={feature} feature={feature} />
    ))}
  </div>
);

const WhatIsIncluded = () => {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [hasUserPreference, setHasUserPreference] = useState(false);

  useEffect(() => {
    const savedPreference = localStorage.getItem("reduce-motion");

    if (savedPreference !== null) {
      setReduceMotion(savedPreference === "true");
      setHasUserPreference(true);
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    setReduceMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      if (!hasUserPreference) {
        setReduceMotion(e.matches);
      }
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [hasUserPreference]);

  const handleMotionToggle = () => {
    const newValue = !reduceMotion;

    setReduceMotion(newValue);
    setHasUserPreference(true);

    localStorage.setItem("reduce-motion", String(newValue));
  };

  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 p-8 md:p-12 shadow-[0_0_60px_rgba(251,191,36,0.05)]">
          <div className="absolute inset-0 bg-linear-to-br from-amber-400/3 via-transparent to-transparent pointer-events-none" />

          <div className="relative space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Everything you need to invoice clients. Free.
              </h2>

              <p className="text-slate-400 text-lg">
                Create professional invoices, send proposals, track payments,
                and manage clients — all with no monthly fees.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-center sm:justify-end">
                <button
                  onClick={handleMotionToggle}
                  className="rounded-full border border-slate-700 px-3 py-2 text-xs text-slate-400 transition-colors hover:border-slate-600 hover:text-white"
                >
                  {/* {reduceMotion ? "Enable Animations" : "Reduce Motion"} */}
                  {reduceMotion ? "Animations Off" : "Animations On"}
                </button>
              </div>
              {reduceMotion ? <GridFeatures /> : <MarqueeFeatures />}
            </div>

            <div className="flex flex-col items-center gap-3">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-lg bg-amber-400 px-8 py-3.5 font-semibold text-slate-950 transition-colors hover:bg-amber-500"
              >
                <span className="hidden sm:inline">Get Started for Free</span>

                <span className="sm:hidden">Start Free</span>

                <ChevronRight size={16} />
              </Link>

              <p className="text-sm text-slate-500">No credit card required.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIsIncluded;
