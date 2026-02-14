"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/types/product";
import { ApiResponse } from "@/types/product";

interface Filters {
  category: string;
  priceMin: string;
  priceMax: string;
  search: string;
}

// Fetch function — builds query string and calls API


export function useProducts() {
  const [filters, setFilters] = useState<Filters>({
    category: "",
    priceMin: "",
    priceMax: "",
    search: "",
  });
  async function fetchProducts(filters: Filters): Promise<Product[]> {
  const params = new URLSearchParams();
  if (filters.category) params.set("category", filters.category);
  if (filters.priceMin) params.set("priceMin", filters.priceMin);
  if (filters.priceMax) params.set("priceMax", filters.priceMax);
  if (filters.search) params.set("search", filters.search);

  const res = await fetch(`/api/products?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch products");

  const json: ApiResponse<Product[]> = await res.json();
  return json.data;
}

  const { data: products = [], isLoading, isError, error } = useQuery({
    queryKey: ["products", filters],
    queryFn: () => fetchProducts(filters),
  });

  const updateFilter = (key: keyof Filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return { products, isLoading, isError, error, filters, updateFilter };
}
