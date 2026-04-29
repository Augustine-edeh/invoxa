import { Resend } from "resend";
import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { proposalId } = await request.json();

    if (!proposalId) {
      return NextResponse.json(
        { error: "Proposal ID is required" },
        { status: 400 },
      );
    }

    const { data: proposal, error: proposalError } = await supabase
      .from("proposals")
      .select("*")
      .eq("id", proposalId)
      .eq("user_id", user.id)
      .single();

    if (proposalError || !proposal) {
      return NextResponse.json(
        { error: "Proposal not found" },
        { status: 404 },
      );
    }

    // Fetch sender profile
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    const senderName = profile?.full_name ?? "Augustine Edeh";
    const senderEmail = profile?.email ?? "info.augustinesedeh@gmail.com";
    const senderPhone = profile?.phone ?? "+234 907 666 5289";
    const senderBusiness = profile?.business_name ?? "";

    const formatCurrency = (amount: number) =>
      `NGN ${amount.toLocaleString("en-NG")}`;

    // Build deliverables HTML
    const deliverablesHTML = proposal.deliverables
      .map(
        (item: any, index: number) => `
        <tr style="background-color: ${index % 2 === 0 ? "#ffffff" : "#f9fafb"}">
          <td style="padding: 10px 12px;">
            <span style="color: #d97706; font-weight: 700; margin-right: 8px;">${index + 1}.</span>
            <span style="font-size: 14px; color: #374151;">${item.description}</span>
          </td>
        </tr>
      `,
      )
      .join("");

    const notesSection = proposal.notes
      ? `
        <div style="margin-top: 32px; padding: 16px; background-color: #fffbeb; border-left: 3px solid #d97706; border-radius: 4px;">
          <p style="margin: 0 0 6px; font-size: 11px; font-weight: 700; color: #92400e; text-transform: uppercase; letter-spacing: 0.8px;">Notes</p>
          <p style="margin: 0; font-size: 13px; color: #78350f; line-height: 1.6;">${proposal.notes}</p>
        </div>
      `
      : "";

    const scopeSection = proposal.scope
      ? `
        <div style="margin-bottom: 24px;">
          <p style="margin: 0 0 8px; font-size: 11px; font-weight: 700; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.8px;">Project scope</p>
          <p style="margin: 0; font-size: 14px; color: #374151; line-height: 1.7;">${proposal.scope}</p>
        </div>
      `
      : "";

    const paymentTermsSection = proposal.payment_terms
      ? `
        <div style="margin-top: 20px; padding: 14px; background-color: #f9fafb; border-radius: 8px;">
          <p style="margin: 0 0 4px; font-size: 11px; font-weight: 700; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.8px;">Payment terms</p>
          <p style="margin: 0; font-size: 14px; color: #374151;">${proposal.payment_terms}</p>
        </div>
      `
      : "";

    const { data, error } = await resend.emails.send({
      from: "Invoxa <onboarding@resend.dev>",
      to: user.email!,
      subject: `Proposal from ${senderName} — ${proposal.project_title}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
          <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">

            <!-- Header -->
            <div style="background-color: #0f172a; padding: 32px 40px;">
              <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #ffffff; letter-spacing: 1px;">
                Inv<span style="color: #d97706;">ox</span>a
              </h1>
              <p style="margin: 6px 0 0; font-size: 13px; color: #94a3b8;">Proposal from ${senderName}</p>
            </div>

            <!-- Proposal info bar -->
            <div style="background-color: #1e293b; padding: 16px 40px;">
              <div style="display: flex; justify-content: space-between;">
                <div>
                  <p style="margin: 0; font-size: 11px; color: #64748b; text-transform: uppercase; letter-spacing: 0.8px;">Proposal number</p>
                  <p style="margin: 4px 0 0; font-size: 15px; font-weight: 700; color: #ffffff;">#${proposal.proposal_number}</p>
                </div>
                <div style="text-align: right;">
                  <p style="margin: 0; font-size: 11px; color: #64748b; text-transform: uppercase; letter-spacing: 0.8px;">Project value</p>
                  <p style="margin: 4px 0 0; font-size: 15px; font-weight: 700; color: #d97706;">${formatCurrency(proposal.total)}</p>
                </div>
              </div>
            </div>

            <!-- Body -->
            <div style="padding: 40px;">

              <p style="margin: 0 0 24px; font-size: 15px; color: #374151; line-height: 1.6;">
                Hi <strong>${proposal.client_name}</strong>,
              </p>
              <p style="margin: 0 0 32px; font-size: 15px; color: #374151; line-height: 1.6;">
                Thank you for the opportunity. Please find below the proposal for <strong>${proposal.project_title}</strong>. I look forward to working with you.
              </p>

              <!-- Client + Project -->
              <div style="display: flex; justify-content: space-between; margin-bottom: 32px; gap: 20px;">
                <div>
                  <p style="margin: 0 0 4px; font-size: 11px; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.8px;">Prepared for</p>
                  <p style="margin: 0; font-size: 14px; font-weight: 700; color: #111827;">${proposal.client_name}</p>
                  <p style="margin: 2px 0 0; font-size: 13px; color: #6b7280;">${proposal.client_email}</p>
                </div>
                <div style="text-align: right;">
                  <p style="margin: 0 0 4px; font-size: 11px; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.8px;">Timeline</p>
                  <p style="margin: 0; font-size: 14px; font-weight: 700; color: #111827;">
                    ${proposal.timeline ?? "To be discussed"}
                  </p>
                </div>
              </div>

              ${scopeSection}

              <!-- Deliverables -->
              ${
                proposal.deliverables.length > 0
                  ? `
                <div style="margin-bottom: 24px;">
                  <p style="margin: 0 0 12px; font-size: 11px; font-weight: 700; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.8px;">Deliverables</p>
                  <table style="width: 100%; border-collapse: collapse;">
                    <tbody>${deliverablesHTML}</tbody>
                  </table>
                </div>
              `
                  : ""
              }

              ${paymentTermsSection}

              <!-- Total -->
              <div style="margin-top: 24px; padding: 16px; background-color: #0f172a; border-radius: 8px; display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 14px; color: #94a3b8; font-weight: 600;">Total project fee</span>
                <span style="font-size: 20px; font-weight: 700; color: #d97706;">${formatCurrency(proposal.total)}</span>
              </div>

              ${notesSection}

              <!-- Sign off -->
              <div style="margin-top: 40px; padding-top: 24px; border-top: 1px solid #f3f4f6;">
                <p style="margin: 0; font-size: 14px; color: #374151;">Best regards,</p>
                <p style="margin: 4px 0 0; font-size: 14px; font-weight: 700; color: #111827;">${senderName}</p>
                ${senderBusiness ? `<p style="margin: 2px 0 0; font-size: 13px; color: #6b7280;">${senderBusiness}</p>` : ""}
                <p style="margin: 2px 0 0; font-size: 13px; color: #6b7280;">${senderEmail}</p>
                ${senderPhone ? `<p style="margin: 2px 0 0; font-size: 13px; color: #6b7280;">${senderPhone}</p>` : ""}
              </div>
            </div>

            <!-- Footer -->
            <div style="background-color: #f9fafb; padding: 20px 40px; text-align: center; border-top: 1px solid #f3f4f6;">
              <p style="margin: 0; font-size: 12px; color: #9ca3af;">
                Sent via <a href="https://invoxaa.vercel.app" style="color: #d97706; text-decoration: none; font-weight: 600;">Invoxa</a> — Invoice & proposal generator for freelancers
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (error) throw error;

    // Update proposal status to sent
    await supabase
      .from("proposals")
      .update({ status: "sent" })
      .eq("id", proposalId);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Proposal email error:", error);
    return NextResponse.json(
      { error: error.message ?? "Failed to send email" },
      { status: 500 },
    );
  }
}
