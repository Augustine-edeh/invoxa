import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();

  const { data, error } = await supabase.from("invoices").select("*");

  if (error && error.code === "PGRST116") {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <div className="text-green-600 font-semibold text-xl">
          ✓ Supabase connected successfully
        </div>
        <p className="text-gray-500 text-sm">
          Table does not exist yet — but the connection works.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <div className="text-red-500 font-semibold text-xl">
          ✗ Connection failed
        </div>
        <p className="text-gray-500 text-sm">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-green-600 font-semibold text-xl">
        ✓ Supabase connected successfully
      </div>
    </div>
  );
}
