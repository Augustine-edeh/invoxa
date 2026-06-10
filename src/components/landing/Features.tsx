const Features = () => {
  const features = [
    {
      label: "invoices",
      color: "text-amber-400",
      bg: "bg-amber-400/10",
      title: "Professional invoices",
      desc: "Create detailed invoices with line items, tax calculation, and auto-incrementing numbers. Download as branded PDFs instantly.",
    },
    {
      label: "proposals",
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      title: "Winning proposals",
      desc: "Write proposals with project scope, deliverables, timeline, and payment terms. Send them directly to clients.",
    },
    {
      label: "email",
      color: "text-green-400",
      bg: "bg-green-400/10",
      title: "Email to clients",
      desc: "Send invoices and proposals directly to your client's inbox with a single click. Professional branded emails.",
    },
    {
      label: "pdf export",
      color: "text-purple-400",
      bg: "bg-purple-400/10",
      title: "Download PDFs",
      desc: "Every invoice and proposal generates a clean, branded PDF with your business details and the Invoxa watermark.",
    },
    {
      label: "security",
      color: "text-red-400",
      bg: "bg-red-400/10",
      title: "Secure by default",
      desc: "Row-level security ensures your data is completely private. Only you can access your invoices and client details.",
    },
    {
      label: "localized",
      color: "text-amber-400",
      bg: "bg-amber-400/10",
      title: "Built for Nigeria",
      desc: "Naira (₦) support, Nigerian phone validation, and a product that understands the local freelance market.",
    },
  ];

  return (
    <section id="features" className="py-20 px-6">
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
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-3 hover:border-slate-700 transition-colors"
            >
              <div className="flex flex-col space-y-3 w-fit">
                <div className="text-xs uppercase tracking-[0.2em] text-amber-400">
                  {feature.label}
                </div>
                <div className="h-px w-full origin-left scale-x-0 bg-linear-to-r from-amber-400 to-amber-300 transition-transform duration-500 ease-out group-hover:scale-x-100" />
              </div>

              <h3 className="text-white font-semibold">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
