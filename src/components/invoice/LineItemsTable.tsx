"use client";

import { useInvoiceStore } from "@/stores/useInvoiceStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

export default function LineItemsTable() {
  const { form, addLineItem, updateLineItem, removeLineItem } =
    useInvoiceStore();

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-slate-300">Line items</h3>
        <Button
          type="button"
          size="sm"
          onClick={addLineItem}
          variant="outline"
          className="bg-slate-700 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 text-xs"
        >
          <Plus size={14} className="mr-1" />
          Add item
        </Button>
      </div>

      {form.line_items.length === 0 ? (
        <div
          onClick={addLineItem}
          className="border border-dashed border-slate-700 rounded-lg p-6 text-center cursor-pointer hover:border-amber-400/50 transition-colors"
        >
          <p className="text-slate-500 text-sm">
            Click to add your first line item
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {/* Header */}
          <div className="grid grid-cols-12 gap-2 px-1">
            <p className="col-span-5 text-xs text-slate-500">Description</p>
            <p className="col-span-2 text-xs text-slate-500">Qty</p>
            <p className="col-span-3 text-xs text-slate-500">Rate (₦)</p>
            <p className="col-span-2 text-xs text-slate-500 text-right">
              Amount
            </p>
          </div>

          {/* Rows */}
          {form.line_items.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-12 gap-2 items-center group"
            >
              <div className="col-span-5">
                <Input
                  placeholder="Service description"
                  value={item.description}
                  onChange={(e) =>
                    updateLineItem(item.id, "description", e.target.value)
                  }
                  className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-600 text-sm h-9"
                />
              </div>
              <div className="col-span-2">
                <Input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) =>
                    updateLineItem(item.id, "quantity", Number(e.target.value))
                  }
                  className="bg-slate-800 border-slate-700 text-white text-sm h-9"
                />
              </div>
              <div className="col-span-3">
                <Input
                  type="number"
                  min={0}
                  value={item.rate}
                  onChange={(e) =>
                    updateLineItem(item.id, "rate", Number(e.target.value))
                  }
                  className="bg-slate-800 border-slate-700 text-white text-sm h-9"
                />
              </div>
              <div className="col-span-2 flex items-center justify-end gap-1">
                <span className="text-slate-300 text-sm font-medium">
                  ₦{(item.quantity * item.rate).toLocaleString()}
                </span>
                <button
                  type="button"
                  onClick={() => removeLineItem(item.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-600 hover:text-red-400 ml-1"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
