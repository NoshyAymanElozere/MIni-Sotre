"use client";

import { Button as ShadcnButton } from "@/components/ui/button";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "destructive" | "ghost" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
}

export default function Button({
  children,
  variant = "default",
  size = "default",
  ...props
}: ButtonProps) {
  return (
    <ShadcnButton variant={variant} size={size} {...props}>
      {children}
    </ShadcnButton>
  );
}
