import { FileText, FilePen, Mail, Download, Shield, Zap } from "lucide-react";

const Features = () => {
  return (
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
  );
};

export default Features;
