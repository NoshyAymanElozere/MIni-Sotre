"use client";

import MainLayout from "@/components/templates/MainLayout";
import ProductGrid from "@/components/organisms/ProductGrid";
import FiltersSidebar from "@/components/organisms/FiltersSidebar";
import { useProducts } from "@/hooks/useProducts";

export default function Home() {
  const { products, isLoading, isError, updateFilter } = useProducts();

  return (
    <MainLayout>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="w-full md:w-64 shrink-0">
          <FiltersSidebar
            onCategoryChange={(val) => updateFilter("category", val)}
            onPriceMinChange={(val) => updateFilter("priceMin", val)}
            onPriceMaxChange={(val) => updateFilter("priceMax", val)}
            onSearchChange={(val) => updateFilter("search", val)}
          />
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          <ProductGrid products={products} loading={isLoading} error={isError} />
        </div>
      </div>
    </MainLayout>
  );
}
