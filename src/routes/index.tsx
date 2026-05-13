import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ProductCard, type Product } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import heroImg from "@/assets/hero-dark.jpg";
import founderImg from "@/assets/founder-dark.jpg";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const { data: featured } = useQuery({
    queryKey: ["products", "featured"],
    queryFn: async () => {
      const { data } = await supabase
        .from("products")
        .select("*")
        .eq("is_featured", true)
        .limit(6);
      return (data ?? []) as Product[];
    },
  });

  return (
    <div className="bg-background">
      {/* HERO SECTION - FULL SCREEN */}
      <section className="relative w-full h-screen overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <img 
            src={heroImg} 
            alt="Garden flowers" 
            className="w-full h-full object-cover object-center"
          />
          {/* Gradient Overlay - Better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
        </div>

        {/* Content - Perfectly Centered Left with proper positioning */}
        <div className="relative h-full w-full flex items-center z-10">
          <div className="container mx-auto px-5 md:px-8 lg:px-12">
            <div className="max-w-2xl lg:max-w-3xl">
              {/* FRESH Label */}
              <p className="text-[10px] sm:text-[11px] md:text-xs tracking-[0.3em] md:tracking-[0.4em] uppercase text-gold mb-4 sm:mb-6 md:mb-8 animate-fade-up">
                FRESH
              </p>
              
              {/* Heading - From Our Garden */}
              <h1 className="mb-4 sm:mb-6 md:mb-8">
                <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-cream font-serif font-light tracking-tight animate-fade-up" style={{animationDelay: "0.1s"}}>
                  From Our
                </span>
                <span className="block text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-mauve font-serif font-light italic mt-1 sm:mt-2 animate-fade-up" style={{animationDelay: "0.2s"}}>
                  Garden
                </span>
              </h1>
              
              {/* Description - Responsive text */}
              <p className="text-cream/80 text-sm sm:text-base md:text-lg leading-relaxed sm:leading-relaxed max-w-lg lg:max-w-xl mb-8 sm:mb-10 md:mb-12 animate-fade-up" style={{animationDelay: "0.3s"}}>
                We are proud to boast flowers that are days fresher than you can buy from a shop or the market, as we obtain our flowers directly from the growers and deliver them to you in one of our bespoke, refrigerated vans.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED SECTION */}
      <section className="container mx-auto px-5 md:px-8 lg:px-12 py-16 md:py-24 lg:py-32">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-gold mb-3 md:mb-4">Signature Pieces</p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-cream">Featured Collection</h2>
          <div className="gold-rule mx-auto mt-5 md:mt-6" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {featured?.slice(0, 3).map((product, idx) => (
            <ProductCard key={product.id} p={product} index={idx} />
          ))}
        </div>
      </section>

      {/* BRAND INTRO */}
      <section className="bg-surface py-16 md:py-24 lg:py-32">
        <Reveal className="container mx-auto px-5 md:px-8 lg:px-12 max-w-3xl text-center">
          <p className="text-muted text-sm md:text-base leading-relaxed">
            We are proud to bring you the finest blooms, handpicked from our own gardens 
            and curated with an editor's eye for beauty, impermanence, and quiet luxury.
          </p>
        </Reveal>
      </section>

      {/* DESIGNER SECTION */}
      <section className="bg-background">
        <div className="grid md:grid-cols-2 gap-0">
          <Reveal className="relative h-[400px] sm:h-[500px] md:h-[600px] overflow-hidden">
            <img src={founderImg} alt="Sahiba Vij" className="w-full h-full object-cover brightness-90" />
          </Reveal>
          <Reveal delay={150} className="flex items-center p-6 md:p-8 lg:p-12 bg-surface">
            <div>
              <p className="text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-gold mb-4 md:mb-6">Meet the Designer</p>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-cream leading-[1.1] mb-4 md:mb-6">
                A muse with <span className="text-mauve italic">14 years</span> of craft
              </h2>
              <div className="gold-rule mb-6 md:mb-8" />
              <p className="text-muted text-sm md:text-base leading-relaxed mb-5 md:mb-6">
                Sahiba Vij blends a Media & Culture Studies background from London with 
                14 years of jewellery design — creating cinematic, story-driven pieces 
                that feel luxurious yet remain beautifully accessible.
              </p>
              <Link to="/about" className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-mauve hover:text-gold transition-colors">
                Read Her Story →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* NEWSLETTER */}
      <NewsletterSection />
    </div>
  );
}

function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return toast.error("Enter a valid email");
    setLoading(true);
    const { error } = await supabase.from("newsletter_subscribers").insert({ email });
    setLoading(false);
    if (error && !error.message.includes("duplicate")) {
      toast.error("Couldn't subscribe. Try again.");
    } else {
      toast.success("Welcome to the muse list");
      setEmail("");
    }
  };

  return (
    <section className="container mx-auto px-5 md:px-8 lg:px-12 py-16 md:py-24 lg:py-32">
      <Reveal>
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-gold mb-4 md:mb-6">Join the Muse List</p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-cream mb-3 md:mb-4">Be the first to know</h2>
          <p className="text-muted text-sm md:text-base mb-8 md:mb-10">New collections, limited drops, and quiet stories — straight to your inbox.</p>
          <form onSubmit={subscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 md:px-5 py-3 bg-background border border-border text-cream placeholder:text-muted/50 focus:outline-none focus:border-mauve transition-colors text-sm"
            />
            <button disabled={loading} className="px-6 md:px-8 py-3 bg-mauve text-background text-[10px] md:text-xs tracking-[0.3em] uppercase hover:bg-gold transition-all disabled:opacity-50">
              {loading ? "..." : "Subscribe"}
            </button>
          </form>
        </div>
      </Reveal>
    </section>
  );
}