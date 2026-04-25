"use client";

import { Invoice } from "@/types/invoice";
import { Proposal } from "@/types/proposal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatsCard from "./StatsCard";
import InvoiceTable from "./InvoiceTable";
import ProposalTable from "./ProposalTable";
import RecentDocuments from "./RecentDocuments";
import Link from "next/link";
import { Plus, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  invoices: Invoice[];
  proposals: Proposal[];
};

export default function DashboardClient({ invoices, proposals }: Props) {
  const totalEarned = invoices
    .filter((i) => i.status === "paid")
    .reduce((sum, i) => sum + i.total, 0);

  const totalPending = invoices
    .filter((i) => i.status === "sent")
    .reduce((sum, i) => sum + i.total, 0);

  const totalOverdue = invoices
    .filter((i) => i.status === "overdue")
    .reduce((sum, i) => sum + i.total, 0);

  const totalProposalValue = proposals
    .filter((p) => p.status === "accepted")
    .reduce((sum, p) => sum + p.total, 0);

  const totalRevenue = totalEarned + totalPending;

  return (
    <div className="p-6 md:p-8 space-y-6 pb-24 md:pb-8">
      {/* Mobile hero revenue */}
      <div className="md:hidden space-y-1 mt-10">
        <p className="text-slate-500 text-xs uppercase tracking-wider">
          Total revenue
        </p>
        <p className="text-4xl font-bold text-white">
          ₦{totalRevenue.toLocaleString()}
        </p>
        {totalEarned > 0 && (
          <div className="flex items-center gap-1 text-green-400 text-sm">
            <TrendingUp size={14} />
            <span>₦{totalEarned.toLocaleString()} earned</span>
          </div>
        )}
      </div>

      {/* Desktop header */}
      <div className="hidden md:flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-slate-400 text-sm mt-1">
            Track your invoices and proposals
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/dashboard/invoice/new">
            <Button
              size="sm"
              className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-semibold"
            >
              <Plus size={16} className="mr-1" />
              New invoice
            </Button>
          </Link>
          <Link href="/dashboard/proposal/new">
            <Button
              size="sm"
              variant="outline"
              className="border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800"
            >
              <Plus size={16} className="mr-1" />
              New proposal
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none -mx-6 px-6 md:mx-0 md:px-0 md:grid md:grid-cols-4">
        <div className="shrink-0 w-[180px] md:w-auto">
          <StatsCard
            title="Total earned"
            value={`₦${totalEarned.toLocaleString()}`}
            sub={`${invoices.filter((i) => i.status === "paid").length} paid invoices`}
            accent
          />
        </div>
        <div className="shrink-0 w-[180px] md:w-auto">
          <StatsCard
            title="Pending"
            value={`₦${totalPending.toLocaleString()}`}
            sub={`${invoices.filter((i) => i.status === "sent").length} awaiting payment`}
          />
        </div>
        <div className="shrink-0 w-[180px] md:w-auto">
          <StatsCard
            title="Overdue"
            value={`₦${totalOverdue.toLocaleString()}`}
            sub={`${invoices.filter((i) => i.status === "overdue").length} overdue`}
          />
        </div>
        <div className="shrink-0 w-[180px] md:w-auto">
          <StatsCard
            title="Proposals won"
            value={`₦${totalProposalValue.toLocaleString()}`}
            sub={`${proposals.filter((p) => p.status === "accepted").length} accepted`}
          />
        </div>
      </div>

      {/* Mobile recent documents */}
      <div className="md:hidden">
        <RecentDocuments invoices={invoices} proposals={proposals} />
      </div>

      {/* Desktop tables */}
      <div className="hidden md:block bg-slate-900 border border-slate-800 rounded-xl p-6">
        <Tabs defaultValue="invoices">
          <div className="flex items-center justify-between mb-6">
            <TabsList className="bg-slate-800">
              <TabsTrigger
                value="invoices"
                className="data-[state=active]:bg-slate-700 data-[state=active]:text-white text-slate-400"
              >
                Invoices ({invoices.length})
              </TabsTrigger>
              <TabsTrigger
                value="proposals"
                className="data-[state=active]:bg-slate-700 data-[state=active]:text-white text-slate-400"
              >
                Proposals ({proposals.length})
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="invoices">
            <InvoiceTable invoices={invoices} />
          </TabsContent>

          <TabsContent value="proposals">
            <ProposalTable proposals={proposals} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
