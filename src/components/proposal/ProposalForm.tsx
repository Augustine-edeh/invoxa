"use client";

import { proposalService } from "@/services/proposalService";
import { useProposalStore } from "@/stores/useProposalStore";
import { useCreateProposal } from "@/hooks/useProposals";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import DeliverablesList from "./DeliverablesList";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Save, Send } from "lucide-react";

export default function ProposalForm() {
  const { form, setField, reset, getCreateInput } = useProposalStore();
  const { mutateAsync: createProposal, isPending } = useCreateProposal();
  const router = useRouter();

  useEffect(() => {
    if (!form.proposal_number) {
      proposalService.generateNumber().then((number) => {
        setField("proposal_number", number);
      });
    }
  }, []);

  const handleSave = async (status: "draft" | "sent") => {
    if (!form.client_name || !form.client_email) {
      toast.error("Client name and email are required");
      return;
    }

    if (!form.project_title) {
      toast.error("Project title is required");
      return;
    }

    if (form.deliverables.length === 0) {
      toast.error("Add at least one deliverable");
      return;
    }

    if (!form.total || form.total <= 0) {
      toast.error("Project fee must be greater than zero");
      return;
    }

    try {
      setField("status", status);
      const input = getCreateInput();
      await createProposal({ ...input, status });

      toast.success(
        status === "draft"
          ? "Proposal saved as draft"
          : "Proposal saved and marked as sent",
      );

      reset();
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.message ?? "Failed to save proposal");
    }
  };

  return (
    <div className="space-y-6">
      {/* Proposal meta */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-slate-300">Proposal number</Label>
          <Input
            value={form.proposal_number}
            onChange={(e) => setField("proposal_number", e.target.value)}
            className="bg-slate-800 border-slate-700 text-white"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-slate-300">Project title</Label>
          <Input
            placeholder="e.g. Fintech Web App Redesign"
            value={form.project_title}
            onChange={(e) => setField("project_title", e.target.value)}
            className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-600"
          />
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

      {/* Scope */}
      <div className="space-y-2">
        <Label className="text-slate-300">Project scope</Label>
        <Textarea
          placeholder="Describe what the project covers, goals, and any important context..."
          value={form.scope}
          onChange={(e) => setField("scope", e.target.value)}
          className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-600 resize-none"
          rows={4}
        />
      </div>

      <Separator className="bg-slate-800" />

      {/* Deliverables */}
      <DeliverablesList />

      <Separator className="bg-slate-800" />

      {/* Timeline + Payment terms */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-slate-300">Timeline</Label>
          <Input
            placeholder="e.g. 4 weeks"
            value={form.timeline}
            onChange={(e) => setField("timeline", e.target.value)}
            className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-600"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-slate-300">Payment terms</Label>
          <Input
            placeholder="e.g. 50% upfront, 50% on delivery"
            value={form.payment_terms}
            onChange={(e) => setField("payment_terms", e.target.value)}
            className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-600"
          />
        </div>
      </div>

      <Separator className="bg-slate-800" />

      {/* Total fee */}
      <div className="space-y-2">
        <Label className="text-slate-300">Total project fee (₦)</Label>
        <Input
          type="number"
          min={0}
          placeholder="0"
          value={form.total || ""}
          onChange={(e) => setField("total", Number(e.target.value))}
          className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-600 text-lg font-semibold"
        />
      </div>

      <Separator className="bg-slate-800" />

      {/* Notes */}
      <div className="space-y-2">
        <Label className="text-slate-300">Additional notes (optional)</Label>
        <Textarea
          placeholder="Any other terms, conditions, or notes for the client..."
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
          className="bg-slate-700 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800"
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
