import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import EditInvoiceForm from "@/components/invoice/EditInvoiceForm";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditInvoicePage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: invoice, error } = await supabase
    .from("invoices")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !invoice) notFound();

  return (
    <div className="p-6 md:p-8 max-w-3xl mx-auto space-y-6 pt-20 pb-24 md:pb-8">
      <div className="space-y-1">
        <Link
          href={`/dashboard/invoice/${id}`}
          className="flex items-center gap-1 text-slate-500 hover:text-slate-300 text-sm transition-colors w-fit"
        >
          <ChevronLeft size={16} />
          Back to invoice
        </Link>
        <h1 className="text-2xl font-bold text-white">
          Edit invoice #{invoice.invoice_number}
        </h1>
        <p className="text-slate-400 text-sm">
          Make changes and save to update the invoice
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <EditInvoiceForm invoice={invoice} />
      </div>
    </div>
  );
}
