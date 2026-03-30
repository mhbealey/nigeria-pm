import {
  Skeleton,
  SkeletonStatCard,
  SkeletonTableRow,
} from "@/components/ui/skeleton";

export default function MaterialsLoading() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-4 w-72" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-32 rounded-md" />
          <Skeleton className="h-10 w-36 rounded-md" />
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SkeletonStatCard />
        <SkeletonStatCard />
        <SkeletonStatCard />
        <SkeletonStatCard />
      </div>

      {/* Chart area */}
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-4 w-56" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-8 w-20 rounded-md" />
            <Skeleton className="h-8 w-20 rounded-md" />
          </div>
        </div>
        <Skeleton className="mt-6 h-[260px] w-full rounded-lg" />
      </div>

      {/* Price table */}
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-60" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-10 w-48 rounded-md" />
            <Skeleton className="h-10 w-28 rounded-md" />
          </div>
        </div>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="pb-3 text-left"><Skeleton className="h-4 w-20" /></th>
                <th className="pb-3 text-left"><Skeleton className="h-4 w-16" /></th>
                <th className="pb-3 text-left"><Skeleton className="h-4 w-14" /></th>
                <th className="pb-3 text-left"><Skeleton className="h-4 w-20" /></th>
                <th className="pb-3 text-left"><Skeleton className="h-4 w-16" /></th>
                <th className="pb-3 text-right"><Skeleton className="ml-auto h-4 w-12" /></th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 10 }).map((_, i) => (
                <SkeletonTableRow key={i} columns={6} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
