import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Sidebar from "@/components/Sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="flex min-h-screen">
        <Sidebar email={user.email ?? ""} />
        <main className="flex-1 overflow-auto md:ml-0">{children}</main>
      </div>
    </div>
  );
}
