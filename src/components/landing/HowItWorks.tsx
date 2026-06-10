const HowItWorks = () => {
  const howItWorksSteps = [
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
  ];

  return (
    <section
      id="how-it-works"
      className="py-20 px-6 bg-slate-900/50 border-y border-slate-800"
    >
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            How it works
          </h2>
          <p className="text-slate-400 text-lg">
            From signup to paid invoice in three steps.
          </p>
        </div>

        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorksSteps.map((item, index) => (
              <div key={item.step} className="relative space-y-4">
                <div className="flex flex-col items-center space-y-3">
                  <div className="relative z-10 size-12 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center">
                    <span className="text-amber-400 font-bold text-sm">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="text-white font-semibold text-lg">
                    {item.title}
                  </h3>
                </div>

                <p className="text-slate-400 text-sm leading-relaxed text-center">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
