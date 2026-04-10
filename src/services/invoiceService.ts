import { createClient } from "@/lib/supabase/client";
import { Invoice, CreateInvoiceInput } from "@/types/invoice";

export const invoiceService = {
  async getAll(): Promise<Invoice[]> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("invoices")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  async getById(id: string): Promise<Invoice> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("invoices")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },

  async create(input: CreateInvoiceInput): Promise<Invoice> {
    const supabase = createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) throw new Error("Not authenticated");

    const { data, error } = await supabase
      .from("invoices")
      .insert({ ...input, user_id: user.id })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async update(
    id: string,
    input: Partial<CreateInvoiceInput>,
  ): Promise<Invoice> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("invoices")
      .update(input)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateStatus(id: string, status: Invoice["status"]): Promise<void> {
    const supabase = createClient();

    const { error } = await supabase
      .from("invoices")
      .update({ status })
      .eq("id", id);

    if (error) throw error;
  },

  async delete(id: string): Promise<void> {
    const supabase = createClient();

    const { error } = await supabase.from("invoices").delete().eq("id", id);

    if (error) throw error;
  },
};
