import { Link } from "react-router-dom";
import Button from "../common/Button";

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(201,169,98,0.15)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(255,255,255,0.05)_0%,_transparent_40%)]" />

      <div className="page-container relative py-24 md:py-32 lg:py-40">
        <div className="max-w-2xl animate-fade-in">
          <p className="text-accent text-xs font-semibold uppercase tracking-[0.3em] mb-4">
            New Collection 2026
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
            Elevate your
            <br />
            <span className="text-white/90">everyday.</span>
          </h1>
          <p className="mt-6 text-lg text-white/60 max-w-md leading-relaxed">
            Discover curated essentials with immersive 3D previews. Premium
            quality, timeless design.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="#products">
              <Button variant="primary">Explore Collection</Button>
            </Link>
            <Link to="/cart">
              <Button variant="ghost" className="!text-white !border-white/30 hover:!bg-white/10">
                View Cart
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
    </section>
  );
}

export default HeroSection;
