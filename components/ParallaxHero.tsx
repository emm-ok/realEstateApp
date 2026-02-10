"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  images: any[];
};

export function ParallaxHero({ images }: Props) {
  const [index, setIndex] = useState(0);
  const { scrollY } = useScroll();

  const y = useTransform(scrollY, [0, 500], [0, -120]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.1]);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0"
        key={index}
      >
        <Image
          src={images[index]}
          alt="hero"
          fill
          priority
          className="object-cover"
        />
      </motion.div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="max-w-3xl text-center backdrop-blur-xl bg-white/10 p-12 rounded-2xl border border-white/20">
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            Find Extraordinary Homes
          </h1>
          <p className="mt-6 text-lg text-white/80">
            Discover luxury properties across the world’s most desirable cities.
          </p>

          <div className="mt-8 flex gap-4 justify-center">
            <input
              placeholder="Search location..."
              className="px-5 py-3 rounded-xl w-64"
            />
            <button className="bg-emerald-500 text-white px-6 py-3 rounded-xl">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Controls */}
      <button
        onClick={() =>
          setIndex((i) => (i - 1 + images.length) % images.length)
        }
        className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/20 p-3 rounded-full backdrop-blur"
      >
        <ChevronLeft className="text-white" />
      </button>

      <button
        onClick={() => setIndex((i) => (i + 1) % images.length)}
        className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/20 p-3 rounded-full backdrop-blur"
      >
        <ChevronRight className="text-white" />
      </button>
    </section>
  );
}
