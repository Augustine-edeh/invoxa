import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import ClientList from "@/components/clients/ClientList";

export default async function ClientsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: clients } = await supabase
    .from("clients")
    .select("*")
    .order("name", { ascending: true });

  return (
    <div className="p-6 md:p-8 space-y-6 pb-24 md:pb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Clients</h1>
          <p className="text-slate-400 text-sm mt-1">
            Save clients and reuse their details on invoices and proposals
          </p>
        </div>
      </div>

      <ClientList clients={clients ?? []} />
    </div>
  );
}
