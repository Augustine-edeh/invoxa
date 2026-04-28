"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Profile } from "@/types/profile";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Save } from "lucide-react";

type Props = {
  profile: Profile | null;
  userId: string;
};

export default function SettingsForm({ profile, userId }: Props) {
  const [form, setForm] = useState({
    full_name: profile?.full_name ?? "",
    email: profile?.email ?? "",
    phone: profile?.phone ?? "",
    business_name: profile?.business_name ?? "",
    address: profile?.address ?? "",
    website: profile?.website ?? "",
  });
  const [isSaving, setIsSaving] = useState(false);

  const setField = (field: keyof typeof form, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const handleSave = async () => {
    if (!form.full_name) {
      toast.error("Full name is required");
      return;
    }

    if (!form.email) {
      toast.error("Email is required");
      return;
    }

    setIsSaving(true);

    try {
      const supabase = createClient();

      const { error } = await supabase
        .from("profiles")
        .update({
          ...form,
          updated_at: new Date().toISOString(),
        })
        .eq("id", userId);

      if (error) throw error;

      toast.success("Settings saved successfully");
    } catch (error: any) {
      toast.error(error.message ?? "Failed to save settings");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Personal details */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-slate-300">Personal details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-slate-300">Full name</Label>
            <Input
              placeholder="Augustine Edeh"
              value={form.full_name}
              onChange={(e) => setField("full_name", e.target.value)}
              className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-600"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-slate-300">Email address</Label>
            <Input
              type="email"
              placeholder="info.augustinesedeh@gmail.com"
              value={form.email}
              onChange={(e) => setField("email", e.target.value)}
              className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-600"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label className="text-slate-300">Phone number</Label>
          <Input
            placeholder="+234 907 666 5289"
            value={form.phone}
            onChange={(e) => setField("phone", e.target.value)}
            className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-600"
          />
        </div>
      </div>

      <Separator className="bg-slate-800" />

      {/* Business details */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-slate-300">Business details</h3>
        <div className="space-y-2">
          <Label className="text-slate-300">Business name (optional)</Label>
          <Input
            placeholder="Augustine Edeh Studios"
            value={form.business_name}
            onChange={(e) => setField("business_name", e.target.value)}
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
        <div className="space-y-2">
          <Label className="text-slate-300">Website (optional)</Label>
          <Input
            placeholder="https://augustines.vercel.app"
            value={form.website}
            onChange={(e) => setField("website", e.target.value)}
            className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-600"
          />
        </div>
      </div>

      <Separator className="bg-slate-800" />

      {/* Preview */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-slate-300">
          Preview on documents
        </h3>
        <div className="bg-slate-800/50 rounded-lg p-4 space-y-1 border border-slate-700">
          <p className="text-white font-semibold text-sm">
            {form.full_name || "Your name"}
          </p>
          {form.business_name && (
            <p className="text-slate-400 text-xs">{form.business_name}</p>
          )}
          <p className="text-slate-400 text-xs">
            {form.email || "your@email.com"}
          </p>
          {form.phone && <p className="text-slate-400 text-xs">{form.phone}</p>}
          {form.address && (
            <p className="text-slate-400 text-xs">{form.address}</p>
          )}
          {form.website && (
            <p className="text-amber-400 text-xs">{form.website}</p>
          )}
        </div>
        <p className="text-slate-600 text-xs">
          This is how your details appear on PDFs and emails sent to clients
        </p>
      </div>

      <Button
        onClick={handleSave}
        disabled={isSaving}
        className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-semibold"
      >
        <Save size={16} className="mr-2" />
        {isSaving ? "Saving..." : "Save settings"}
      </Button>
    </div>
  );
}
