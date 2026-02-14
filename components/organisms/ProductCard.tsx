"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Product } from "@/types/product";
import { useCart } from "@/hooks/useCart";
import Button from "@/components/atoms/Button";
import ProductVariantSelector from "@/components/molecules/ProductVariantSelector";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (item: {
    productId: number;
    name: string;
    price: number;
    image: string;
    selectedSize: string;
    selectedColor: string;
    quantity: number;
  }) => void;
  className?: string;
}

export default function ProductCard({
  product,
  onAddToCart,
  className,
}: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState(product.variants.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.variants.colors[0]);
  const addToCart = useCart((state) => state.addToCart);

  const handleAddToCart = () => {
    const cartItem = {
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      selectedSize,
      selectedColor,
      quantity: 1,
    };

    if (onAddToCart) {
      onAddToCart(cartItem);
    } else {
      addToCart(cartItem);
      toast.success(`${product.name} added to cart!`);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className={`rounded-lg border bg-card p-4 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow ${className || ""}`}
    >
      {/* Product Image — click to go to details */}
      <Link href={`/products/${product.id}`}>
        <div className="relative w-full aspect-square rounded-md overflow-hidden bg-muted cursor-pointer group">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover transition-transform group-hover:scale-105"
          />
        </div>
      </Link>

      {/* Product Info */}
      <div className="flex flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <Link href={`/products/${product.id}`} className="hover:underline">
            <h3 className="font-semibold text-base leading-tight">
              {product.name}
            </h3>
          </Link>
          <Badge variant="secondary" className="shrink-0">
            {product.category}
          </Badge>
        </div>

        <p className="text-lg font-bold text-primary">
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
        <Button onClick={handleAddToCart} className="w-full mt-2">
          Add to Cart
        </Button>
      </div>
    </motion.div>
  );
}
