"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const supabase = createClient();

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) throw error;

      setSent(true);
    } catch (error: any) {
      toast.error(error.message ?? "Failed to send reset email");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md space-y-6">
        {/* Brand */}
        <div className="text-center space-y-2">
          <Link href="/">
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Inv<span className="text-amber-400">ox</span>a
            </h1>
          </Link>
          <p className="text-slate-400 text-sm">
            Invoice & proposal generator for freelancers
          </p>
        </div>

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-white text-xl">
              {sent ? "Check your email" : "Reset your password"}
            </CardTitle>
            <CardDescription className="text-slate-400">
              {sent
                ? `We sent a password reset link to ${email}`
                : "Enter your email and we'll send you a reset link"}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {sent ? (
              <div className="space-y-4">
                <div className="bg-amber-400/10 border border-amber-400/20 rounded-lg p-4">
                  <p className="text-amber-400 text-sm text-center">
                    Click the link in your email to reset your password. Check
                    your spam folder if you don't see it.
                  </p>
                </div>
                <Button
                  variant="ghost"
                  className="w-full bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700"
                  onClick={() => setSent(false)}
                >
                  Try a different email
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-300">
                    Email address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-amber-400 hover:bg-amber-500 text-slate-950 font-semibold"
                >
                  {isLoading ? "Sending..." : "Send reset link"}
                </Button>
              </form>
            )}

            <div className="text-center">
              <Link
                href="/login"
                className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-300 text-sm transition-colors"
              >
                <ChevronLeft size={14} />
                Back to sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
