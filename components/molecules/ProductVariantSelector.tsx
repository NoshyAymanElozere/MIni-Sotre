"use client";

import { cn } from "@/lib/utils";

interface ProductVariantSelectorProps {
  label: string;
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
}

export default function ProductVariantSelector({
  label,
  options,
  selected,
  onSelect,
}: ProductVariantSelectorProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
      <div className="flex gap-2 flex-wrap">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onSelect(option)}
            className={cn(
              "px-3 py-1 rounded-md border text-sm transition-colors",
              selected === option
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background text-foreground border-border hover:bg-accent"
            )}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
