"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import {
  LayoutDashboard,
  FileText,
  FilePen,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "New invoice",
    href: "/dashboard/invoice/new",
    icon: FileText,
  },
  {
    label: "New proposal",
    href: "/dashboard/proposal/new",
    icon: FilePen,
  },
];

type SidebarProps = {
  email: string;
};

export default function Sidebar({ email }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSignOut = async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error("Failed to sign out");
      return;
    }

    router.push("/login");
  };

  const initials = email ? email.slice(0, 2).toUpperCase() : "IN";

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div className="px-6 py-6">
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Inv<span className="text-amber-400">ox</span>a
        </h1>
        <p className="text-slate-500 text-xs mt-1">Freelance toolkit</p>
      </div>

      <Separator className="bg-slate-800" />

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-amber-400/10 text-amber-400"
                  : "text-slate-400 hover:text-white hover:bg-slate-800",
              )}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <Separator className="bg-slate-800" />

      {/* User */}
      <div className="px-3 py-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
              <Avatar className="h-7 w-7">
                <AvatarFallback className="bg-amber-400 text-slate-950 text-xs font-bold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <span className="flex-1 text-left truncate">{email}</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="top"
            align="start"
            className="w-48 bg-slate-800 border-slate-700"
          >
            <DropdownMenuItem
              onClick={handleSignOut}
              className="text-red-400 hover:text-red-300 hover:bg-slate-700 cursor-pointer"
            >
              <LogOut size={14} className="mr-2" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 border-r border-slate-800 h-screen sticky top-0">
        <SidebarContent />
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
        <h1 className="text-xl font-bold text-white">
          Inv<span className="text-amber-400">ox</span>a
        </h1>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-slate-400 hover:text-white"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-slate-950/80">
          <div className="w-64 h-full bg-slate-900 border-r border-slate-800">
            <SidebarContent />
          </div>
        </div>
      )}
    </>
  );
}
