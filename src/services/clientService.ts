import { createClient } from "@/lib/supabase/client";
import { Client, CreateClientInput } from "@/types/client";

export const clientService = {
  async getAll(): Promise<Client[]> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("clients")
      .select("*")
      .order("name", { ascending: true });

    if (error) throw error;
    return data;
  },

  async create(input: CreateClientInput): Promise<Client> {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("clients")
      .insert(input)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async delete(id: string): Promise<void> {
    const supabase = createClient();

    const { error } = await supabase.from("clients").delete().eq("id", id);

    if (error) throw error;
  },
};
