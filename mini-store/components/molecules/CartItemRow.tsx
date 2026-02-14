"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useCart } from "@/hooks/useCart";
import Button from "@/components/atoms/Button";
import { Trash2, Plus, Minus } from "lucide-react";
import { CartItem } from "@/types/cart";

interface CartItemRowProps {
  item: CartItem;
  onIncrement?: (productId: number, size: string, color: string) => void;
  onDecrement?: (productId: number, size: string, color: string) => void;
  onRemove?: (productId: number, size: string, color: string) => void;
}

export default function CartItemRow({
  item,
  onIncrement,
  onDecrement,
  onRemove,
}: CartItemRowProps) {
  const increment = useCart((state) => state.increment);
  const decrement = useCart((state) => state.decrement);
  const removeFromCart = useCart((state) => state.removeFromCart);

  const handleIncrement = () => {
    (onIncrement || increment)(
      item.productId,
      item.selectedSize,
      item.selectedColor
    );
  };

  const handleDecrement = () => {
    (onDecrement || decrement)(
      item.productId,
      item.selectedSize,
      item.selectedColor
    );
  };

  const handleRemove = () => {
    (onRemove || removeFromCart)(
      item.productId,
      item.selectedSize,
      item.selectedColor
    );
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      className="flex gap-3 py-3 border-b last:border-b-0"
    >
      {/* Item Image */}
      <div className="relative w-16 h-16 rounded-md overflow-hidden bg-muted shrink-0">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="64px"
          className="object-cover"
        />
      </div>

      {/* Item Details */}
      <div className="flex-1 flex flex-col gap-1">
        <div className="flex justify-between items-start">
          <div>
            <p className="font-medium text-sm">{item.name}</p>
            <p className="text-xs text-muted-foreground">
              {item.selectedSize} / {item.selectedColor}
            </p>
          </div>
          <p className="font-semibold text-sm">
            ${(item.price * item.quantity).toFixed(2)}
          </p>
        </div>

        <div className="flex items-center justify-between">
          {/* Quantity Controls */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={handleDecrement}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="text-sm font-medium w-6 text-center">
              {item.quantity}
            </span>
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={handleIncrement}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          {/* Remove Button */}
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-destructive hover:text-destructive"
            onClick={handleRemove}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
