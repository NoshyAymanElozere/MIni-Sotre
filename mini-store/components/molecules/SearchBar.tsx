"use client";

import { useMemo, useCallback } from "react";
import Input from "@/components/atoms/Input";
import { debounce } from "@/lib/debounce";

interface SearchBarProps {
  onSearch: (value: string) => void;
  placeholder?: string;
  delay?: number;
  className?: string;
}

export default function SearchBar({
  onSearch,
  placeholder = "Search products...",
  delay = 300,
  className,
}: SearchBarProps) {
  // Debounce the search callback
  const debouncedSearch = useMemo(
    () => debounce((value: string) => onSearch(value), delay),
    [onSearch, delay]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      debouncedSearch(e.target.value);
    },
    [debouncedSearch]
  );

  return (
    <Input
      placeholder={placeholder}
      onChange={handleChange}
      type="search"
      aria-label="Search products"
      className={className}
    />
  );
}
