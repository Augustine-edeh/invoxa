export default function Loading() {
  return (
    <div className="p-6 md:p-8">
      <div className="animate-pulse space-y-4">
        <div className="h-8 w-48 rounded bg-slate-800" />
        <div className="h-40 rounded-xl bg-slate-800" />
      </div>
    </div>
  );
}
