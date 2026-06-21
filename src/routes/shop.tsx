import { createFileRoute } from "@tanstack/react-router";
import { ProductCard, type Product } from "@/components/ProductCard";
import { CATEGORIES } from "@/lib/brand";
import { useState } from "react";

import Pic1 from "@/assets/Pic1.jpeg";
import Pic2 from "@/assets/Pic2.jpeg";
import Pic3 from "@/assets/Pic3.png";
import Pic4 from "@/assets/Pic4.png";
import Pic5 from "@/assets/Pic5.png";
import Pic6 from "@/assets/Pic6.png";
import Pic7 from "@/assets/Pic7.png";
import Pic8 from "@/assets/Pic8.png";
import Pic9 from "@/assets/Pic9.png";
import Pic10 from "@/assets/Pic10.png";
import Pic11 from "@/assets/Pic11.png";

const PRODUCTS: Product[] = [
  { id: "p1",  name: "Product 1",  slug: "product-1",  price: 2999, category: "Necklaces", images: [Pic1],  stock_count: 12, is_featured: true,  is_limited_edition: false },
  { id: "p2",  name: "Product 2",  slug: "product-2",  price: 3499, category: "Earrings",  images: [Pic2],  stock_count: 8,  is_featured: false, is_limited_edition: false },
  { id: "p3",  name: "Product 3",  slug: "product-3",  price: 4999, category: "Rings",     images: [Pic3],  stock_count: 5,  is_featured: false, is_limited_edition: true  },
  { id: "p4",  name: "Product 4",  slug: "product-4",  price: 4499, category: "Necklaces", images: [Pic4],  stock_count: 9,  is_featured: false, is_limited_edition: true  },
  { id: "p5",  name: "Product 5",  slug: "product-5",  price: 3299, category: "Earrings",  images: [Pic5],  stock_count: 15, is_featured: true,  is_limited_edition: false },
  { id: "p6",  name: "Product 6",  slug: "product-6",  price: 5999, category: "Rings",     images: [Pic6],  stock_count: 6,  is_featured: false, is_limited_edition: false },
  { id: "p7",  name: "Product 7",  slug: "product-7",  price: 2799, category: "Bangles",   images: [Pic7],  stock_count: 20, is_featured: false, is_limited_edition: false },
  { id: "p8",  name: "Product 8",  slug: "product-8",  price: 7499, category: "Necklaces", images: [Pic8],  stock_count: 4,  is_featured: true,  is_limited_edition: true  },
  { id: "p9",  name: "Product 9",  slug: "product-9",  price: 3999, category: "Earrings",  images: [Pic9],  stock_count: 12, is_featured: false, is_limited_edition: false },
  { id: "p10", name: "Product 10", slug: "product-10", price: 6499, category: "Rings",     images: [Pic10], stock_count: 0,  is_featured: false, is_limited_edition: true  },
  { id: "p11", name: "Product 11", slug: "product-11", price: 4299, category: "Bangles",   images: [Pic11], stock_count: 9,  is_featured: true,  is_limited_edition: false },
];

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — Sahiba Vij Jewellery" },
      { name: "description", content: "Browse our collection of necklaces, earrings, rings, bangles, and bridal sets in micron gold polish." },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  const [cat, setCat] = useState<string>("all");

  const products = cat === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === cat);

  return (
    <div className="container mx-auto px-6 md:px-12 py-16 md:py-24">
      <div className="text-center mb-16">
        <p className="text-gold text-xs tracking-[0.3em] uppercase mb-4">The Collection</p>
        <h1 className="font-serif text-5xl md:text-7xl text-foreground">Shop All</h1>
        <div className="gold-rule w-24 mx-auto mt-6" />
      </div>

      {/* Category Filters - Luxury Style */}
      <div className="flex flex-wrap justify-center gap-3 mb-16">
        {CATEGORIES.map((c) => (
          <button
            key={c.value}
            onClick={() => setCat(c.value)}
            className={`px-6 py-2 text-xs tracking-[0.2em] uppercase transition-all duration-300 ${
              cat === c.value
                ? "bg-gold text-background"
                : "border border-gold/30 text-muted hover:border-gold hover:text-gold"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {products.length === 0 ? (
        <p className="text-center text-muted py-20 font-serif text-xl italic">
          Nothing in this category yet — check back soon.
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((p, i) => (
            <ProductCard key={p.id} p={p} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}