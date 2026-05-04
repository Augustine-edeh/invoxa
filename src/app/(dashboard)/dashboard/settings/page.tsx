import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import SettingsForm from "@/components/settings/SettingsForm";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default async function SettingsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return (
    <div className="p-6 md:p-8 max-w-2xl mx-auto space-y-6 py-24 md:pb-8">
      <div className="space-y-1">
        <Link
          href="/dashboard"
          className="flex items-center gap-1 text-slate-500 hover:text-slate-300 text-sm transition-colors w-fit"
        >
          <ChevronLeft size={16} />
          Back to dashboard
        </Link>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-slate-400 text-sm">
          Your details appear on invoices, proposals and emails
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <SettingsForm profile={profile} userId={user.id} />
      </div>
    </div>
  );
}
