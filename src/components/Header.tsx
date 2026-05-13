import { Link } from "@tanstack/react-router";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/lib/cart";

const NAV = [
  { to: "/", label: "HOME" },
  { to: "/shop", label: "SHOP" },
  { to: "/about", label: "OUR STORY" },
  { to: "/track", label: "TRACK ORDER" },
  { to: "/contact", label: "CONTACT" },
] as const;

export function Header() {
  const items = useCart();
  const count = items.reduce((s, i) => s + i.quantity, 0);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled ? "bg-background/90 backdrop-blur-md py-3" : "bg-transparent py-5"
      }`}>
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between">
            {/* Brand Name - Left */}
            <Link to="/" className="group">
              <span className="font-serif italic text-sm md:text-base tracking-[0.15em] text-cream hover:text-mauve transition-colors duration-300">
                Sahiba Vij
              </span>
            </Link>

            {/* Desktop Navigation - Center */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8 absolute left-1/2 transform -translate-x-1/2">
              {NAV.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  className="text-[10px] tracking-[0.25em] text-cream/70 hover:text-mauve transition-all duration-300 font-light"
                  activeProps={{ className: "text-mauve" }}
                >
                  {n.label}
                </Link>
              ))}
            </nav>

            {/* Cart & Menu - Right */}
            <div className="flex items-center gap-3">
              <Link to="/cart" className="relative text-cream/70 hover:text-mauve transition-colors">
                <ShoppingBag className="w-4 h-4" strokeWidth={1.2} />
                {count > 0 && (
                  <span className="absolute -top-2 -right-2 bg-mauve w-3.5 h-3.5 rounded-full text-[8px] text-background flex items-center justify-center">
                    {count}
                  </span>
                )}
              </Link>
              <button
                className="md:hidden text-cream/70 hover:text-mauve"
                onClick={() => setOpen(!open)}
              >
                {open ? <X className="w-5 h-5" strokeWidth={1.2} /> : <Menu className="w-5 h-5" strokeWidth={1.2} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="h-16 md:h-20" />

      {/* Mobile Menu */}
      {open && (
        <div className="fixed inset-0 top-16 bg-background/95 backdrop-blur-lg z-40 md:hidden">
          <div className="container px-6 py-8 flex flex-col gap-1">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="py-4 text-xs tracking-[0.25em] text-cream/70 hover:text-mauve border-b border-white/10"
              >
                {n.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}