import { CheckCircle, ChevronRight } from "lucide-react";
import Link from "next/link";

const WhatIsIncluded = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 md:p-12 space-y-8 text-center">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold text-white">
              Everything included. Free.
            </h2>
            <p className="text-slate-400">
              No hidden fees. No premium tiers. Just a tool that works.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-max mx-auto">
            {[
              "Unlimited invoices",
              "Unlimited proposals",
              "PDF downloads",
              "Email to clients",
              "Client management",
              "Status tracking",
              "Auto-increment numbering",
              "Profile settings on PDFs",
              "Mobile-friendly dashboard",
              "Secure data with RLS",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle size={16} className="text-amber-400 shrink-0" />
                <span className="text-slate-300 text-sm">{item}</span>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold px-8 py-3.5 rounded-lg transition-colors text-nowrap mx-auto"
            >
              <span className="hidden sm:inline">Get Started for Free</span>
              <span className="sm:hidden">Get Started</span>
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIsIncluded;
