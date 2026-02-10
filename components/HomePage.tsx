"use client";

import { ParallaxHero } from "@/components/ParallaxHero";
import { ParallaxSection } from "@/components/ParallaxSection";
import img1 from "@/public/images/elite-prop-hmlP-v0vJ5o-unsplash.jpg";
import img2 from "@/public/images/frames-for-your-heart-2d4lAQAlbDA-unsplash.jpg";
import img3 from "@/public/images/francesca-tosolini-tHkJAMcO3QE-unsplash.jpg";
import img4 from "@/public/images/lotus-design-n-print-wRzBarqn3hs-unsplash.jpg";
import img5 from "@/public/images/webaliser-_TPTXZd9mOo-unsplash.jpg";

const images = [img1, img2, img3, img4, img5];

export default function HomePage() {
  return (
    <main className="bg-neutral-950 text-white">
      {/* HERO */}
      <ParallaxHero images={images} />

      {/* FEATURED */}
      <ParallaxSection image="/images/elite-prop-hmlP-v0vJ5o-unsplash.jpg">
        <h2 className="text-5xl font-bold mb-6">Featured Properties</h2>
        <p className="text-white/70 max-w-2xl mx-auto">
          Hand-picked luxury listings from premium markets.
        </p>
      </ParallaxSection>

      {/* GRID */}
      <section className="py-32 bg-white text-black">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 px-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
                className="h-72 w-full object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold">Luxury Residence</h3>
                <p className="text-gray-500 mt-2">Los Angeles, CA</p>
                <p className="text-emerald-600 font-bold mt-4">$3,200,000</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <ParallaxSection image="/images/webaliser-_TPTXZd9mOo-unsplash.jpg">
        <h2 className="text-5xl font-bold">List Your Property</h2>
        <p className="mt-6 text-white/70">
          Reach global investors and serious buyers.
        </p>
        <button className="mt-10 bg-emerald-500 px-8 py-4 rounded-xl text-lg">
          Get Started
        </button>
      </ParallaxSection>
    </main>
  );
}
