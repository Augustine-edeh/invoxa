import { Skeleton } from "@/components/ui/skeleton";

const ClientsSkeleton = () => {
  return (
    <div className="p-6 md:p-8 space-y-6 pb-24 md:pb-8">
      <div className="space-y-2">
        <Skeleton className="h-8 w-40 bg-slate-800" />
        <Skeleton className="h-4 w-80 bg-slate-800" />
      </div>

      <Skeleton className="h-10 w-full rounded-md bg-slate-900" />

      <div className="rounded-xl border border-slate-800 bg-slate-900">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 p-5 border-b border-slate-800 last:border-none"
          >
            <Skeleton className="size-10 rounded-full bg-slate-800" />

            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-40 bg-slate-800" />
              <Skeleton className="h-3 w-64 bg-slate-800" />
            </div>

            <Skeleton className="h-8 w-20 bg-slate-800 rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
};
export default ClientsSkeleton;
