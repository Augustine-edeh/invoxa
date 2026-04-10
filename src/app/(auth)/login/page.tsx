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

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const supabase = createClient();

      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (error) throw error;

      setEmailSent(true);
      toast.success("Magic link sent! Check your email.");
    } catch (error: any) {
      toast.error(error.message ?? "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo / Brand */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Inv<span className="text-amber-400">ox</span>a
          </h1>
          <p className="text-slate-400 text-sm">
            Invoice & proposal generator for freelancers
          </p>
        </div>

        {/* Card */}
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="space-y-1">
            <CardTitle className="text-white text-xl">
              {emailSent ? "Check your email" : "Welcome back"}
            </CardTitle>
            <CardDescription className="text-slate-400">
              {emailSent
                ? `We sent a magic link to ${email}`
                : "Enter your email to receive a magic link"}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {emailSent ? (
              <div className="space-y-4">
                <div className="bg-amber-400/10 border border-amber-400/20 rounded-lg p-4">
                  <p className="text-amber-400 text-sm text-center">
                    Click the link in your email to sign in. You can close this
                    tab.
                  </p>
                </div>
                <Button
                  variant="ghost"
                  className="w-full text-slate-400 hover:text-white"
                  onClick={() => setEmailSent(false)}
                >
                  Use a different email
                </Button>
              </div>
            ) : (
              <form onSubmit={handleLogin} className="space-y-4">
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
                    className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-amber-400 focus:ring-amber-400"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-amber-400 hover:bg-amber-500 text-slate-950 font-semibold"
                >
                  {isLoading ? "Sending..." : "Send magic link"}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        <p className="text-center text-slate-600 text-xs">
          Invoxa — built for Nigerian freelancers
        </p>
      </div>
    </div>
  );
}
