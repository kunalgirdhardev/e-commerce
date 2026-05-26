function Loader({ fullPage = false, label = "Loading..." }) {
  if (fullPage) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-surface">
        <div className="w-10 h-10 border-2 border-ink border-t-transparent rounded-full animate-spin" />
        <p className="text-ink-muted text-sm tracking-wide">{label}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12">
      <div className="w-8 h-8 border-2 border-ink border-t-transparent rounded-full animate-spin" />
      <p className="text-ink-muted text-sm">{label}</p>
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="premium-card overflow-hidden">
      <div className="skeleton aspect-[4/5] w-full rounded-none" />
      <div className="p-5 space-y-3">
        <div className="skeleton h-4 w-3/4" />
        <div className="skeleton h-5 w-1/3" />
        <div className="skeleton h-10 w-full mt-2" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export default Loader;
