"use client";

import { Invoice } from "@/types/invoice";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import Link from "next/link";
import { FileText } from "lucide-react";

const statusStyles: Record<string, string> = {
  draft: "bg-slate-700 text-slate-300 hover:bg-slate-700",
  sent: "bg-blue-500/10 text-blue-400 hover:bg-blue-500/10",
  paid: "bg-green-500/10 text-green-400 hover:bg-green-500/10",
  overdue: "bg-red-500/10 text-red-400 hover:bg-red-500/10",
};

type Props = {
  invoices: Invoice[];
};

export default function InvoiceTable({ invoices }: Props) {
  if (invoices.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <FileText size={36} className="text-slate-700 mb-3" />
        <p className="text-slate-400 font-medium">No invoices yet</p>
        <p className="text-slate-600 text-sm mt-1">
          Create your first invoice to get started
        </p>
        <Link
          href="/dashboard/invoice/new"
          className="mt-4 text-sm text-amber-400 hover:text-amber-300 font-medium"
        >
          Create invoice →
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-800">
            <th className="text-left text-slate-500 font-medium pb-3 pr-4">
              Invoice
            </th>
            <th className="text-left text-slate-500 font-medium pb-3 pr-4">
              Client
            </th>
            <th className="text-left text-slate-500 font-medium pb-3 pr-4">
              Due date
            </th>
            <th className="text-right text-slate-500 font-medium pb-3 pr-4">
              Amount
            </th>
            <th className="text-left text-slate-500 font-medium pb-3">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/50">
          {invoices.map((invoice) => (
            <tr
              key={invoice.id}
              className="hover:bg-slate-800/30 transition-colors group"
            >
              <td className="py-3 pr-4">
                <Link
                  href={`/dashboard/invoice/${invoice.id}`}
                  className="text-white font-medium group-hover:text-amber-400 transition-colors"
                >
                  #{invoice.invoice_number}
                </Link>
              </td>
              <td className="py-3 pr-4 text-slate-300">
                {invoice.client_name}
              </td>
              <td className="py-3 pr-4 text-slate-400">
                {format(new Date(invoice.due_date), "MMM d, yyyy")}
              </td>
              <td className="py-3 pr-4 text-right text-white font-medium">
                ₦{invoice.total.toLocaleString()}
              </td>
              <td className="py-3">
                <Badge className={statusStyles[invoice.status]}>
                  {invoice.status}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
