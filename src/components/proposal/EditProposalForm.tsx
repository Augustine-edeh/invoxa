"use client"

import { useEffect } from "react"
import { useProposalStore } from "@/stores/useProposalStore"
import { useUpdateProposal } from "@/hooks/useProposals"
import { Proposal } from "@/types/proposal"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import DeliverablesList from "./DeliverablesList"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Save } from "lucide-react"

type Props = {
  proposal: Proposal
}

export default function EditProposalForm({ proposal }: Props) {
  const { form, setField, reset, getCreateInput } = useProposalStore()
  const { mutateAsync: updateProposal, isPending } = useUpdateProposal(
    proposal.id
  )
  const router = useRouter()

  useEffect(() => {
    reset()
    setField("proposal_number", proposal.proposal_number)
    setField("client_name", proposal.client_name)
    setField("client_email", proposal.client_email)
    setField("project_title", proposal.project_title)
    setField("scope", proposal.scope ?? "")
    setField("deliverables", proposal.deliverables)
    setField("timeline", proposal.timeline ?? "")
    setField("payment_terms", proposal.payment_terms ?? "")
    setField("total", proposal.total)
    setField("status", proposal.status)
    setField("notes", proposal.notes ?? "")
  }, [proposal.id])

  const handleSave = async () => {
    if (!form.client_name || !form.client_email) {
      toast.error("Client name and email are required")
      return
    }

    if (!form.project_title) {
      toast.error("Project title is required")
      return
    }

    if (form.deliverables.length === 0) {
      toast.error("Add at least one deliverable")
      return
    }

    if (!form.total || form.total <= 0) {
      toast.error("Project fee must be greater than zero")
      return
    }

    try {
      const input = getCreateInput()
      await updateProposal(input)

      toast.success("Proposal updated successfully")
      reset()
      router.push(`/dashboard/proposal/${proposal.id}`)
    } catch (error: any) {
      toast.error(error.message ?? "Failed to update proposal")
    }
  }

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
            value={form.project_title}
            onChange={(e) => setField("project_title", e.target.value)}
            className="bg-slate-800 border-slate-700 text-white"
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
              value={form.client_name}
              onChange={(e) => setField("client_name", e.target.value)}
              className="bg-slate-800 border-slate-700 text-white"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-slate-300">Client email</Label>
            <Input
              type="email"
              value={form.client_email}
              onChange={(e) => setField("client_email", e.target.value)}
              className="bg-slate-800 border-slate-700 text-white"
            />
          </div>
        </div>
      </div>

      <Separator className="bg-slate-800" />

      {/* Scope */}
      <div className="space-y-2">
        <Label className="text-slate-300">Project scope</Label>
        <Textarea
          placeholder="Describe what the project covers..."
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
          value={form.total || ""}
          onChange={(e) => setField("total", Number(e.target.value))}
          className="bg-slate-800 border-slate-700 text-white text-lg font-semibold"
        />
      </div>

      <Separator className="bg-slate-800" />

      {/* Notes */}
      <div className="space-y-2">
        <Label className="text-slate-300">Additional notes (optional)</Label>
        <Textarea
          placeholder="Any other terms or conditions..."
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
          onClick={handleSave}
          disabled={isPending}
          className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-semibold"
        >
          <Save size={16} className="mr-2" />
          {isPending ? "Saving..." : "Save changes"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push(`/dashboard/proposal/${proposal.id}`)}
          className="border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800"
        >
          Cancel
        </Button>
      </div>
    </div>
  )
}