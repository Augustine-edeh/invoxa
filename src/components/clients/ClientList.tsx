"use client";

import { Client } from "@/types/client";
import { useRouter } from "next/navigation";
import { useInvoiceStore } from "@/stores/useInvoiceStore";
import { useProposalStore } from "@/stores/useProposalStore";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { Users, FileText, FilePen, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddClientDialog from "./AddClientDialog";

type Props = {
  clients: Client[];
};

export default function ClientList({ clients }: Props) {
  const router = useRouter();
  const setInvoiceField = useInvoiceStore((s) => s.setField);
  const setProposalField = useProposalStore((s) => s.setField);

  const handleCreateInvoice = (client: Client) => {
    setInvoiceField("client_name", client.name);
    setInvoiceField("client_email", client.email);
    toast.success(`${client.name} loaded into invoice form`);
    router.push("/dashboard/invoice/new");
  };

  const handleCreateProposal = (client: Client) => {
    setProposalField("client_name", client.name);
    setProposalField("client_email", client.email);
    toast.success(`${client.name} loaded into proposal form`);
    router.push("/dashboard/proposal/new");
  };

  const handleDelete = async (client: Client) => {
    if (!confirm(`Remove ${client.name} from clients?`)) return;

    const supabase = createClient();
    const { error } = await supabase
      .from("clients")
      .delete()
      .eq("id", client.id);

    if (error) {
      toast.error("Failed to remove client");
      return;
    }

    toast.success(`${client.name} removed`);
    router.refresh();
  };

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  if (clients.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex justify-end">
          <AddClientDialog />
        </div>
        <div className="flex flex-col items-center justify-center py-20 text-center bg-slate-900 border border-slate-800 rounded-xl">
          <Users size={40} className="text-slate-700 mb-4" />
          <p className="text-slate-400 font-medium">No clients yet</p>
          <p className="text-slate-600 text-sm mt-1 max-w-xs">
            Add your first client to quickly pre-fill invoices and proposals
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <AddClientDialog />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {clients.map((client) => (
          <div
            key={client.id}
            className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4"
          >
            {/* Client info */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-400/10 border border-amber-400/20 flex items-center justify-center shrink-0">
                <span className="text-amber-400 text-sm font-bold">
                  {getInitials(client.name)}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-white font-semibold truncate">
                  {client.name}
                </p>
                <p className="text-slate-400 text-sm truncate">
                  {client.email}
                </p>
                {client.phone && (
                  <p className="text-slate-500 text-xs mt-0.5">
                    {client.phone}
                  </p>
                )}
                {client.address && (
                  <p className="text-slate-500 text-xs">{client.address}</p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-1 border-t border-slate-800">
              <Button
                size="sm"
                onClick={() => handleCreateInvoice(client)}
                variant="outline"
                title="Send invoice to client"
                className="flex-1 bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 text-xs"
              >
                <FileText size={13} className="mr-1.5 text-amber-400" />
                Invoice
              </Button>
              <Button
                size="sm"
                onClick={() => handleCreateProposal(client)}
                variant="outline"
                title="Send proposal to client"
                className="flex-1 bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 text-xs"
              >
                <FilePen size={13} className="mr-1.5 text-blue-400" />
                Proposal
              </Button>
              <button
                onClick={() => handleDelete(client)}
                className="p-2 text-slate-600 hover:text-red-400 transition-colors"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
