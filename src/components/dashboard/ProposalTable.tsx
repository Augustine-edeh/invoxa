"use client";

import { Proposal } from "@/types/proposal";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { FilePen, ChevronRight } from "lucide-react";

const statusStyles: Record<string, string> = {
  draft: "bg-slate-700 text-slate-300 hover:bg-slate-700",
  sent: "bg-blue-500/10 text-blue-400 hover:bg-blue-500/10",
  accepted: "bg-green-500/10 text-green-400 hover:bg-green-500/10",
  declined: "bg-red-500/10 text-red-400 hover:bg-red-500/10",
};

type Props = {
  proposals: Proposal[];
};

export default function ProposalTable({ proposals }: Props) {
  if (proposals.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <FilePen size={36} className="text-slate-700 mb-3" />
        <p className="text-slate-400 font-medium">No proposals yet</p>
        <p className="text-slate-600 text-sm mt-1">
          Create your first proposal to get started
        </p>
        <Link
          href="/dashboard/proposal/new"
          className="mt-4 text-sm text-amber-400 hover:text-amber-300 font-medium"
        >
          Create proposal →
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-800">
              <th className="text-left text-slate-500 font-medium pb-3 pr-4">
                Proposal
              </th>
              <th className="text-left text-slate-500 font-medium pb-3 pr-4">
                Client
              </th>
              <th className="text-left text-slate-500 font-medium pb-3 pr-4">
                Project
              </th>
              <th className="text-right text-slate-500 font-medium pb-3 pr-4">
                Value
              </th>
              <th className="text-left text-slate-500 font-medium pb-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {proposals.map((proposal) => (
              <tr
                key={proposal.id}
                className="hover:bg-slate-800/30 transition-colors group"
              >
                <td className="py-3 pr-4">
                  <Link
                    href={`/dashboard/proposal/${proposal.id}`}
                    className="text-white font-medium group-hover:text-amber-400 transition-colors"
                  >
                    #{proposal.proposal_number}
                  </Link>
                </td>
                <td className="py-3 pr-4 text-slate-300">
                  {proposal.client_name}
                </td>
                <td className="py-3 pr-4 text-slate-400">
                  {proposal.project_title}
                </td>
                <td className="py-3 pr-4 text-right text-white font-medium">
                  ₦{proposal.total.toLocaleString()}
                </td>
                <td className="py-3">
                  <Badge className={statusStyles[proposal.status]}>
                    {proposal.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile card list */}
      <div className="md:hidden space-y-2">
        {proposals.map((proposal) => (
          <Link
            key={proposal.id}
            href={`/dashboard/proposal/${proposal.id}`}
            className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <div className="space-y-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-white font-medium text-sm">
                  #{proposal.proposal_number}
                </span>
                <Badge className={statusStyles[proposal.status]}>
                  {proposal.status}
                </Badge>
              </div>
              <p className="text-slate-400 text-xs truncate">
                {proposal.client_name}
              </p>
              <p className="text-slate-500 text-xs truncate">
                {proposal.project_title}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0 ml-4">
              <span className="text-amber-400 font-semibold text-sm">
                ₦{proposal.total.toLocaleString()}
              </span>
              <ChevronRight size={16} className="text-slate-600" />
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
