import { Skeleton } from "@/components/ui/skeleton";

const InvoiceFormSkeleton = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 md:p-8 py-24 space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-4 w-28 bg-slate-800" />
        <Skeleton className="h-8 w-40 bg-slate-800" />
        <Skeleton className="h-4 w-72 bg-slate-800" />
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          {[...Array(2)].map((_, i) => (
            <Skeleton key={i} className="h-10 rounded-md bg-slate-800" />
          ))}
        </div>

        <Skeleton className="h-px bg-slate-800" />

        {[...Array(2)].map((_, i) => (
          <div key={i} className="grid md:grid-cols-2 gap-4">
            <Skeleton className="h-10 bg-slate-800 rounded-md" />
            <Skeleton className="h-10 bg-slate-800 rounded-md" />
          </div>
        ))}

        <Skeleton className="h-44 rounded-lg bg-slate-800" />

        <Skeleton className="h-28 rounded-lg bg-slate-800" />

        <Skeleton className="h-24 rounded-lg bg-slate-800" />

        <div className="flex gap-3">
          <Skeleton className="h-10 w-32 rounded-md bg-slate-800" />
          <Skeleton className="h-10 w-40 rounded-md bg-slate-800" />
        </div>
      </div>
    </div>
  );
};

export default InvoiceFormSkeleton;
