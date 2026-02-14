"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useProduct } from "@/hooks/useProduct";
import { useCart } from "@/hooks/useCart";
import MainLayout from "@/components/templates/MainLayout";
import Button from "@/components/atoms/Button";
import ProductVariantSelector from "@/components/molecules/ProductVariantSelector";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";

export default function ProductDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const { data: product, isLoading, isError } = useProduct(id);
  const addToCart = useCart((state) => state.addToCart);

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  // Set default variants when product loads
  useEffect(() => {
    if (product) {
      setSelectedSize(product.variants.sizes[0]);
      setSelectedColor(product.variants.colors[0]);
    }
  }, [product]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      selectedSize,
      selectedColor,
      quantity: 1,
    });
    toast.success(`${product.name} added to cart!`);
  };

  // Loading State
  if (isLoading) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-8 w-32 mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Skeleton className="aspect-square rounded-lg" />
            <div className="flex flex-col gap-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-10 w-1/3" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  // Error / Not Found State
  if (isError || !product) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <h1 className="text-6xl font-bold text-primary">404</h1>
          <h2 className="text-2xl font-semibold">Product Not Found</h2>
          <p className="text-muted-foreground">
            The product you are looking for does not exist.
          </p>
          <Link
            href="/"
            className="mt-4 px-6 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Back to Store
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Store
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Product Image */}
          <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col gap-4">
            <div>
              <Badge variant="secondary" className="mb-2">
                {product.category}
              </Badge>
              <h1 className="text-3xl font-bold">{product.name}</h1>
            </div>

            <p className="text-2xl font-bold text-primary">
              ${product.price.toFixed(2)}
            </p>

            {/* Variant Selectors */}
            <ProductVariantSelector
              label="Size"
              options={product.variants.sizes}
              selected={selectedSize}
              onSelect={setSelectedSize}
            />

            <ProductVariantSelector
              label="Color"
              options={product.variants.colors}
              selected={selectedColor}
              onSelect={setSelectedColor}
            />

            {/* Add to Cart */}
            <Button onClick={handleAddToCart} className="w-full mt-4" size="lg">
              Add to Cart
            </Button>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
}
