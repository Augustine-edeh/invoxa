"use client";

import { invoiceService } from "@/services/invoiceService";
import { useInvoiceStore } from "@/stores/useInvoiceStore";
import { useCreateInvoice } from "@/hooks/useInvoices";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import LineItemsTable from "./LineItemsTable";
import InvoiceSummary from "./InvoiceSummary";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Save, Send } from "lucide-react";

export default function InvoiceForm() {
  const { form, setField, reset, getCreateInput } = useInvoiceStore();
  const { mutateAsync: createInvoice, isPending } = useCreateInvoice();
  const router = useRouter();

  // Auto-generate invoice number on mount
  useEffect(() => {
    if (!form.invoice_number) {
      invoiceService.generateNumber().then((number) => {
        setField("invoice_number", number);
      });
    }
  }, []);

  const handleSave = async (status: "draft" | "sent") => {
    if (!form.client_name || !form.client_email) {
      toast.error("Client name and email are required");
      return;
    }

    if (!form.issue_date || !form.due_date) {
      toast.error("Issue date and due date are required");
      return;
    }

    if (form.line_items.length === 0) {
      toast.error("Add at least one line item");
      return;
    }

    try {
      setField("status", status);
      const input = getCreateInput();
      await createInvoice({ ...input, status });

      toast.success(
        status === "draft"
          ? "Invoice saved as draft"
          : "Invoice saved and marked as sent",
      );

      reset();
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.message ?? "Failed to save invoice");
    }
  };

  return (
    <div className="space-y-6">
      {/* Invoice meta */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-slate-300">Invoice number</Label>
          <Input
            value={form.invoice_number}
            onChange={(e) => setField("invoice_number", e.target.value)}
            className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-600"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-slate-300">Status</Label>
          <div className="flex items-center gap-2 h-10 px-3 rounded-md border border-slate-700 bg-slate-800">
            <span className="text-slate-400 text-sm capitalize">
              {form.status}
            </span>
          </div>
        </div>
      </div>

      <Separator className="bg-slate-800" />

      {/* Client info */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-slate-300">Client details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-slate-300">Client name</Label>
            <Input
              placeholder="Acme Corp"
              value={form.client_name}
              onChange={(e) => setField("client_name", e.target.value)}
              className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-600"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-slate-300">Client email</Label>
            <Input
              type="email"
              placeholder="client@example.com"
              value={form.client_email}
              onChange={(e) => setField("client_email", e.target.value)}
              className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-600"
            />
          </div>
        </div>
      </div>

      <Separator className="bg-slate-800" />

      {/* Dates */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-slate-300">Dates</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-slate-300">Issue date</Label>
            <Input
              type="date"
              value={form.issue_date}
              onChange={(e) => setField("issue_date", e.target.value)}
              className="bg-slate-800 border-slate-700 text-white"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-slate-300">Due date</Label>
            <Input
              type="date"
              value={form.due_date}
              onChange={(e) => setField("due_date", e.target.value)}
              className="bg-slate-800 border-slate-700 text-white"
            />
          </div>
        </div>
      </div>

      <Separator className="bg-slate-800" />

      {/* Line items */}
      <LineItemsTable />

      <Separator className="bg-slate-800" />

      {/* Summary */}
      <InvoiceSummary />

      <Separator className="bg-slate-800" />

      {/* Notes */}
      <div className="space-y-2">
        <Label className="text-slate-300">Notes (optional)</Label>
        <Textarea
          placeholder="Payment instructions, bank details, or any other notes..."
          value={form.notes}
          onChange={(e) => setField("notes", e.target.value)}
          className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-600 resize-none"
          rows={3}
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2">
        <Button
          type="button"
          onClick={() => handleSave("draft")}
          disabled={isPending}
          variant="outline"
          className="border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800"
        >
          <Save size={16} className="mr-2" />
          Save draft
        </Button>
        <Button
          type="button"
          onClick={() => handleSave("sent")}
          disabled={isPending}
          className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-semibold"
        >
          <Send size={16} className="mr-2" />
          Mark as sent
        </Button>
      </div>
    </div>
  );
}
