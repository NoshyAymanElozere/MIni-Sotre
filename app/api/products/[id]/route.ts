import { NextRequest, NextResponse } from "next/server";
import { products } from "@/data/products";
import { ApiResponse, Product } from "@/types/product";

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const product = products.find((p) => p.id === Number(params.id));

  if (!product) {
    const response: ApiResponse<null> = {
      success: false,
      data: null,
      message: "Product not found",
    };
    return NextResponse.json(response, { status: 404 });
  }

  const response: ApiResponse<Product> = {
    success: true,
    data: product,
  };

  return NextResponse.json(response);
}
