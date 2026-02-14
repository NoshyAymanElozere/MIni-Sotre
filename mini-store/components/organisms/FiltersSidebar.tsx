"use client";

import SearchBar from "@/components/molecules/SearchBar";
import Input from "@/components/atoms/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DEFAULT_CATEGORIES = ["T-Shirts", "Pants", "Hoodies", "Shoes", "Jackets"];

interface FiltersSidebarProps {
  onCategoryChange: (value: string) => void;
  onPriceMinChange: (value: string) => void;
  onPriceMaxChange: (value: string) => void;
  onSearchChange: (value: string) => void;
  categories?: string[];
  className?: string;
}

export default function FiltersSidebar({
  onCategoryChange,
  onPriceMinChange,
  onPriceMaxChange,
  onSearchChange,
  categories = DEFAULT_CATEGORIES,
  className,
}: FiltersSidebarProps) {
  return (
    <aside className={`flex flex-col gap-6 p-4 rounded-lg border bg-card ${className || ""}`}>
      <h2 className="text-lg font-semibold">Filters</h2>

      {/* Search */}
      <SearchBar onSearch={onSearchChange} />

      {/* Category Select */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-foreground">Category</label>
        <Select
          onValueChange={(val) =>
            onCategoryChange(val === "all" ? "" : val)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price Range */}
      <div className="flex flex-col gap-3">
        <span className="text-sm font-medium text-foreground">Price Range</span>
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Min"
            min={0}
            onChange={(e) => onPriceMinChange(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Max"
            min={0}
            onChange={(e) => onPriceMaxChange(e.target.value)}
          />
        </div>
      </div>
    </aside>
  );
}
