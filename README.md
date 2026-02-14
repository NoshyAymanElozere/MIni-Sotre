# Mini Store

A simple e-commerce application built with Next.js 14 (App Router) for assessment purposes.

## Tech Stack

- **Next.js 14** — App Router with TypeScript
- **Tailwind CSS** — Utility-first CSS framework
- **Shadcn UI** — Accessible component library
- **Zustand** — Lightweight state management (cart)
- **Framer Motion** — Simple animations
- **react-hot-toast** — Toast notifications

## Getting Started

### Prerequisites

- npm



## Project Structure (Atomic Design)

```
mini-store/
├── app/
│   ├── api/
│   │   └── products/
│   │       ├── route.ts              # GET /api/products (with filters)
│   │       └── [id]/
│   │           └── route.ts          # GET /api/products/:id
│   ├── globals.css
│   ├── layout.tsx                    # Root layout with Toaster
│   ├── not-found.tsx                 # 404 page
│   └── page.tsx                      # Home page (product listing)
│
├── components/
│   ├── atoms/                        # Smallest reusable UI elements
│   │   ├── Button.tsx
│   │   └── Input.tsx
│   ├── molecules/                    # Combinations of atoms
│   │   ├── SearchBar.tsx
│   │   └── ProductVariantSelector.tsx
│   ├── organisms/                    # Complex UI sections
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── FiltersSidebar.tsx
│   │   └── CartDrawer.tsx
│   ├── templates/                    # Page-level layouts
│   │   └── MainLayout.tsx
│   └── ui/                           # Shadcn UI components
│
├── hooks/
│   ├── useProducts.ts                # Product fetching & filtering logic
│   └── useCart.ts                    # Zustand cart store
│
├── types/
│   ├── product.ts                    # Product & API response types
│   └── cart.ts                       # Cart item type
│
├── data/
│   └── products.ts                   # Mock product data (12 products)
│
└── lib/
    ├── debounce.ts                   # Debounce utility function
    └── utils.ts                      # Shadcn utility (cn)
```

## Architecture

### Atomic Design Pattern

Components are organized by complexity:

1. **Atoms** — Basic building blocks (`Button`, `Input`)
2. **Molecules** — Small groups of atoms (`SearchBar`, `ProductVariantSelector`)
3. **Organisms** — Complex UI sections (`ProductCard`, `CartDrawer`, `FiltersSidebar`)
4. **Templates** — Page-level layout (`MainLayout`)

### State Management (Zustand)

Cart state is managed globally using Zustand with `localStorage` persistence:

- `addToCart` — Add item (or increase quantity if same variant exists)
- `increment` / `decrement` — Adjust quantity
- `removeFromCart` — Remove a specific variant
- `clearCart` — Empty the cart
- `totalPrice` — Computed total

### Custom Hooks

Business logic is separated into custom hooks:

- **`useProducts`** — Fetches products from the API with dynamic filter support
- **`useCart`** — Zustand store for cart state (persisted to localStorage)

## Features

- Responsive product grid with loading skeletons
- Category, price range, and search filtering
- Debounced search (300ms)
- Variant selection (size & color) per product
- Slide-in cart drawer with quantity controls
- Toast notifications on add-to-cart
- Stagger animations with Framer Motion
- Cart persistence via localStorage
- 404 page for missing routes

## Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Build for production     |
| `npm run start` | Start production server  |
