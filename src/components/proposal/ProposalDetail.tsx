"use client";

import Link from "next/link";
import { useState } from "react";
import { Proposal } from "@/types/proposal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  useUpdateProposalStatus,
  useDeleteProposal,
} from "@/hooks/useProposals";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  CheckCircle,
  Send,
  Trash2,
  XCircle,
  Clock,
  Edit,
  Mail,
} from "lucide-react";
import ProposalPDFDownloadButton from "@/components/pdf/ProposalPDFDownloadButton";

const statusStyles: Record<string, string> = {
  draft: "bg-slate-700 text-slate-300",
  sent: "bg-blue-500/10 text-blue-400",
  accepted: "bg-green-500/10 text-green-400",
  declined: "bg-red-500/10 text-red-400",
};

type Props = {
  proposal: Proposal;
};

export default function ProposalDetail({ proposal }: Props) {
  const router = useRouter();
  const { mutateAsync: updateStatus, isPending: isUpdating } =
    useUpdateProposalStatus();
  const { mutateAsync: deleteProposal, isPending: isDeleting } =
    useDeleteProposal();

  const [isSending, setIsSending] = useState(false);

  const handleSendEmail = async () => {
    if (!confirm(`Send proposal to ${proposal.client_email}?`)) return;

    setIsSending(true);

    try {
      const res = await fetch("/api/send-proposal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ proposalId: proposal.id }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      toast.success(`Proposal sent to ${proposal.client_email}`);
      router.refresh();
    } catch (error: any) {
      toast.error(error.message ?? "Failed to send email");
    } finally {
      setIsSending(false);
    }
  };

  const handleStatusUpdate = async (status: Proposal["status"]) => {
    try {
      await updateStatus({ id: proposal.id, status });
      toast.success(`Proposal marked as ${status}`);
      router.refresh();
    } catch (error: any) {
      toast.error(error.message ?? "Failed to update status");
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this proposal?")) return;

    try {
      await deleteProposal(proposal.id);
      toast.success("Proposal deleted");
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.message ?? "Failed to delete proposal");
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
            <Badge className={statusStyles[proposal.status]}>
              {proposal.status}
            </Badge>
          </div>
          <p className="text-amber-400 font-bold text-2xl">
            ₦{proposal.total.toLocaleString()}
          </p>
        </div>

        {/* Actions & PDF Download buttons*/}
        <div className="flex flex-wrap justify-end gap-2">
          <Link href={`/dashboard/proposal/${proposal.id}/edit`}>
            <Button
              size="sm"
              variant="outline"
              className="border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800"
            >
              <Edit size={14} className="mr-2" />
              Edit
            </Button>
          </Link>
          <Button
            size="sm"
            onClick={handleSendEmail}
            disabled={isSending}
            variant="outline"
            className="border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800"
          >
            <Mail size={14} className="mr-2" />
            {isSending ? "Sending..." : "Email to client"}
          </Button>
          <ProposalPDFDownloadButton proposal={proposal} />
        </div>

        <Separator className="bg-slate-800" />

        <div className="flex flex-wrap gap-2">
          <Link href={`/dashboard/proposal/${proposal.id}/edit`}>
            <Button
              size="sm"
              variant="outline"
              className="border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800"
            >
              <Edit size={14} className="mr-2" />
              Edit
            </Button>
          </Link>
          {proposal.status !== "sent" && (
            <Button
              size="sm"
              onClick={() => handleStatusUpdate("sent")}
              disabled={isUpdating}
              variant="outline"
              className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
            >
              <Send size={14} className="mr-2" />
              Mark as sent
            </Button>
          )}
          {proposal.status !== "accepted" && (
            <Button
              size="sm"
              onClick={() => handleStatusUpdate("accepted")}
              disabled={isUpdating}
              className="bg-green-500/10 text-green-400 hover:bg-green-500/20 border border-green-500/30"
            >
              <CheckCircle size={14} className="mr-2" />
              Mark as accepted
            </Button>
          )}
          {proposal.status !== "declined" && (
            <Button
              size="sm"
              onClick={() => handleStatusUpdate("declined")}
              disabled={isUpdating}
              variant="outline"
              className="border-red-500/30 text-red-400 hover:bg-red-500/10"
            >
              <XCircle size={14} className="mr-2" />
              Mark as declined
            </Button>
          )}
          {proposal.status !== "draft" && (
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

      {/* Proposal details */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
        {/* Client + Project */}
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-1">
            <p className="text-slate-500 text-xs uppercase tracking-wide">
              Prepared for
            </p>
            <p className="text-white font-medium">{proposal.client_name}</p>
            <p className="text-slate-400 text-sm">{proposal.client_email}</p>
          </div>
          <div className="space-y-1">
            <p className="text-slate-500 text-xs uppercase tracking-wide">
              Project
            </p>
            <p className="text-white font-medium">{proposal.project_title}</p>
            {proposal.timeline && (
              <p className="text-slate-400 text-sm">
                Timeline: {proposal.timeline}
              </p>
            )}
          </div>
        </div>

        {/* Scope */}
        {proposal.scope && (
          <>
            <Separator className="bg-slate-800" />
            <div className="space-y-2">
              <p className="text-slate-500 text-xs uppercase tracking-wide">
                Project scope
              </p>
              <p className="text-slate-300 text-sm leading-relaxed">
                {proposal.scope}
              </p>
            </div>
          </>
        )}

        {/* Deliverables */}
        {proposal.deliverables.length > 0 && (
          <>
            <Separator className="bg-slate-800" />
            <div className="space-y-2">
              <p className="text-slate-500 text-xs uppercase tracking-wide">
                Deliverables
              </p>
              <ul className="space-y-1">
                {proposal.deliverables.map((d, index) => (
                  <li key={d.id} className="flex items-start gap-2 text-sm">
                    <span className="text-amber-400 font-medium shrink-0">
                      {index + 1}.
                    </span>
                    <span className="text-slate-300">{d.description}</span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}

        {/* Payment terms */}
        {proposal.payment_terms && (
          <>
            <Separator className="bg-slate-800" />
            <div className="space-y-1">
              <p className="text-slate-500 text-xs uppercase tracking-wide">
                Payment terms
              </p>
              <p className="text-slate-300 text-sm">{proposal.payment_terms}</p>
            </div>
          </>
        )}

        <Separator className="bg-slate-800" />

        {/* Total */}
        <div className="flex justify-between items-center">
          <span className="text-white font-semibold">Total project fee</span>
          <span className="text-amber-400 font-bold text-xl">
            ₦{proposal.total.toLocaleString()}
          </span>
        </div>

        {/* Notes */}
        {proposal.notes && (
          <>
            <Separator className="bg-slate-800" />
            <div className="space-y-1">
              <p className="text-slate-500 text-xs uppercase tracking-wide">
                Notes
              </p>
              <p className="text-slate-300 text-sm">{proposal.notes}</p>
            </div>
          </>
        )}
      </div>

      {/* Danger zone */}
      <div className="bg-slate-900 border border-red-500/10 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white font-medium text-sm">Delete proposal</p>
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
