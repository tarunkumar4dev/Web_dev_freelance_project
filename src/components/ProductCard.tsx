import { Link } from "@tanstack/react-router";
import { formatINR } from "@/lib/cart";

export type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  category: string;
  images: string[];
  stock_count: number;
  is_featured: boolean;
  is_limited_edition: boolean;
};

export function ProductCard({ p, index = 0 }: { p: Product; index?: number }) {
  const soldOut = p.stock_count <= 0;
  const num = String(index + 1).padStart(2, "0");

  return (
    <Link to="/product/$slug" params={{ slug: p.slug }} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-surface">
        <img
          src={p.images[0]}
          alt={p.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 brightness-90"
        />
        
        <div className="absolute inset-0 card-overlay" />
        
        {/* Editorial Number */}
        <span className="editorial-number absolute top-4 right-4">
          /{num}
        </span>
        
        {p.is_limited_edition && !soldOut && (
          <span className="absolute top-4 left-4 bg-mauve/20 text-mauve text-[9px] tracking-[0.2em] uppercase px-3 py-1">
            Limited
          </span>
        )}
        
        {soldOut && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
            <span className="text-xs tracking-[0.3em] uppercase text-muted">
              Sold Out
            </span>
          </div>
        )}
        
        {/* Text at bottom */}
        <div className="absolute bottom-5 left-5 right-5">
          <h3 className="font-serif text-xl text-cream group-hover:text-mauve transition-colors">
            {p.name}
          </h3>
          <p className="text-xs tracking-[0.2em] uppercase text-gold mt-1">
            {formatINR(p.price)}
          </p>
        </div>
      </div>
    </Link>
  );
}