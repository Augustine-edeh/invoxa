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
        <Button
          type="button"
          size="sm"
          onClick={addDeliverable}
          variant="outline"
          className="bg-slate-700 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 text-xs"
        >
          <Plus size={14} className="mr-0.5" />
          <span className="hidden sm:block">Add deliverable</span>
          <span className="sm:hidden">Deliverable</span>
        </Button>
      </div>

      {form.deliverables.length === 0 ? (
        <div
          onClick={addDeliverable}
          className="border border-dashed border-slate-700 rounded-lg p-6 text-center cursor-pointer hover:border-amber-400/50 transition-colors"
        >
          <p className="text-slate-500 text-sm">
            Click to add your first deliverable
          </p>
        </div>
      ) : (
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
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
