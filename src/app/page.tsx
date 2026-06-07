import Link from "next/link";
import Footer from "@/components/landing/Footer";
import HowItWorks from "@/components/landing/HowItWorks";
import WhatIsIncluded from "@/components/landing/WhatIsIncluded";
import Features from "@/components/landing/Features";
import Stats from "@/components/landing/Stats";
import Hero from "@/components/landing/Hero";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-white">
            Inv<span className="text-amber-400">ox</span>a
          </h1>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-slate-400 hover:text-white text-sm transition-colors hidden sm:block"
            >
              Sign in
            </Link>
            <Link
              href="/login"
              className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-semibold text-sm px-4 py-2 rounded-lg transition-colors text-nowrap"
            >
              <span className="hidden sm:inline">Get Started for Free</span>
              <span className="sm:hidden">Get Started</span>
            </Link>
          </div>
        </div>
      </nav>

      <Hero />
      <Stats />
      <Features />
      <HowItWorks />
      <WhatIsIncluded />
      <Footer />
    </div>
  );
};

export default LandingPage;
