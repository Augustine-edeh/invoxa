"use client";

import { useInvoiceStore } from "@/stores/useInvoiceStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function InvoiceSummary() {
  const { form, setField, computeTotals } = useInvoiceStore();

  return (
    <div className="bg-slate-800/50 rounded-lg p-4 space-y-3">
      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-400">Subtotal</span>
        <span className="text-white font-medium">
          ₦{form.subtotal.toLocaleString()}
        </span>
      </div>

      <div className="flex items-center justify-between gap-4">
        <Label className="text-slate-400 text-sm whitespace-nowrap">
          Tax (%)
        </Label>
        <Input
          type="number"
          min={0}
          max={100}
          value={form.tax_percent}
          onChange={(e) => {
            setField("tax_percent", Number(e.target.value));
            computeTotals();
          }}
          className="bg-slate-800 border-slate-700 text-white text-sm h-8 w-24 text-right"
        />
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-400">Tax amount</span>
        <span className="text-white">₦{form.tax_amount.toLocaleString()}</span>
      </div>

      <Separator className="bg-slate-700" />

      <div className="flex items-center justify-between">
        <span className="text-white font-semibold">Total</span>
        <span className="text-amber-400 font-bold text-lg">
          ₦{form.total.toLocaleString()}
        </span>
      </div>
    </div>
  );
}
