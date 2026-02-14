import { NextRequest, NextResponse } from "next/server";
import { products } from "@/data/products";
import { ApiResponse, Product } from "@/types/product";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const priceMin = searchParams.get("priceMin");
  const priceMax = searchParams.get("priceMax");
  const search = searchParams.get("search");

  let filtered = [...products];
  console.log("searchParams",searchParams)

  // Filter by category
  if (category) {
    filtered = filtered.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
      
    );
  }

  // Filter by minimum price
  if (priceMin) {
    filtered = filtered.filter((p) => p.price >= Number(priceMin));
  }

  // Filter by maximum price
  if (priceMax) {
    filtered = filtered.filter((p) => p.price <= Number(priceMax));
  }

  // Filter by search term (matches name)
  if (search) {
    filtered = filtered.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  const response: ApiResponse<Product[]> = {
    success: true,
    data: filtered,
  };

  return NextResponse.json(response);
}
