const Stats = () => {
  return (
    <section className="py-10 border-y border-slate-800 bg-slate-900/50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="grid grid-cols-3 gap-6 text-center">
          <div>
            <p className="text-2xl md:text-3xl font-bold text-amber-400">₦0</p>
            <p className="text-slate-500 text-sm mt-1">Cost to start</p>
          </div>
          <div>
            <p className="text-2xl md:text-3xl font-bold text-white">2min</p>
            <p className="text-slate-500 text-sm mt-1">To create an invoice</p>
          </div>
          <div>
            <p className="text-2xl md:text-3xl font-bold text-white">100%</p>
            <p className="text-slate-500 text-sm mt-1">Professional PDFs</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
