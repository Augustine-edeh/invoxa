import { CheckCircle, ChevronRight } from "lucide-react";
import Link from "next/link";

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

const WhatIsIncluded = () => {
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
                and manage clients - all no fees!
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature) => (
                <div
                  key={feature}
                  className="group flex items-center gap-3 py-2 transition-colors"
                >
                  <CheckCircle size={18} className="text-amber-400 shrink-0" />

                  <span className="text-slate-300 text-sm group-hover:text-gray-400 transition-all">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-col items-center gap-3">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-lg bg-amber-400 px-8 py-3.5 font-semibold text-slate-950 transition-all hover:bg-amber-500"
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
