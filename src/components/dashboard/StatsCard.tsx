import { cn } from "@/lib/utils";

type StatsCardProps = {
  title: string;
  value: string;
  sub: string;
  accent?: boolean;
};

export default function StatsCard({
  title,
  value,
  sub,
  accent,
}: StatsCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border p-5 space-y-1",
        accent
          ? "bg-amber-400/10 border-amber-400/20"
          : "bg-slate-900 border-slate-800",
      )}
    >
      <p className="text-slate-400 text-xs font-medium uppercase tracking-wide">
        {title}
      </p>
      <p
        className={cn(
          "text-2xl font-bold",
          accent ? "text-amber-400" : "text-white",
        )}
      >
        {value}
      </p>
      <p className="text-slate-500 text-xs">{sub}</p>
    </div>
  );
}
