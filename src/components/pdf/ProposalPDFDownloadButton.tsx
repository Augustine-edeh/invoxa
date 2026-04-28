"use client";

import { Proposal } from "@/types/proposal";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  proposal: Proposal;
};

export default function ProposalPDFDownloadButton({ proposal }: Props) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    setIsGenerating(true);

    try {
      const { profileService } = await import("@/services/profileService");
      const profile = await profileService.get();

      const senderName = profile?.full_name ?? "Augustine Edeh";
      const senderEmail = profile?.email ?? "info.augustinesedeh@gmail.com";
      const senderPhone = profile?.phone ?? "+234 907 666 5289";
      const senderBusiness = profile?.business_name ?? "";

      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF();

      const amber = [217, 119, 6] as const;
      const dark = [26, 26, 46] as const;
      const gray = [107, 114, 128] as const;
      const lightGray = [243, 244, 246] as const;

      const formatCurrency = (amount: number) =>
        `NGN ${amount.toLocaleString("en-NG")}`;

      // Header — brand
      doc.setFontSize(24);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...dark);
      doc.text("Inv", 20, 28);

      doc.setTextColor(...amber);
      doc.text("ox", 20 + doc.getTextWidth("Inv"), 28);

      doc.setTextColor(...dark);
      doc.text("a", 20 + doc.getTextWidth("Invox"), 28);

      // Proposal label + number
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...gray);
      doc.text("Proposal", 20, 36);

      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...dark);
      doc.text(`#${proposal.proposal_number}`, 20, 43);

      // Status badge
      const statusColors: Record<string, number[]> = {
        draft: [156, 163, 175],
        sent: [37, 99, 235],
        accepted: [22, 163, 74],
        declined: [220, 38, 38],
      };
      const statusColor = statusColors[proposal.status] ?? statusColors.draft;
      doc.setFontSize(8);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...(statusColor as [number, number, number]));
      doc.text(proposal.status.toUpperCase(), 190, 28, { align: "right" });

      // Sender details
      // Sender details from profile
      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...dark);
      doc.text(senderName, 190, 36, { align: "right" });

      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...gray);
      doc.text(senderEmail, 190, 42, { align: "right" });
      if (senderPhone) doc.text(senderPhone, 190, 48, { align: "right" });
      if (senderBusiness) doc.text(senderBusiness, 190, 54, { align: "right" });

      // Divider
      doc.setDrawColor(229, 231, 235);
      doc.setLineWidth(0.5);
      doc.line(20, 54, 190, 54);

      // Prepared for + Project
      doc.setFontSize(8);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...gray);
      doc.text("PREPARED FOR", 20, 64);
      doc.text("PROJECT", 120, 64);

      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...dark);
      doc.text(proposal.client_name, 20, 71);
      doc.text(proposal.project_title, 120, 71);

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...gray);
      doc.text(proposal.client_email, 20, 77);

      if (proposal.timeline) {
        doc.setFontSize(8);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(...gray);
        doc.text("TIMELINE", 120, 79);
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(...dark);
        doc.text(proposal.timeline, 120, 85);
      }

      // Divider
      doc.setDrawColor(229, 231, 235);
      doc.line(20, 92, 190, 92);

      let y = 102;

      // Scope
      if (proposal.scope) {
        doc.setFontSize(8);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(...gray);
        doc.text("PROJECT SCOPE", 20, y);
        y += 7;

        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(55, 65, 81);
        const scopeLines = doc.splitTextToSize(proposal.scope, 170);
        doc.text(scopeLines, 20, y);
        y += scopeLines.length * 6 + 8;

        doc.setDrawColor(229, 231, 235);
        doc.line(20, y, 190, y);
        y += 10;
      }

      // Deliverables
      if (proposal.deliverables.length > 0) {
        doc.setFontSize(8);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(...gray);
        doc.text("DELIVERABLES", 20, y);
        y += 7;

        proposal.deliverables.forEach((item, index) => {
          doc.setFontSize(10);
          doc.setFont("helvetica", "bold");
          doc.setTextColor(...amber);
          doc.text(`${index + 1}.`, 20, y);

          doc.setFont("helvetica", "normal");
          doc.setTextColor(55, 65, 81);
          const lines = doc.splitTextToSize(item.description, 160);
          doc.text(lines, 28, y);
          y += lines.length * 6 + 3;
        });

        y += 6;
        doc.setDrawColor(229, 231, 235);
        doc.line(20, y, 190, y);
        y += 10;
      }

      // Payment terms
      if (proposal.payment_terms) {
        doc.setFontSize(8);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(...gray);
        doc.text("PAYMENT TERMS", 20, y);
        y += 7;

        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(55, 65, 81);
        doc.text(proposal.payment_terms, 20, y);
        y += 12;

        doc.setDrawColor(229, 231, 235);
        doc.line(20, y, 190, y);
        y += 10;
      }

      // Total fee
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...gray);
      doc.text("Total project fee", 120, y);

      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...amber);
      doc.text(formatCurrency(proposal.total), 190, y + 1, { align: "right" });
      y += 14;

      // Notes
      if (proposal.notes) {
        y += 6;
        doc.setFillColor(255, 251, 235);
        doc.setDrawColor(...amber);
        doc.setLineWidth(1);
        doc.line(20, y - 4, 20, y + 16);
        doc.setLineWidth(0.5);

        doc.setFontSize(8);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(146, 64, 14);
        doc.text("NOTES", 26, y);

        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(120, 53, 15);
        const noteLines = doc.splitTextToSize(proposal.notes, 155);
        doc.text(noteLines, 26, y + 7);
      }

      // Footer
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(209, 213, 219);
      doc.text("Generated by", 20, 285);

      doc.setTextColor(...amber);
      doc.setFont("helvetica", "bold");
      doc.text("Invoxa", 20 + doc.getTextWidth("Generated by "), 285);
      doc.link(20, 281, doc.getTextWidth("Generated by Invoxa"), 5, {
        url: "https://invoxa.vercel.app",
      });

      doc.setTextColor(...amber);
      doc.setFont("helvetica", "bold");
      doc.text("invoxa.vercel.app", 190, 285, { align: "right" });
      doc.link(
        190 - doc.getTextWidth("invoxa.vercel.app"),
        281,
        doc.getTextWidth("invoxa.vercel.app"),
        5,
        { url: "https://invoxa.vercel.app" },
      );

      // Download
      const blob = doc.output("blob");
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `invoxa-${proposal.proposal_number}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success("PDF downloaded successfully");
    } catch (error: any) {
      toast.error("Failed to generate PDF");
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button
      size="sm"
      onClick={handleDownload}
      disabled={isGenerating}
      className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-semibold"
    >
      <Download size={14} className="mr-0 md:mr-1" />
      {isGenerating ? "Generating..." : "Download"}
    </Button>
  );
}
