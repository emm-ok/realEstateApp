"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Search, MapPin, Home, DollarSign, Mail } from "lucide-react";

import hero1 from "@/public/images/elite-prop-hmlP-v0vJ5o-unsplash.jpg";
import hero2 from "@/public/images/frames-for-your-heart-2d4lAQAlbDA-unsplash.jpg";
import hero3 from "@/public/images/francesca-tosolini-tHkJAMcO3QE-unsplash.jpg";
import Listings from "./listing/Listings";

const heroImages = [hero1, hero2, hero3];

export default function HomePage() {
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % heroImages.length);
    }, 4000); // 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="w-full">

      {/* HERO */}
      <section className="relative h-[85vh] w-full flex items-center justify-center text-white">
        <Image
          src={heroImages[activeImage]}
          alt="Real Estate"
          fill
          priority
          className="object-cover transition-opacity duration-1000"
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 max-w-4xl w-full px-4 text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold">
            Find Your Perfect Property
          </h1>
          <p className="text-lg md:text-xl text-gray-200">
            Buy, rent, or invest in real estate effortlessly.
          </p>

          {/* Search */}
          <div className="bg-white rounded-xl p-3 grid grid-cols-1 md:grid-cols-4 gap-2 text-black">
            <div className="flex items-center gap-2">
              <MapPin size={18} />
              <input placeholder="Location" className="outline-none w-full" />
            </div>
            <div className="flex items-center gap-2">
              <Home size={18} />
              <input placeholder="Property Type" className="outline-none w-full" />
            </div>
            <div className="flex items-center gap-2">
              <DollarSign size={18} />
              <input placeholder="Max Budget" className="outline-none w-full" />
            </div>
            <button className="bg-black text-white rounded-lg py-2">
              <Search className="inline mr-2" size={16} />
              Search
            </button>
          </div>
        </div>
      </section>

      {/* TRUST / SOCIAL PROOF */}
      <section className="py-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Trusted by 10,000+ Home Buyers
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          We help people find verified properties with transparent pricing.
        </p>
      </section>

      {/* FEATURED LISTINGS */}
      <section className="py-16 bg-gray-50">
        <h2 className="text-2xl font-semibold text-center mb-8">
          Featured Properties
        </h2>

        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 max-w-6xl mx-auto">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow hover:shadow-lg transition"
            >
              <div className="h-48 bg-gray-300 rounded-t-xl" />
              <div className="p-4 space-y-2">
                <h3 className="font-semibold">Luxury Apartment</h3>
                <p className="text-sm text-gray-600">
                  Lekki Phase 1, Lagos
                </p>
                <p className="font-bold">$250,000</p>
              </div>
            </div>
          ))}
        </div> */}
        <Listings />
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20">
        <h2 className="text-2xl font-semibold text-center mb-10">
          How It Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-6">
          {[
            "Search verified properties",
            "Connect with agents",
            "Close deals securely",
          ].map((step, i) => (
            <div
              key={i}
              className="border rounded-xl p-6 text-center space-y-2"
            >
              <div className="text-3xl font-bold">{i + 1}</div>
              <p>{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-black text-white text-center">
        <h2 className="text-3xl font-semibold mb-4">
          Ready to find your dream home?
        </h2>
        <button className="mt-4 px-8 py-3 bg-white text-black rounded-lg">
          Get Started
        </button>
      </section>

      {/* EMAIL SUBSCRIPTION */}
      <section className="py-16 text-center">
        <h3 className="text-xl font-semibold mb-2">
          Get market insights in your inbox
        </h3>
        <p className="text-gray-600 mb-4">
          Weekly deals, trends, and property alerts.
        </p>

        <div className="flex justify-center gap-2 max-w-md mx-auto">
          <div className="flex items-center gap-2 border rounded-lg px-3 py-2 w-full">
            <Mail size={18} />
            <input
              placeholder="Enter your email"
              className="outline-none w-full"
            />
          </div>
          <button className="bg-black text-white px-5 rounded-lg">
            Subscribe
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-6 text-center text-sm text-gray-500">
        © 2026 RealEstateApp. All rights reserved.
      </footer>
    </main>
  );
}
