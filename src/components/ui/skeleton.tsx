import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
}

export function Skeleton({ className, width, height }: SkeletonProps) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-slate-200", className)}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
      }}
    />
  );
}

export function SkeletonText({ className, lines = 1 }: { className?: string; lines?: number }) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            "h-4",
            i === lines - 1 && lines > 1 ? "w-3/4" : "w-full"
          )}
        />
      ))}
    </div>
  );
}

export function SkeletonCircle({ className, size = 40 }: { className?: string; size?: number }) {
  return (
    <Skeleton
      className={cn("shrink-0 rounded-full", className)}
      width={size}
      height={size}
    />
  );
}

export function SkeletonCard({ className, children }: { className?: string; children?: React.ReactNode }) {
  return (
    <div className={cn("rounded-xl border border-slate-200 bg-white p-6", className)}>
      {children || (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-10 w-10 rounded-lg" />
            <Skeleton className="h-4 w-12" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-7 w-20" />
            <Skeleton className="h-4 w-28" />
          </div>
          <Skeleton className="h-3 w-24" />
        </div>
      )}
    </div>
  );
}

export function SkeletonStatCard() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-10 rounded-lg" />
        <Skeleton className="h-4 w-12" />
      </div>
      <div className="mt-4 space-y-2">
        <Skeleton className="h-7 w-24" />
        <Skeleton className="h-4 w-32" />
      </div>
      <Skeleton className="mt-2 h-3 w-28" />
    </div>
  );
}

export function SkeletonTableRow({ columns = 5 }: { columns?: number }) {
  return (
    <tr className="border-b border-slate-100">
      {Array.from({ length: columns }).map((_, i) => (
        <td key={i} className="py-3.5 pr-4">
          <Skeleton
            className={cn(
              "h-4",
              i === 0 ? "w-36" : i === columns - 1 ? "ml-auto w-20" : "w-24"
            )}
          />
        </td>
      ))}
    </tr>
  );
}
