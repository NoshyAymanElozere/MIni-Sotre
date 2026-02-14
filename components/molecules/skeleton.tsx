import React from 'react'
import { Skeleton } from '../ui/skeleton';

function ProductSkeleton() {
  return (
    <div className="rounded-lg border bg-card p-4 flex flex-col gap-3">
      <Skeleton className="w-full aspect-square rounded-md" />
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-6 w-1/4" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-10 w-full" />
    </div>
  );
}
export default ProductSkeleton
