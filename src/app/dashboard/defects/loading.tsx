import { Skeleton, SkeletonStatCard } from "@/components/ui/skeleton";

export default function DefectsLoading() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-7 w-40" />
          <Skeleton className="h-4 w-56" />
        </div>
        <Skeleton className="h-10 w-36 rounded-md" />
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SkeletonStatCard />
        <SkeletonStatCard />
        <SkeletonStatCard />
        <SkeletonStatCard />
      </div>

      {/* Filter bar */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <Skeleton className="h-10 flex-1 rounded-md" />
        <Skeleton className="h-10 w-32 rounded-md" />
        <Skeleton className="h-10 w-32 rounded-md" />
        <Skeleton className="h-10 w-28 rounded-md" />
      </div>

      {/* Defect cards */}
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-slate-200 bg-white p-6">
            {/* Defect header */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-3">
                <Skeleton className="h-10 w-10 shrink-0 rounded-lg" />
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-48" />
                    <Skeleton className="h-5 w-16 rounded-full" />
                    <Skeleton className="h-5 w-20 rounded-full" />
                  </div>
                  <Skeleton className="h-4 w-64" />
                </div>
              </div>
              <Skeleton className="h-8 w-24 rounded-md" />
            </div>

            {/* Defect details */}
            <div className="mt-4 grid gap-3 sm:grid-cols-4">
              <div className="space-y-1">
                <Skeleton className="h-3 w-14" />
                <Skeleton className="h-4 w-32" />
              </div>
              <div className="space-y-1">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="space-y-1">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-4 w-28" />
              </div>
              <div className="space-y-1">
                <Skeleton className="h-3 w-18" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>

            {/* Image placeholders */}
            <div className="mt-4 flex gap-2">
              {Array.from({ length: 3 }).map((_, j) => (
                <Skeleton key={j} className="h-16 w-16 rounded-lg" />
              ))}
            </div>

            {/* Card footer */}
            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
              <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-6 rounded-full" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-20" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-8 w-20 rounded-md" />
                <Skeleton className="h-8 w-28 rounded-md" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
