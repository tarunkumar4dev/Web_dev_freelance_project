import { Link } from "@tanstack/react-router";
import { Instagram, Mail, MessageCircle } from "lucide-react";
import { BRAND } from "@/lib/brand";

export function Footer() {
  return (
    <footer className="mt-32 bg-surface border-t border-gold/10">
      {/* Main Footer */}
      <div className="container mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="font-serif text-3xl text-foreground mb-4">{BRAND.name}</h3>
            <p className="text-muted text-sm italic mb-6">Heritage · Crafted · Story-driven</p>
            <div className="gold-rule w-16 mb-6" />
            <p className="text-muted text-sm leading-relaxed max-w-md">
              Cinematic Indian jewellery in micron gold polish — wearable heirlooms for the modern muse.
            </p>
            <div className="flex gap-4 mt-8">
              <a href={BRAND.instagram} target="_blank" rel="noreferrer" 
                className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-background transition-all duration-300">
                <Instagram className="w-4 h-4" strokeWidth={1.2} />
              </a>
              <a href={`https://wa.me/${BRAND.whatsappNumber}`} target="_blank" rel="noreferrer"
                className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-background transition-all duration-300">
                <MessageCircle className="w-4 h-4" strokeWidth={1.2} />
              </a>
              <a href={`mailto:${BRAND.email}`}
                className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-background transition-all duration-300">
                <Mail className="w-4 h-4" strokeWidth={1.2} />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-[10px] tracking-[0.3em] uppercase text-gold mb-6">Explore</h4>
            <ul className="space-y-3">
              {["Shop", "Our Story", "Track Order", "Contact"].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase().replace(" ", "-")}`} 
                    className="text-sm text-muted hover:text-gold transition-colors duration-300">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-[10px] tracking-[0.3em] uppercase text-gold mb-6">Connect</h4>
            <ul className="space-y-3">
              <li className="text-sm text-muted">WhatsApp Support</li>
              <li className="text-sm text-muted">7-Day Exchange</li>
              <li className="text-sm text-muted">COD Available</li>
              <li className="text-sm text-muted">Pan India Shipping</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gold/10">
        <div className="container mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] tracking-[0.2em] uppercase text-muted">
            © {new Date().getFullYear()} {BRAND.name} — All rights reserved
          </p>
          <p className="text-[10px] tracking-[0.2em] uppercase text-gold/60">
            Crafted with love in India
          </p>
        </div>
      </div>
    </footer>
  );
}