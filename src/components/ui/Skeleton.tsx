interface SkeletonProps {
  className?: string;
}

/** Base skeleton block - uses the .skeleton shimmer class from index.css */
export function Skeleton({ className = '' }: SkeletonProps) {
  return <div className={`skeleton rounded-lg ${className}`} />;
}

/** Skeleton for image/photo cards in grids */
export function SkeletonCard({ className = '' }: SkeletonProps) {
  return (
    <div className={`rounded-xl overflow-hidden ${className}`}>
      <div className="skeleton w-full aspect-square" />
      <div className="p-3 space-y-2 bg-white">
        <div className="skeleton h-3.5 w-3/4 rounded" />
        <div className="skeleton h-3 w-1/2 rounded" />
      </div>
    </div>
  );
}

/** Skeleton for stat cards (Dashboard) */
export function SkeletonStatCard() {
  return (
    <div className="bg-white border border-[#E5E5E3] rounded-xl p-4">
      <div className="skeleton w-10 h-10 rounded-lg mb-3" />
      <div className="skeleton h-7 w-16 rounded mb-2" />
      <div className="skeleton h-4 w-24 rounded" />
    </div>
  );
}

/** Skeleton for a form section (Dashboard personal info) */
export function SkeletonFormSection() {
  return (
    <div className="bg-white border border-[#E5E5E3] rounded-2xl p-6">
      <div className="skeleton h-5 w-40 rounded mb-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i}>
            <div className="skeleton h-3.5 w-20 rounded mb-1.5" />
            <div className="skeleton h-10 w-full rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}

/** Skeleton for post cards */
export function SkeletonPostCard() {
  return (
    <div className="bg-white border border-[#E5E5E3] rounded-xl overflow-hidden">
      <div className="skeleton w-full aspect-video" />
      <div className="p-3 space-y-2">
        <div className="skeleton h-3 w-full rounded" />
        <div className="skeleton h-3 w-4/5 rounded" />
        <div className="skeleton h-3 w-1/3 rounded mt-3" />
      </div>
    </div>
  );
}
