import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-slate-800 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center md:text-left">
          <h2 className="text-lg font-bold text-white">
            Inv<span className="text-amber-400">ox</span>a
          </h2>

          <p className="text-slate-500 text-xs">
            Built by{" "}
            <a
              href="https://augustine-portfolio-kappa.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:text-amber-300 transition-colors"
            >
              Augustine Edeh
            </a>
          </p>
        </div>

        <div className="flex items-center gap-6 text-sm text-slate-500">
          <Link href="/login" className="hover:text-white transition-colors">
            Sign in
          </Link>
          <a
            href="https://augustine-portfolio-kappa.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Portfolio
          </a>
          <a
            href="mailto:info.augustinesedeh@gmail.com"
            className="hover:text-white transition-colors"
          >
            Contact
          </a>
        </div>
      </div>

      <p className="text-slate-400 text-xs text-center mt-4">
        &copy; {new Date().getFullYear()} Invoxa. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
