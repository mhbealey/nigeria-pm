import {
  Skeleton,
  SkeletonStatCard,
  SkeletonTableRow,
} from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="space-y-6">
      {/* Welcome banner skeleton */}
      <div className="rounded-xl bg-slate-200 p-6 sm:p-8 animate-pulse">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="space-y-2">
            <Skeleton className="h-8 w-64 bg-slate-300" />
            <Skeleton className="h-4 w-48 bg-slate-300" />
          </div>
          <Skeleton className="h-14 w-44 rounded-lg bg-slate-300" />
        </div>
      </div>

      {/* Stat cards skeleton */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SkeletonStatCard />
        <SkeletonStatCard />
        <SkeletonStatCard />
        <SkeletonStatCard />
      </div>

      {/* Chart areas skeleton */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <div className="space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-56" />
          </div>
          <Skeleton className="mt-6 h-[280px] w-full rounded-lg" />
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <div className="space-y-2">
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-4 w-48" />
          </div>
          <Skeleton className="mt-6 h-[280px] w-full rounded-lg" />
        </div>
      </div>

      {/* Projects table skeleton */}
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-9 w-28 rounded-md" />
        </div>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="pb-3 text-left"><Skeleton className="h-4 w-16" /></th>
                <th className="pb-3 text-left"><Skeleton className="h-4 w-12" /></th>
                <th className="pb-3 text-left"><Skeleton className="h-4 w-14" /></th>
                <th className="pb-3 text-left"><Skeleton className="h-4 w-16" /></th>
                <th className="pb-3 text-right"><Skeleton className="ml-auto h-4 w-16" /></th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 5 }).map((_, i) => (
                <SkeletonTableRow key={i} columns={5} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick actions skeleton */}
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="space-y-2">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-4 w-60" />
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex items-start gap-4 rounded-xl border border-slate-100 p-4"
            >
              <Skeleton className="h-10 w-10 shrink-0 rounded-lg" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-40" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activity + Deadlines skeleton */}
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="rounded-xl border border-slate-200 bg-white p-6 lg:col-span-3">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-56" />
            </div>
            <Skeleton className="h-8 w-16 rounded-md" />
          </div>
          <div className="mt-6 space-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex gap-3 px-2 py-1">
                <Skeleton className="h-8 w-8 shrink-0 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-full max-w-md" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <Skeleton className="h-5 w-36" />
              <Skeleton className="h-4 w-48" />
            </div>
            <Skeleton className="h-5 w-5 rounded" />
          </div>
          <div className="mt-6 space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="rounded-lg border-l-4 border-slate-200 bg-slate-50 p-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                  <div className="space-y-1 text-right">
                    <Skeleton className="ml-auto h-3 w-20" />
                    <Skeleton className="ml-auto h-3 w-16" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
