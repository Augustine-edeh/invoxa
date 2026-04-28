"use client";

import { Invoice } from "@/types/invoice";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  invoice: Invoice;
};

export default function InvoicePDFDownloadButton({ invoice }: Props) {
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
        `N${amount.toLocaleString("en-NG")}`;

      // Header — brand
      doc.setFontSize(24);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...dark);
      doc.text("Inv", 20, 28);

      doc.setTextColor(...amber);
      doc.text("ox", 20 + doc.getTextWidth("Inv"), 28);

      doc.setTextColor(...dark);
      doc.text("a", 20 + doc.getTextWidth("Invox"), 28);

      // Invoice label + number
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...gray);
      doc.text("Invoice", 20, 36);

      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...dark);
      doc.text(`#${invoice.invoice_number}`, 20, 43);

      // Status badge top right
      const statusColors: Record<string, number[]> = {
        draft: [156, 163, 175],
        sent: [37, 99, 235],
        paid: [22, 163, 74],
        overdue: [220, 38, 38],
      };
      const statusColor = statusColors[invoice.status] ?? statusColors.draft;
      doc.setFontSize(8);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...(statusColor as [number, number, number]));
      doc.text(invoice.status.toUpperCase(), 190, 28, { align: "right" });

      // Your business details (top right)
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
      doc.line(20, 50, 190, 50);

      // Billed to + Dates
      doc.setFontSize(8);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...gray);
      doc.text("BILLED TO", 20, 60);
      doc.text("ISSUE DATE", 120, 60);
      doc.text("DUE DATE", 120, 75);

      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...dark);
      doc.text(invoice.client_name, 20, 67);

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...gray);
      doc.text(invoice.client_email, 20, 73);

      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...dark);
      doc.text(
        new Date(invoice.issue_date).toLocaleDateString("en-NG", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        120,
        67,
      );
      doc.text(
        new Date(invoice.due_date).toLocaleDateString("en-NG", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        120,
        82,
      );

      // Second divider
      doc.setDrawColor(229, 231, 235);
      doc.line(20, 90, 190, 90);

      // Table header
      doc.setFillColor(...lightGray);
      doc.rect(20, 94, 170, 10, "F");

      doc.setFontSize(8);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...gray);
      doc.text("DESCRIPTION", 24, 101);
      doc.text("QTY", 120, 101);
      doc.text("RATE", 145, 101);
      doc.text("AMOUNT", 190, 101, { align: "right" });

      // Line items
      let y = 112;
      invoice.line_items.forEach((item, index) => {
        if (index % 2 !== 0) {
          doc.setFillColor(250, 250, 250);
          doc.rect(20, y - 5, 170, 10, "F");
        }

        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(...dark);
        doc.text(item.description, 24, y);

        doc.setTextColor(...gray);
        doc.text(String(item.quantity), 120, y);
        doc.text(formatCurrency(item.rate), 145, y);

        doc.setFont("helvetica", "bold");
        doc.setTextColor(...dark);
        doc.text(formatCurrency(item.quantity * item.rate), 190, y, {
          align: "right",
        });

        y += 12;
      });

      // Totals
      y += 6;
      doc.setDrawColor(229, 231, 235);
      doc.line(120, y, 190, y);
      y += 6;

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...gray);
      doc.text("Subtotal", 120, y);
      doc.setTextColor(...dark);
      doc.text(formatCurrency(invoice.subtotal), 190, y, { align: "right" });
      y += 8;

      doc.setTextColor(...gray);
      doc.text(`Tax (${invoice.tax_percent}%)`, 120, y);
      doc.setTextColor(...dark);
      doc.text(formatCurrency(invoice.tax_amount), 190, y, { align: "right" });
      y += 6;

      doc.setDrawColor(229, 231, 235);
      doc.line(120, y, 190, y);
      y += 8;

      doc.setFontSize(13);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...dark);
      doc.text("Total", 120, y);
      doc.setTextColor(...amber);
      doc.text(formatCurrency(invoice.total), 190, y, { align: "right" });

      // Notes
      if (invoice.notes) {
        y += 20;
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
        const noteLines = doc.splitTextToSize(invoice.notes, 155);
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

      //   doc.save(`invoxa-${invoice.invoice_number}.pdf`);

      const blob = doc.output("blob");
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `invoxa-${invoice.invoice_number}.pdf`;
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
