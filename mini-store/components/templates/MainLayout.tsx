"use client";

import { ReactNode } from "react";
import CartDrawer from "@/components/organisms/CartDrawer";
import { Store } from "lucide-react";

interface MainLayoutProps {
  children: ReactNode;
  title?: string;
  showCart?: boolean;
}

export default function MainLayout({
  children,
  title = "Mini Store",
  showCart = true,
}: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-2">
            <Store className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">{title}</h1>
          </div>
          {showCart && <CartDrawer />}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">{children}</main>

     
    </div>
  );
}
