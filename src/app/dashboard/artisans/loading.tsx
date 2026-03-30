import { Skeleton, SkeletonStatCard } from "@/components/ui/skeleton";

export default function ArtisansLoading() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-7 w-36" />
          <Skeleton className="h-4 w-56" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-28 rounded-md" />
          <Skeleton className="h-10 w-32 rounded-md" />
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SkeletonStatCard />
        <SkeletonStatCard />
        <SkeletonStatCard />
        <SkeletonStatCard />
      </div>

      {/* Search and filters */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <Skeleton className="h-10 flex-1 rounded-md" />
        <Skeleton className="h-10 w-36 rounded-md" />
        <Skeleton className="h-10 w-28 rounded-md" />
      </div>

      {/* Artisan card grid - 3 columns, 9 cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-slate-200 bg-white p-5">
            {/* Avatar and name */}
            <div className="flex items-start gap-3">
              <Skeleton className="h-12 w-12 shrink-0 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>

            {/* Rating and location */}
            <div className="mt-3 flex items-center gap-3">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Skeleton key={j} className="h-4 w-4 rounded" />
                ))}
                <Skeleton className="ml-1 h-4 w-8" />
              </div>
            </div>
            <Skeleton className="mt-2 h-4 w-28" />

            {/* Skills */}
            <div className="mt-3 flex flex-wrap gap-1.5">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-14 rounded-full" />
            </div>

            {/* Stats row */}
            <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-100 pt-3">
              {Array.from({ length: 3 }).map((_, j) => (
                <div key={j} className="text-center">
                  <Skeleton className="mx-auto h-5 w-8" />
                  <Skeleton className="mx-auto mt-1 h-3 w-12" />
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="mt-3 flex gap-2">
              <Skeleton className="h-9 flex-1 rounded-md" />
              <Skeleton className="h-9 flex-1 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
