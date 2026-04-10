"use client";

import { Invoice } from "@/types/invoice";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useUpdateInvoiceStatus, useDeleteInvoice } from "@/hooks/useInvoices";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { CheckCircle, Send, Trash2, Clock, AlertCircle } from "lucide-react";

const statusStyles: Record<string, string> = {
  draft: "bg-slate-700 text-slate-300",
  sent: "bg-blue-500/10 text-blue-400",
  paid: "bg-green-500/10 text-green-400",
  overdue: "bg-red-500/10 text-red-400",
};

type Props = {
  invoice: Invoice;
};

export default function InvoiceDetail({ invoice }: Props) {
  const router = useRouter();
  const { mutateAsync: updateStatus, isPending: isUpdating } =
    useUpdateInvoiceStatus();
  const { mutateAsync: deleteInvoice, isPending: isDeleting } =
    useDeleteInvoice();

  const handleStatusUpdate = async (status: Invoice["status"]) => {
    try {
      await updateStatus({ id: invoice.id, status });
      toast.success(`Invoice marked as ${status}`);
      router.refresh();
    } catch (error: any) {
      toast.error(error.message ?? "Failed to update status");
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this invoice?")) return;

    try {
      await deleteInvoice(invoice.id);
      toast.success("Invoice deleted");
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.message ?? "Failed to delete invoice");
    }
  };

  return (
    <div className="space-y-6">
      {/* Status + Actions */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-slate-400 text-xs uppercase tracking-wide">
              Current status
            </p>
            <Badge className={statusStyles[invoice.status]}>
              {invoice.status}
            </Badge>
          </div>
          <p className="text-amber-400 font-bold text-2xl">
            ₦{invoice.total.toLocaleString()}
          </p>
        </div>

        <Separator className="bg-slate-800" />

        {/* Status action buttons */}
        <div className="flex flex-wrap gap-2">
          {invoice.status !== "sent" && (
            <Button
              size="sm"
              onClick={() => handleStatusUpdate("sent")}
              disabled={isUpdating}
              variant="outline"
              className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10 hover:text-blue-300"
            >
              <Send size={14} className="mr-2" />
              Mark as sent
            </Button>
          )}
          {invoice.status !== "paid" && (
            <Button
              size="sm"
              onClick={() => handleStatusUpdate("paid")}
              disabled={isUpdating}
              className="bg-green-500/10 text-green-400 hover:bg-green-500/20 border border-green-500/30"
            >
              <CheckCircle size={14} className="mr-2" />
              Mark as paid
            </Button>
          )}
          {invoice.status !== "overdue" && (
            <Button
              size="sm"
              onClick={() => handleStatusUpdate("overdue")}
              disabled={isUpdating}
              variant="outline"
              className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300"
            >
              <AlertCircle size={14} className="mr-2" />
              Mark as overdue
            </Button>
          )}
          {invoice.status !== "draft" && (
            <Button
              size="sm"
              onClick={() => handleStatusUpdate("draft")}
              disabled={isUpdating}
              variant="outline"
              className="border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <Clock size={14} className="mr-2" />
              Revert to draft
            </Button>
          )}
        </div>
      </div>

      {/* Invoice details */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
        {/* Client + Dates */}
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-1">
            <p className="text-slate-500 text-xs uppercase tracking-wide">
              Billed to
            </p>
            <p className="text-white font-medium">{invoice.client_name}</p>
            <p className="text-slate-400 text-sm">{invoice.client_email}</p>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-slate-500 text-xs uppercase tracking-wide">
                Issue date
              </p>
              <p className="text-white text-sm">
                {format(new Date(invoice.issue_date), "MMM d, yyyy")}
              </p>
            </div>
            <div>
              <p className="text-slate-500 text-xs uppercase tracking-wide">
                Due date
              </p>
              <p className="text-white text-sm">
                {format(new Date(invoice.due_date), "MMM d, yyyy")}
              </p>
            </div>
          </div>
        </div>

        <Separator className="bg-slate-800" />

        {/* Line items */}
        <div className="space-y-3">
          <div className="grid grid-cols-12 gap-2">
            <p className="col-span-5 text-xs text-slate-500 uppercase tracking-wide">
              Description
            </p>
            <p className="col-span-2 text-xs text-slate-500 uppercase tracking-wide">
              Qty
            </p>
            <p className="col-span-3 text-xs text-slate-500 uppercase tracking-wide">
              Rate
            </p>
            <p className="col-span-2 text-xs text-slate-500 uppercase tracking-wide text-right">
              Amount
            </p>
          </div>

          {invoice.line_items.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-12 gap-2 py-2 border-b border-slate-800/50"
            >
              <p className="col-span-5 text-white text-sm">
                {item.description}
              </p>
              <p className="col-span-2 text-slate-400 text-sm">
                {item.quantity}
              </p>
              <p className="col-span-3 text-slate-400 text-sm">
                ₦{item.rate.toLocaleString()}
              </p>
              <p className="col-span-2 text-white text-sm font-medium text-right">
                ₦{(item.quantity * item.rate).toLocaleString()}
              </p>
            </div>
          ))}
        </div>

        <Separator className="bg-slate-800" />

        {/* Totals */}
        <div className="space-y-2 max-w-xs ml-auto">
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Subtotal</span>
            <span className="text-white">
              ₦{invoice.subtotal.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Tax ({invoice.tax_percent}%)</span>
            <span className="text-white">
              ₦{invoice.tax_amount.toLocaleString()}
            </span>
          </div>
          <Separator className="bg-slate-800" />
          <div className="flex justify-between font-semibold">
            <span className="text-white">Total</span>
            <span className="text-amber-400 text-lg">
              ₦{invoice.total.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Notes */}
        {invoice.notes && (
          <>
            <Separator className="bg-slate-800" />
            <div className="space-y-1">
              <p className="text-slate-500 text-xs uppercase tracking-wide">
                Notes
              </p>
              <p className="text-slate-300 text-sm">{invoice.notes}</p>
            </div>
          </>
        )}
      </div>

      {/* Danger zone */}
      <div className="bg-slate-900 border border-red-500/10 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white font-medium text-sm">Delete invoice</p>
            <p className="text-slate-500 text-xs mt-0.5">
              This action cannot be undone
            </p>
          </div>
          <Button
            size="sm"
            onClick={handleDelete}
            disabled={isDeleting}
            variant="outline"
            className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300"
          >
            <Trash2 size={14} className="mr-2" />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
