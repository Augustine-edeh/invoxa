import Link from "next/link";
import {
  FileText,
  FilePen,
  Download,
  Mail,
  Shield,
  Zap,
  ChevronRight,
  CheckCircle,
} from "lucide-react";
import Footer from "@/components/landing/Footer";

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
              className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
            >
              Get started free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/20 rounded-full px-4 py-1.5 text-amber-400 text-sm font-medium">
            <Zap size={14} />
            Built for Nigerian freelancers
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            Invoice clients.
            <br />
            <span className="text-amber-400">Get paid faster.</span>
          </h1>

          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Create professional invoices and proposals in minutes. Send them to
            clients, track payments, and download branded PDFs — all in one
            place.
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

      {/* Stats bar */}
      <section className="py-10 border-y border-slate-800 bg-slate-900/50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-2xl md:text-3xl font-bold text-amber-400">
                ₦0
              </p>
              <p className="text-slate-500 text-sm mt-1">Cost to start</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-bold text-white">2min</p>
              <p className="text-slate-500 text-sm mt-1">
                To create an invoice
              </p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-bold text-white">100%</p>
              <p className="text-slate-500 text-sm mt-1">Professional PDFs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Everything you need to get paid
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              Built around the workflow of a Nigerian freelancer — simple, fast,
              and professional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: FileText,
                color: "text-amber-400",
                bg: "bg-amber-400/10",
                title: "Professional invoices",
                desc: "Create detailed invoices with line items, tax calculation, and auto-incrementing numbers. Download as branded PDFs instantly.",
              },
              {
                icon: FilePen,
                color: "text-blue-400",
                bg: "bg-blue-400/10",
                title: "Winning proposals",
                desc: "Write proposals with project scope, deliverables, timeline, and payment terms. Send them directly to clients.",
              },
              {
                icon: Mail,
                color: "text-green-400",
                bg: "bg-green-400/10",
                title: "Email to clients",
                desc: "Send invoices and proposals directly to your client's inbox with a single click. Professional branded emails.",
              },
              {
                icon: Download,
                color: "text-purple-400",
                bg: "bg-purple-400/10",
                title: "Download PDFs",
                desc: "Every invoice and proposal generates a clean, branded PDF with your business details and the Invoxa watermark.",
              },
              {
                icon: Shield,
                color: "text-red-400",
                bg: "bg-red-400/10",
                title: "Secure by default",
                desc: "Row-level security ensures your data is completely private. Only you can access your invoices and client details.",
              },
              {
                icon: Zap,
                color: "text-amber-400",
                bg: "bg-amber-400/10",
                title: "Built for Nigeria",
                desc: "Naira (₦) support, Nigerian phone validation, and a product that understands the local freelance market.",
              },
            ].map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-3 hover:border-slate-700 transition-colors"
                >
                  <div
                    className={`w-10 h-10 ${feature.bg} rounded-lg flex items-center justify-center`}
                  >
                    <Icon size={20} className={feature.color} />
                  </div>
                  <h3 className="text-white font-semibold">{feature.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6 bg-slate-900/50 border-y border-slate-800">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              How it works
            </h2>
            <p className="text-slate-400 text-lg">
              From signup to paid invoice in three steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Create your account",
                desc: "Sign in with just your email — no password needed. Magic link authentication keeps things simple and secure.",
              },
              {
                step: "02",
                title: "Build your invoice",
                desc: "Add your client details, line items, and tax. The total calculates automatically. Download the PDF or send it directly.",
              },
              {
                step: "03",
                title: "Track and get paid",
                desc: "Mark invoices as sent, paid, or overdue. Your dashboard shows your total earnings and pending amounts at a glance.",
              },
            ].map((item, index) => (
              <div key={item.step} className="relative space-y-4">
                {index < 2 && (
                  <div className="hidden md:block absolute top-6 left-full w-full h-px bg-slate-800 -translate-x-4 z-0" />
                )}
                <div className="relative z-10 w-12 h-12 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center">
                  <span className="text-amber-400 font-bold text-sm">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-white font-semibold text-lg">
                  {item.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 md:p-12 space-y-8">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold text-white">
                Everything included. Free.
              </h2>
              <p className="text-slate-400">
                No hidden fees. No premium tiers. Just a tool that works.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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

            <Link
              href="/login"
              className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold px-8 py-3.5 rounded-lg transition-colors"
            >
              Get started free
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
