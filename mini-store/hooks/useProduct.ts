"use client";

import { useQuery } from "@tanstack/react-query";
import { Product, ApiResponse } from "@/types/product";

// Fetch a single product by ID
async function fetchProduct(id: string): Promise<Product> {
  const res = await fetch(`/api/products/${id}`);
  const json: ApiResponse<Product> = await res.json();

  if (!res.ok || !json.success) {
    throw new Error(json.message || "Product not found");
  }

  return json.data;
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
    enabled: !!id,
  });
}
