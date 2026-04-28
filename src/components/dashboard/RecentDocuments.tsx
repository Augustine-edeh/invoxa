"use client";

import { Invoice } from "@/types/invoice";
import { Proposal } from "@/types/proposal";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { FileText, FilePen, ChevronRight } from "lucide-react";
import { format } from "date-fns";

type RecentItem =
  | { type: "invoice"; data: Invoice }
  | { type: "proposal"; data: Proposal };

const invoiceStatusStyles: Record<string, string> = {
  draft: "bg-slate-700 text-slate-300",
  sent: "bg-blue-500/10 text-blue-400",
  paid: "bg-green-500/10 text-green-400",
  overdue: "bg-red-500/10 text-red-400",
};

const proposalStatusStyles: Record<string, string> = {
  draft: "bg-slate-700 text-slate-300",
  sent: "bg-blue-500/10 text-blue-400",
  accepted: "bg-green-500/10 text-green-400",
  declined: "bg-red-500/10 text-red-400",
};

type Props = {
  invoices: Invoice[];
  proposals: Proposal[];
};

export default function RecentDocuments({ invoices, proposals }: Props) {
  // Merge and sort by created_at
  const items: RecentItem[] = [
    ...invoices.map((i) => ({ type: "invoice" as const, data: i })),
    ...proposals.map((p) => ({ type: "proposal" as const, data: p })),
  ]
    .sort(
      (a, b) =>
        new Date(b.data.created_at).getTime() -
        new Date(a.data.created_at).getTime(),
    )
    .slice(0, 5);

  if (items.length === 0) {
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-white font-semibold">Recent documents</h2>
        </div>
        <div className="flex flex-col items-center justify-center py-12 text-center bg-slate-900 border border-slate-800 rounded-xl">
          <FileText size={32} className="text-slate-700 mb-3" />
          <p className="text-slate-400 text-sm font-medium">No documents yet</p>
          <p className="text-slate-600 text-xs mt-1">
            Create an invoice or proposal to get started
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-white font-semibold">Recent documents</h2>
        <span className="text-amber-400 text-xs font-medium">
          {items.length} total
        </span>
      </div>

      <div className="space-y-2">
        {items.map((item) => {
          const isInvoice = item.type === "invoice";
          const invoice = isInvoice ? (item.data as Invoice) : null;
          const proposal = !isInvoice ? (item.data as Proposal) : null;

          const href = isInvoice
            ? `/dashboard/invoice/${item.data.id}`
            : `/dashboard/proposal/${item.data.id}`;

          const status = item.data.status;
          const statusStyle = isInvoice
            ? invoiceStatusStyles[status]
            : proposalStatusStyles[status];

          const title = isInvoice
            ? `Invoice #${invoice!.invoice_number}`
            : `Proposal #${proposal!.proposal_number}`;

          const subtitle = isInvoice
            ? invoice!.client_name
            : proposal!.client_name;

          const amount = isInvoice ? invoice!.total : proposal!.total;

          const date = isInvoice ? invoice!.due_date : item.data.created_at;

          return (
            <Link
              key={`${item.type}-${item.data.id}`}
              href={href}
              className="flex items-center gap-3 p-4 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800/50 transition-colors"
            >
              {/* Icon */}
              <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center shrink-0">
                {isInvoice ? (
                  <FileText size={18} className="text-amber-400" />
                ) : (
                  <FilePen size={18} className="text-blue-400" />
                )}
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-white text-sm font-medium truncate">
                    {title}
                  </span>
                  <Badge className={`${statusStyle} shrink-0 text-[10px]`}>
                    {status}
                  </Badge>
                </div>
                <p className="text-slate-500 text-xs truncate">{subtitle}</p>
                <p className="text-slate-600 text-xs">
                  {format(new Date(date), "MMM d, yyyy")}
                </p>
              </div>

              {/* Amount + arrow */}
              <div className="flex items-center gap-1 shrink-0">
                <span className="text-amber-400 font-semibold text-sm">
                  ₦{amount.toLocaleString()}
                </span>
                <ChevronRight size={14} className="text-slate-600" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
