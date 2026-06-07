import { ChevronRight, Zap } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/20 rounded-full px-4 py-1.5 text-amber-400 text-sm font-medium">
          {/* <Zap size={14} /> */}
          Built for Nigerian freelancers
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
          Invoice clients.
          <br />
          <span className="text-amber-400">Get paid faster.</span>
        </h1>

        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Create professional invoices and proposals in minutes. Send them to
          clients, track payments, and download branded PDFs — all in one place.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            href="/login"
            className="w-full sm:w-auto bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold px-8 py-3.5 rounded-lg transition-colors text-center"
          >
            Start for free
          </Link>
          <Link
            href="/dashboard"
            className="w-full sm:w-auto border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white font-medium px-8 py-3.5 rounded-lg transition-colors text-center flex items-center justify-center gap-2"
          >
            View dashboard
            <ChevronRight size={16} />
          </Link>
        </div>

        <p className="text-slate-600 text-sm">
          No credit card required. Free to use.
        </p>
      </div>
    </section>
  );
};

export default Hero;
