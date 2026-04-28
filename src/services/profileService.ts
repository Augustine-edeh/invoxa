import { createClient } from "@/lib/supabase/client";
import { Profile } from "@/types/profile";

export const profileService = {
  async get(): Promise<Profile | null> {
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return null;

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    return data;
  },
};
