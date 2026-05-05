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
  Plus,
  Settings,
  Users,
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
import MobileLogo from "./dashboard/MobileLogo";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Invoices", href: "/dashboard/invoice/new", icon: FileText },
  { label: "Proposals", href: "/dashboard/proposal/new", icon: FilePen },
  { label: "Clients", href: "/dashboard/clients", icon: Users },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

const bottomNavItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Invoices", href: "/dashboard/invoice/new", icon: FileText },
  { label: "Proposals", href: "/dashboard/proposal/new", icon: FilePen },
  { label: "Clients", href: "/dashboard/clients", icon: Users },
];

type SidebarProps = {
  email: string;
};

export default function Sidebar({ email }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [fabOpen, setFabOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

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
      <div className="px-6 py-6">
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Inv<span className="text-amber-400">ox</span>a
        </h1>
        <p className="text-slate-500 text-xs mt-1">Freelance toolkit</p>
      </div>

      <Separator className="bg-slate-800" />

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
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
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 border-r border-slate-800 min-h-screen sticky top-0 shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setDrawerOpen(true)}
            className="text-slate-400 hover:text-white p-1"
          >
            <Menu size={22} />
          </button>
          <MobileLogo />
        </div>

        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-amber-400 text-slate-950 text-xs font-bold">
            {initials}
          </AvatarFallback>
        </Avatar>
      </div>

      {/* Mobile top padding */}
      <div className="md:hidden h-[52px] shrink-0" />

      {/* Mobile drawer overlay */}
      {drawerOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-slate-950/80"
          onClick={() => setDrawerOpen(false)}
        >
          <div
            className="w-72 h-full bg-slate-900 border-r border-slate-800 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-slate-800">
              <MobileLogo />
              <button
                onClick={() => setDrawerOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Drawer nav — all items */}
            <nav className="flex-1 px-3 py-4 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setDrawerOpen(false)}
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

            {/* Sign out */}
            <div className="px-3 py-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
                    <Avatar className="h-7 w-7">
                      <AvatarFallback className="bg-amber-400 text-slate-950 text-xs font-bold">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      {/* <p>{user.name}</p> //NOTE: add user name here later on */}
                      <span className="flex-1 text-left truncate">{email}</span>
                    </div>
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
        </div>
      )}

      {/* Mobile FAB */}
      <div className="md:hidden fixed bottom-20 right-4 z-40">
        {fabOpen && (
          <div className="absolute bottom-16 right-0 space-y-2 flex flex-col items-end">
            <Link
              href="/dashboard/invoice/new"
              onClick={() => setFabOpen(false)}
              className="flex items-center gap-2 bg-slate-800 text-white text-sm font-medium px-4 py-2.5 rounded-full shadow-lg border border-slate-700"
            >
              <FileText size={15} className="text-amber-400" />
              New invoice
            </Link>
            <Link
              href="/dashboard/proposal/new"
              onClick={() => setFabOpen(false)}
              className="flex items-center gap-2 bg-slate-800 text-white text-sm font-medium px-4 py-2.5 rounded-full shadow-lg border border-slate-700"
            >
              <FilePen size={15} className="text-amber-400" />
              New proposal
            </Link>
          </div>
        )}
        <button
          onClick={() => setFabOpen(!fabOpen)}
          className={cn(
            "w-14 h-14 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow-lg transition-transform duration-200",
            fabOpen && "rotate-45",
          )}
        >
          <Plus size={24} />
        </button>
      </div>

      {/* Mobile bottom nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900 border-t border-slate-800">
        <div className="flex items-center justify-around px-2 py-2">
          {bottomNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg transition-colors",
                  isActive ? "text-amber-400" : "text-slate-500",
                )}
              >
                <Icon size={20} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Mobile bottom padding */}
      <div className="md:hidden h-[65px] shrink-0" />
    </>
  );
}
