export type LineItem = {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
};

export type InvoiceStatus = "draft" | "sent" | "paid" | "overdue";

export type Invoice = {
  id: string;
  user_id: string;
  invoice_number: string;
  client_name: string;
  client_email: string;
  issue_date: string;
  due_date: string;
  line_items: LineItem[];
  subtotal: number;
  tax_percent: number;
  tax_amount: number;
  total: number;
  status: InvoiceStatus;
  notes?: string;
  created_at: string;
};

export type CreateInvoiceInput = Omit<Invoice, "id" | "user_id" | "created_at">;
