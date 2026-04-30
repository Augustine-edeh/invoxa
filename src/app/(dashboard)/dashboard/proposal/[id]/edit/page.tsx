import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import EditProposalForm from "@/components/proposal/EditProposalForm";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditProposalPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: proposal, error } = await supabase
    .from("proposals")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !proposal) notFound();

  return (
    <div className="p-6 md:p-8 max-w-3xl mx-auto space-y-6 py-24 md:pb-8">
      <div className="space-y-1">
        <Link
          href={`/dashboard/proposal/${id}`}
          className="flex items-center gap-1 text-slate-500 hover:text-slate-300 text-sm transition-colors w-fit"
        >
          <ChevronLeft size={16} />
          Back to proposal
        </Link>
        <h1 className="text-2xl font-bold text-white">
          Edit proposal #{proposal.proposal_number}
        </h1>
        <p className="text-slate-400 text-sm">
          Make changes and save to update the proposal
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <EditProposalForm proposal={proposal} />
      </div>
    </div>
  );
}
