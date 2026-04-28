import InvoiceForm from "@/components/invoice/InvoiceForm";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function NewInvoicePage() {
  return (
    <div className="p-6 md:p-8 max-w-3xl mx-auto space-y-6 mt-14 md:mt-0">
      {/* Header */}
      <div className="space-y-1">
        <Link
          href="/dashboard"
          className="flex items-center gap-1 text-slate-500 hover:text-slate-300 text-sm transition-colors w-fit"
        >
          <ChevronLeft size={16} />
          Back to dashboard
        </Link>
        <h1 className="text-2xl font-bold text-white">New invoice</h1>
        <p className="text-slate-400 text-sm">
          Fill in the details below to create a new invoice
        </p>
      </div>

      {/* Form */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-20 md:mb-0">
        <InvoiceForm />
      </div>
    </div>
  );
}
