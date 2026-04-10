export type Client = {
  id: string;
  user_id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  created_at: string;
};

export type CreateClientInput = Omit<Client, "id" | "user_id" | "created_at">;
