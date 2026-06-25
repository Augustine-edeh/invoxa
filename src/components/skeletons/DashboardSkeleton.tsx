import { Skeleton } from "@/components/ui/skeleton";

const DashboardSkeleton = () => {
  return (
    <div className="p-6 md:p-8 space-y-6 pb-24 md:pb-8">
      {/* Mobile Revenue */}
      <div className="md:hidden space-y-2 mt-14">
        <Skeleton className="h-3 w-24 bg-slate-800" />
        <Skeleton className="h-10 w-44 bg-slate-800" />
        <Skeleton className="h-4 w-32 bg-slate-800" />
      </div>

      {/* Desktop Header */}
      <div className="hidden md:flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-44 bg-slate-800" />
          <Skeleton className="h-4 w-56 bg-slate-800" />
        </div>

        <div className="flex gap-3">
          <Skeleton className="h-9 w-36 bg-slate-800 rounded-md" />
          <Skeleton className="h-9 w-38 bg-slate-800 rounded-md" />
        </div>
      </div>

      {/* Stats */}
      <div className="flex gap-4 overflow-hidden md:grid md:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="w-44 md:w-auto rounded-xl border border-slate-800 bg-slate-900 p-5 space-y-4"
          >
            <Skeleton className="h-3 w-20 bg-slate-800" />
            <Skeleton className="h-8 w-28 bg-slate-800" />
            <Skeleton className="h-3 w-24 bg-slate-800" />
          </div>
        ))}
      </div>

      {/* Mobile Recent Docs */}
      <div className="md:hidden space-y-3">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-16 rounded-lg bg-slate-900" />
        ))}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block rounded-xl border border-slate-800 bg-slate-900 p-6 space-y-6">
        <Skeleton className="h-9 w-60 bg-slate-800" />

        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-12 rounded-lg bg-slate-800" />
        ))}
      </div>
    </div>
  );
};

export default DashboardSkeleton;
