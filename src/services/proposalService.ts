import { createClient } from "@/lib/supabase/client";
import { Proposal, CreateProposalInput } from "@/types/proposal";

export const proposalService = {
  async getAll(): Promise<Proposal[]> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("proposals")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  async getById(id: string): Promise<Proposal> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("proposals")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },

  async create(input: CreateProposalInput): Promise<Proposal> {
    const supabase = createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) throw new Error("Not authenticated");

    const { data, error } = await supabase
      .from("proposals")
      .insert({ ...input, user_id: user.id })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async update(
    id: string,
    input: Partial<CreateProposalInput>,
  ): Promise<Proposal> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("proposals")
      .update(input)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateStatus(id: string, status: Proposal["status"]): Promise<void> {
    const supabase = createClient();

    const { error } = await supabase
      .from("proposals")
      .update({ status })
      .eq("id", id);

    if (error) throw error;
  },

  async delete(id: string): Promise<void> {
    const supabase = createClient();

    const { error } = await supabase.from("proposals").delete().eq("id", id);

    if (error) throw error;
  },
};
