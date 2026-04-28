export type Profile = {
  id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  business_name: string | null;
  address: string | null;
  website: string | null;
  created_at: string;
  updated_at: string;
};

export type UpdateProfileInput = Omit<
  Profile,
  "id" | "created_at" | "updated_at"
>;
