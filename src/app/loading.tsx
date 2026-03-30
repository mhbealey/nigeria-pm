export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      {/* BuildNG Logo */}
      <div className="mb-6 flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600">
          <span className="text-lg font-bold text-white">B</span>
        </div>
        <span className="text-xl font-bold text-gray-900">BuildNG</span>
      </div>

      {/* Animated Spinner */}
      <div className="relative flex h-12 w-12 items-center justify-center">
        <div className="absolute h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-emerald-600" />
        <div className="absolute h-8 w-8 animate-spin rounded-full border-4 border-gray-100 border-b-emerald-400" style={{ animationDirection: "reverse", animationDuration: "0.8s" }} />
      </div>

      {/* Loading Text */}
      <p className="mt-6 animate-pulse text-sm font-medium text-gray-500">
        Loading...
      </p>
    </div>
  );
}
