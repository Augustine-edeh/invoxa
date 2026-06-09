"use client";

import Link from "next/link";
import { useActiveSection } from "@/hooks/use-active-section";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Navbar = () => {
  const CustomFocusRingStyles =
    "rounded-md px-1 py-1 text-sm text-slate-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950";

  const navLinks = [
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

  const activeSection = useActiveSection();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="#top" className="text-xl font-bold text-white">
          Inv<span className="text-amber-400">ox</span>a
        </Link>

        {/* <div className="hidden md:flex items-center gap-8">
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
        </div> */}

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              className={`
        relative
        text-sm
        transition-colors
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-amber-400/40
        focus-visible:ring-offset-2
        focus-visible:ring-offset-slate-950
        rounded-md

        ${
          activeSection === link.id
            ? "text-amber-400"
            : "text-slate-400 hover:text-white"
        }
      `}
            >
              {link.label}

              <span
                className={`
          absolute
          -bottom-2
          left-0
          h-px
          bg-amber-400
          transition-all
          duration-300

          ${activeSection === link.id ? "w-full" : "w-0"}
        `}
              />
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {/* <Link
            href="/login"
            className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
          >
            Sign In
          </Link> */}

          <Link
            href="/login"
            className="hidden md:block bg-amber-400 hover:bg-amber-500 text-slate-950 font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
          >
            Sign In
          </Link>

          <Sheet>
            <SheetTrigger asChild>
              <button className="md:hidden rounded-md p-2 text-slate-300 hover:text-white">
                <Menu size={20} />
              </button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="bg-slate-950 border-slate-800"
            >
              <div className="mt-10 flex flex-col gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.id}
                    href={link.href}
                    className={`text-lg transition-colors ${activeSection === link.id ? "text-amber-400" : "text-slate-300"}`}
                  >
                    {link.label}
                  </Link>
                ))}

                <Link
                  href="/login"
                  className=" mt-4 rounded-lg bg-amber-400 px-4 py-3 text-center font-semibold text-slate-950"
                >
                  Sign In
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
