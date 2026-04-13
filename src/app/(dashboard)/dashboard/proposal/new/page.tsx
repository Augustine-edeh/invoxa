import ProposalForm from "@/components/proposal/ProposalForm";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function NewProposalPage() {
  return (
    <div className="p-6 md:p-8 max-w-3xl mx-auto space-y-6">
      <div className="space-y-1">
        <Link
          href="/dashboard"
          className="flex items-center gap-1 text-slate-500 hover:text-slate-300 text-sm transition-colors w-fit"
        >
          <ChevronLeft size={16} />
          Back to dashboard
        </Link>
        <h1 className="text-2xl font-bold text-white">New proposal</h1>
        <p className="text-slate-400 text-sm">
          Fill in the details below to create a new proposal
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <ProposalForm />
      </div>
    </div>
  );
}
