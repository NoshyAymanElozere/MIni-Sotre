"use client";

import { motion } from "framer-motion";
import { Product } from "@/types/product";
import ProductCard from "@/components/organisms/ProductCard";
import ProductSkeleton from "../molecules/skeleton";

interface ProductGridProps {
  products: Product[];
  loading: boolean;
  error?: boolean;
  columns?: {
    sm?: number;
    md?: number;
    lg?: number;
  };
  skeletonCount?: number;
  emptyTitle?: string;
  emptyDescription?: string;
  errorTitle?: string;
  errorDescription?: string;
}

/** Skeleton placeholder for loading state */


const columnClasses: Record<number, string> = {
  1: "grid-cols-1",
  2: "sm:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
};

export default function ProductGrid({
  products,
  loading,
  error = false,
  columns = { sm: 2, lg: 3 },
  skeletonCount = 6,
  emptyTitle = "No products found.",
  emptyDescription = "Try adjusting your filters.",
  errorTitle = "Something went wrong.",
  errorDescription = "Failed to load products. Please try again.",
}: ProductGridProps) {
  const gridCols = `grid-cols-1 ${columns.sm ? columnClasses[columns.sm] || "" : ""} ${columns.lg ? columnClasses[columns.lg] || "" : ""}`.trim();
  // Loading skeletons
  if (loading) {
    return (
      <div className={`grid ${gridCols} gap-6`}>
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-destructive">
        <p className="text-lg font-medium">{errorTitle}</p>
        <p className="text-sm text-muted-foreground">{errorDescription}</p>
      </div>
    );
  }

  // Empty state
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
        <p className="text-lg">{emptyTitle}</p>
        <p className="text-sm">{emptyDescription}</p>
      </div>
    );
  }

  // Product grid with stagger animation
  return (
    <motion.div
      className={`grid ${gridCols} gap-6`}
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: 0.08 },
        },
      }}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </motion.div>
  );
}
