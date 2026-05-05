import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import ProposalDetail from "@/components/proposal/ProposalDetail";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProposalDetailPage({ params }: Props) {
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
          href="/dashboard"
          className="flex items-center gap-1 text-slate-500 hover:text-slate-300 text-sm transition-colors w-fit"
        >
          <ChevronLeft size={16} />
          Back to dashboard
        </Link>
        <h1 className="text-2xl font-bold text-white">
          Proposal #{proposal.proposal_number}
        </h1>
        <p className="text-slate-400 text-sm">
          Created{" "}
          {new Date(proposal.created_at).toLocaleDateString("en-NG", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
      <ProposalDetail proposal={proposal} />
    </div>
  );
}
