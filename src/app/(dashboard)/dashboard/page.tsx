import { createClient } from "@/lib/supabase/server";
import DashboardClient from "@/components/dashboard/DashboardClient";

export default async function DashboardPage() {
  const supabase = await createClient();

  const [{ data: invoices }, { data: proposals }] = await Promise.all([
    supabase
      .from("invoices")
      .select("*")
      .order("created_at", { ascending: false }),
    supabase
      .from("proposals")
      .select("*")
      .order("created_at", { ascending: false }),
  ]);

  return (
    <DashboardClient invoices={invoices ?? []} proposals={proposals ?? []} />
  );
}
