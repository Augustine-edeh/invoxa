import Link from "next/link";
import Footer from "@/components/landing/Footer";
import HowItWorks from "@/components/landing/HowItWorks";
import WhatIsIncluded from "@/components/landing/WhatIsIncluded";
import Features from "@/components/landing/Features";
import Stats from "@/components/landing/Stats";
import Hero from "@/components/landing/Hero";
import Navbar from "@/components/landing/Navbar";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
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
