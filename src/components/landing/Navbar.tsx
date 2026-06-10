"use client";

import Link from "next/link";
import { useActiveSection } from "@/hooks/use-active-section";
import clsx from "clsx";
import MobileMenu from "@/components/landing/MobileMenu";

export const navLinks = [
  {
    label: "Features",
    href: "#features",
    id: "features",
  },
  {
    label: "How It Works",
    href: "#how-it-works",
    id: "how-it-works",
  },
  {
    label: "Pricing",
    href: "#pricing",
    id: "pricing",
  },
];

export const focusRingStyles =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 rounded-md";

const Navbar = () => {
  const activeSection = useActiveSection();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="#top" className="text-xl font-bold text-white">
          Inv<span className="text-amber-400">ox</span>a
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              className={clsx(
                "group relative px-1 py-1 text-sm transition-colors",
                focusRingStyles,
                activeSection === link.id
                  ? "text-amber-400"
                  : "text-slate-400 hover:text-white",
              )}
            >
              {link.label}

              <span
                className={clsx(
                  "absolute -bottom-2 left-0 h-px bg-amber-400 transition-all duration-300",
                  activeSection === link.id ? "w-full" : "w-0",
                )}
              />
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="hidden md:block bg-amber-400 hover:bg-amber-500 text-slate-950 font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
          >
            Sign In
          </Link>

          <MobileMenu />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
