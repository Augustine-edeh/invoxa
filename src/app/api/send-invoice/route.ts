import { Resend } from "resend";
import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    // Verify the user is authenticated
    const supabase = await createClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { invoiceId } = await request.json();

    if (!invoiceId) {
      return NextResponse.json(
        { error: "Invoice ID is required" },
        { status: 400 },
      );
    }

    // Fetch the invoice
    const { data: invoice, error: invoiceError } = await supabase
      .from("invoices")
      .select("*")
      .eq("id", invoiceId)
      .eq("user_id", user.id)
      .single();

    if (invoiceError || !invoice) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
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

    // Format currency
    const formatCurrency = (amount: number) =>
      `NGN ${amount.toLocaleString("en-NG")}`;

    // Build line items HTML
    const lineItemsHTML = invoice.line_items
      .map(
        (item: any, index: number) => `
        <tr style="background-color: ${index % 2 === 0 ? "#ffffff" : "#f9fafb"}">
          <td style="padding: 10px 12px; font-size: 14px; color: #374151;">${item.description}</td>
          <td style="padding: 10px 12px; font-size: 14px; color: #374151; text-align: center;">${item.quantity}</td>
          <td style="padding: 10px 12px; font-size: 14px; color: #374151; text-align: right;">${formatCurrency(item.rate)}</td>
          <td style="padding: 10px 12px; font-size: 14px; color: #111827; font-weight: 600; text-align: right;">${formatCurrency(item.quantity * item.rate)}</td>
        </tr>
      `,
      )
      .join("");

    const notesSection = invoice.notes
      ? `
        <div style="margin-top: 32px; padding: 16px; background-color: #fffbeb; border-left: 3px solid #d97706; border-radius: 4px;">
          <p style="margin: 0 0 6px; font-size: 11px; font-weight: 700; color: #92400e; text-transform: uppercase; letter-spacing: 0.8px;">Notes</p>
          <p style="margin: 0; font-size: 13px; color: #78350f; line-height: 1.6;">${invoice.notes}</p>
        </div>
      `
      : "";

    const { data, error } = await resend.emails.send({
      from: "Invoxa <onboarding@resend.dev>",
      //   to: invoice.client_email,
      to: user.email!, //NOTE: For testing purposes, we're sending the email to the authenticated user instead of the client's email. Change this to invoice.client_email in production.
      subject: `Invoice #${invoice.invoice_number} from ${senderName}`,
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
              <p style="margin: 6px 0 0; font-size: 13px; color: #94a3b8;">Invoice from ${senderName}</p>
            </div>

            <!-- Invoice info bar -->
            <div style="background-color: #1e293b; padding: 16px 40px; display: flex; justify-content: space-between;">
              <div>
                <p style="margin: 0; font-size: 11px; color: #64748b; text-transform: uppercase; letter-spacing: 0.8px;">Invoice number</p>
                <p style="margin: 4px 0 0; font-size: 15px; font-weight: 700; color: #ffffff;">#${invoice.invoice_number}</p>
              </div>
              <div style="text-align: right;">
                <p style="margin: 0; font-size: 11px; color: #64748b; text-transform: uppercase; letter-spacing: 0.8px;">Amount due</p>
                <p style="margin: 4px 0 0; font-size: 15px; font-weight: 700; color: #d97706;">${formatCurrency(invoice.total)}</p>
              </div>
            </div>

            <!-- Body -->
            <div style="padding: 40px;">

              <!-- Greeting -->
              <p style="margin: 0 0 24px; font-size: 15px; color: #374151; line-height: 1.6;">
                Hi <strong>${invoice.client_name}</strong>,
              </p>
              <p style="margin: 0 0 32px; font-size: 15px; color: #374151; line-height: 1.6;">
                Please find your invoice details below. Kindly review and process payment before the due date.
              </p>

              <!-- Client + Dates -->
              <div style="display: flex; justify-content: space-between; margin-bottom: 32px; gap: 20px;">
                <div>
                  <p style="margin: 0 0 4px; font-size: 11px; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.8px;">Billed to</p>
                  <p style="margin: 0; font-size: 14px; font-weight: 700; color: #111827;">${invoice.client_name}</p>
                  <p style="margin: 2px 0 0; font-size: 13px; color: #6b7280;">${invoice.client_email}</p>
                </div>
                <div style="text-align: right;">
                  <p style="margin: 0 0 4px; font-size: 11px; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.8px;">Due date</p>
                  <p style="margin: 0; font-size: 14px; font-weight: 700; color: #111827;">
                    ${new Date(invoice.due_date).toLocaleDateString("en-NG", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <!-- Line items table -->
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                <thead>
                  <tr style="background-color: #f9fafb;">
                    <th style="padding: 10px 12px; font-size: 11px; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.8px; text-align: left; font-weight: 600;">Description</th>
                    <th style="padding: 10px 12px; font-size: 11px; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.8px; text-align: center; font-weight: 600;">Qty</th>
                    <th style="padding: 10px 12px; font-size: 11px; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.8px; text-align: right; font-weight: 600;">Rate</th>
                    <th style="padding: 10px 12px; font-size: 11px; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.8px; text-align: right; font-weight: 600;">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  ${lineItemsHTML}
                </tbody>
              </table>

              <!-- Totals -->
              <div style="margin-left: auto; width: 220px;">
                <div style="display: flex; justify-content: space-between; padding: 6px 0;">
                  <span style="font-size: 13px; color: #6b7280;">Subtotal</span>
                  <span style="font-size: 13px; color: #374151;">${formatCurrency(invoice.subtotal)}</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 6px 0;">
                  <span style="font-size: 13px; color: #6b7280;">Tax (${invoice.tax_percent}%)</span>
                  <span style="font-size: 13px; color: #374151;">${formatCurrency(invoice.tax_amount)}</span>
                </div>
                <div style="border-top: 1px solid #e5e7eb; margin: 6px 0;"></div>
                <div style="display: flex; justify-content: space-between; padding: 6px 0;">
                  <span style="font-size: 15px; font-weight: 700; color: #111827;">Total</span>
                  <span style="font-size: 15px; font-weight: 700; color: #d97706;">${formatCurrency(invoice.total)}</span>
                </div>
              </div>

              ${notesSection}

              <!-- Sign off -->
              <div style="margin-top: 40px; padding-top: 24px; border-top: 1px solid #f3f4f6;">
                <p style="margin: 0; font-size: 14px; color: #374151;">Best regards,</p>
                <p style="margin: 4px 0 0; font-size: 14px; font-weight: 700; color: #111827;">${senderName}</p>
                <p style="margin: 2px 0 0; font-size: 13px; color: #6b7280;">${senderEmail}</p>
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

    // Update invoice status to sent
    await supabase
      .from("invoices")
      .update({ status: "sent" })
      .eq("id", invoiceId);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Email send error:", error);
    return NextResponse.json(
      { error: error.message ?? "Failed to send email" },
      { status: 500 },
    );
  }
}
