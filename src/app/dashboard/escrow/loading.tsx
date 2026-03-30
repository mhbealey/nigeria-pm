import { Skeleton, SkeletonStatCard } from "@/components/ui/skeleton";

export default function EscrowLoading() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-7 w-40" />
          <Skeleton className="h-4 w-64" />
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

      {/* Tab bar skeleton */}
      <div className="flex gap-2 border-b border-slate-200 pb-2">
        <Skeleton className="h-9 w-20 rounded-md" />
        <Skeleton className="h-9 w-24 rounded-md" />
        <Skeleton className="h-9 w-28 rounded-md" />
        <Skeleton className="h-9 w-24 rounded-md" />
      </div>

      {/* Search and filter bar */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <Skeleton className="h-10 flex-1 rounded-md" />
        <Skeleton className="h-10 w-40 rounded-md" />
      </div>

      {/* Project cards with milestone bars */}
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-slate-200 bg-white p-6">
            {/* Card header */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-48" />
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
                <Skeleton className="h-4 w-36" />
              </div>
              <div className="space-y-1 text-right">
                <Skeleton className="ml-auto h-6 w-32" />
                <Skeleton className="ml-auto h-3 w-20" />
              </div>
            </div>

            {/* Client and contractor */}
            <div className="mt-4 flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-28" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-36" />
              </div>
            </div>

            {/* Milestone progress bar */}
            <div className="mt-5">
              <div className="mb-2 flex items-center justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-16" />
              </div>
              <div className="flex gap-1">
                {Array.from({ length: 6 }).map((_, j) => (
                  <Skeleton
                    key={j}
                    className="h-3 flex-1 rounded-full"
                  />
                ))}
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {Array.from({ length: 6 }).map((_, j) => (
                  <Skeleton key={j} className="h-3 w-20" />
                ))}
              </div>
            </div>

            {/* Card footer */}
            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-8 w-24 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
