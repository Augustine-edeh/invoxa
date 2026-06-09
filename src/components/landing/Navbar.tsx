import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="#top" className="text-xl font-bold text-white">
          Inv<span className="text-amber-400">ox</span>a
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            href="#features"
            className="text-sm text-slate-400 hover:text-white transition-colors"
          >
            Features
          </Link>

          <Link
            href="#how-it-works"
            className="text-sm text-slate-400 hover:text-white transition-colors"
          >
            How It Works
          </Link>

          <Link
            href="#pricing"
            className="text-sm text-slate-400 hover:text-white transition-colors"
          >
            Pricing
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
