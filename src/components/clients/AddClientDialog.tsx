"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AddClientDialog() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const setField = (field: keyof typeof form, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const handleSave = async () => {
    if (!form.name || !form.email) {
      toast.error("Name and email are required");
      return;
    }

    setIsLoading(true);

    try {
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase.from("clients").insert({
        ...form,
        user_id: user.id,
      });

      if (error) throw error;

      toast.success(`${form.name} added to clients`);
      setForm({ name: "", email: "", phone: "", address: "" });
      setOpen(false);
      router.refresh();
    } catch (error: any) {
      toast.error(error.message ?? "Failed to add client");
    } finally {
      setIsLoading(false);
    }
  };

  if (!open) {
    return (
      <Button
        onClick={() => setOpen(true)}
        className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-semibold"
        size="sm"
      >
        <Plus size={16} className="mr-2" />
        Add client
      </Button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-md p-6 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-white font-semibold text-lg">Add client</h2>
          <button
            onClick={() => setOpen(false)}
            className="text-slate-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-slate-300">Full name</Label>
            <Input
              placeholder="Acme Corp"
              value={form.name}
              onChange={(e) => setField("name", e.target.value)}
              className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-600"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-slate-300">Email address</Label>
            <Input
              type="email"
              placeholder="billing@acme.com"
              value={form.email}
              onChange={(e) => setField("email", e.target.value)}
              className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-600"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-slate-300">Phone (optional)</Label>
            <Input
              placeholder="+234 800 000 0000"
              value={form.phone}
              onChange={(e) => setField("phone", e.target.value)}
              className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-600"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-slate-300">Address (optional)</Label>
            <Input
              placeholder="Lagos, Nigeria"
              value={form.address}
              onChange={(e) => setField("address", e.target.value)}
              className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-600"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <Button
            onClick={handleSave}
            disabled={isLoading}
            className="flex-1 bg-amber-400 hover:bg-amber-500 text-slate-950 font-semibold"
          >
            {isLoading ? "Saving..." : "Save client"}
          </Button>
          <Button
            onClick={() => setOpen(false)}
            variant="outline"
            className="border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
