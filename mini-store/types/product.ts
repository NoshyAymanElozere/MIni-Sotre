export interface ProductVariant {
  sizes: string[];
  colors: string[];
}

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  variants: ProductVariant;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
