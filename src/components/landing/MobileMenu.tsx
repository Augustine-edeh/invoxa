import { focusRingStyles, navLinks } from "./Navbar";
import { useActiveSection } from "@/hooks/use-active-section";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Menu } from "lucide-react";
import clsx from "clsx";
import Link from "next/link";

const MobileMenu = () => {
  const activeSection = useActiveSection();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          className={clsx(
            "md:hidden rounded-lg p-2 text-slate-300 transition-colors hover:bg-slate-800 hover:text-white",
            focusRingStyles,
          )}
        >
          <Menu size={20} />
        </button>
      </SheetTrigger>

      <SheetContent side="right" className="border-slate-800 bg-slate-950">
        <VisuallyHidden>
          <SheetTitle>Navigation Menu</SheetTitle>
        </VisuallyHidden>

        <div>
          <div className="mt-12 flex flex-col px-4">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className={clsx(
                  "group relative py-4 text-lg transition-colors",
                  focusRingStyles,
                  activeSection === link.id
                    ? "text-amber-400"
                    : "text-slate-300 hover:text-white",
                )}
              >
                {link.label}

                <span
                  className={clsx(
                    "absolute bottom-2 left-0 h-px bg-amber-400 transition-all duration-300",
                    activeSection === link.id ? "w-12" : "w-0",
                  )}
                />
              </Link>
            ))}
          </div>

          <div className="mt-8 border-t border-slate-800 pt-8 px-2">
            <Link
              href="/login"
              className={clsx(
                "flex h-11 items-center justify-center rounded-lg bg-amber-400 font-semibold text-slate-950 transition-colors hover:bg-amber-500",
                focusRingStyles,
              )}
            >
              Sign In
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
