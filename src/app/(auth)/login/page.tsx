import { Suspense } from "react";
import LoginForm from "./LoginForm";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <Suspense>
      <div className="relative">
        <Link
          href="/"
          title="back to home"
          className="absolute top-4 left-4 group inline-flex items-center gap-1 text-slate-500 hover:text-slate-300 text-sm transition-colors"
        >
          <div className="group-hover:bg-slate-900 p-2 rounded-full">
            <ChevronLeft size={14} />
          </div>
          <span className="hidden sm:block">Back to home</span>
        </Link>

        <LoginForm />
      </div>
    </Suspense>
  );
}
