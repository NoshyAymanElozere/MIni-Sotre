"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem } from "@/types/cart";

interface CartState {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: number, size: string, color: string) => void;
  increment: (productId: number, size: string, color: string) => void;
  decrement: (productId: number, size: string, color: string) => void;
  clearCart: () => void;
  totalPrice: () => number;
}

/**
  Zustand store for cart state with localStorage persistence.
 */
export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (item) => {
        set((state) => {
          // Check if item with same product, size, and color exists
          const existing = state.items.find(
            (i) =>
              i.productId === item.productId &&
              i.selectedSize === item.selectedSize &&
              i.selectedColor === item.selectedColor
          );

          if (existing) {
            // Increase quantity of existing item
            return {
              items: state.items.map((i) =>
                i.productId === item.productId &&
                i.selectedSize === item.selectedSize &&
                i.selectedColor === item.selectedColor
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }

          // Add new item
          return { items: [...state.items, item] };
        });
      },

      removeFromCart: (productId, size, color) => {
        set((state) => ({
          items: state.items.filter(
            (i) =>
              !(
                i.productId === productId &&
                i.selectedSize === size &&
                i.selectedColor === color
              )
          ),
        }));
      },

      increment: (productId, size, color) => {
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId &&
            i.selectedSize === size &&
            i.selectedColor === color
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        }));
      },

      decrement: (productId, size, color) => {
        set((state) => ({
          items: state.items
            .map((i) =>
              i.productId === productId &&
              i.selectedSize === size &&
              i.selectedColor === color
                ? { ...i, quantity: i.quantity - 1 }
                : i
            )
            .filter((i) => i.quantity > 0),
        }));
      },

      clearCart: () => set({ items: [] }),

      totalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
    }),
    {
      name: "mini-store-cart", // localStorage key
    }
  )
);
