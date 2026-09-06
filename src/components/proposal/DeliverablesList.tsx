"use client";

import { useProposalStore } from "@/stores/useProposalStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

export default function DeliverablesList() {
  const { form, addDeliverable, updateDeliverable, removeDeliverable } =
    useProposalStore();

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-slate-300">Deliverables</h3>
      </div>

      {form.deliverables.length === 0 ? (
        <div
          onClick={addDeliverable}
          className="border border-dashed border-slate-700 rounded-lg p-6 text-center cursor-pointer hover:border-amber-400/50 transition-colors"
        >
          <Plus size={16} className="mx-auto mb-2 text-slate-400" />

          <p className="text-slate-400 text-sm">
            Click to add your first deliverable
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {/* Deliverables */}
          <div className="space-y-2">
            {form.deliverables.map((item, index) => (
              <div key={item.id} className="flex items-center gap-2 group">
                <span className="text-slate-600 text-sm w-5 shrink-0">
                  {index + 1}.
                </span>

                <Input
                  placeholder="e.g. Responsive landing page design"
                  value={item.description}
                  onChange={(e) => updateDeliverable(item.id, e.target.value)}
                  className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-600 text-sm h-9"
                />

                <button
                  type="button"
                  onClick={() => removeDeliverable(item.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-600 hover:text-red-400 shrink-0"
                  aria-label="Remove deliverable"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>

          {/* Add another deliverable */}
          <Button
            type="button"
            size="sm"
            onClick={addDeliverable}
            variant="outline"
            className="w-full border-dashed bg-transparent border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800 hover:border-amber-400/50 text-xs"
          >
            <Plus size={14} className="mr-1" />
            Add deliverable
          </Button>
        </div>
      )}
    </div>
  );
}
