"use client";

import { AnimatePresence } from "framer-motion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/useCart";
import Button from "@/components/atoms/Button";
import EmptyState from "@/components/atoms/EmptyState";
import CartItemRow from "@/components/molecules/CartItemRow";
import { ShoppingCart } from "lucide-react";

export default function CartDrawer() {
  const items = useCart((state) => state.items);
  const clearCart = useCart((state) => state.clearCart);
  const totalPrice = useCart((state) => state.totalPrice);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="flex flex-col w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Cart ({itemCount} items)
          </SheetTitle>
        </SheetHeader>

        <Separator />

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto py-4">
          {items.length === 0 ? (
            <EmptyState
              icon={<ShoppingCart className="h-12 w-12" />}
              title="Your cart is empty"
              description="Add items to get started!"
              className="h-full"
            />
          ) : (
            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <CartItemRow
                  key={`${item.productId}-${item.selectedSize}-${item.selectedColor}`}
                  item={item}
                />
              ))}
            </AnimatePresence>
          )}
        </div>

        {/* Cart Footer */}
        {items.length > 0 && (
          <div className="border-t pt-4 flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Total</span>
              <span className="text-lg font-bold">
                ${totalPrice().toFixed(2)}
              </span>
            </div>
            <Button className="w-full" onClick={() => clearCart()}>
              Clear Cart
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
