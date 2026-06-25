import { Skeleton } from "@/components/ui/skeleton";

const SettingsSkeleton = () => {
  return (
    <div className="max-w-2xl mx-auto p-6 md:p-8 py-24 space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-4 w-28 bg-slate-800" />
        <Skeleton className="h-8 w-36 bg-slate-800" />
        <Skeleton className="h-4 w-72 bg-slate-800" />
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 space-y-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-24 bg-slate-800" />
            <Skeleton className="h-10 w-full bg-slate-800 rounded-md" />
          </div>
        ))}

        <Skeleton className="h-10 w-40 bg-slate-800 rounded-md" />
      </div>
    </div>
  );
};

export default SettingsSkeleton;
