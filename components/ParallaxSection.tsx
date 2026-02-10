"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type Props = {
  image: string;
  children: React.ReactNode;
};

export function ParallaxSection({ image, children }: Props) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  return (
    <section ref={ref} className="relative h-[80vh] overflow-hidden">
      <motion.div
        // style={{ y }}
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${image})`,
        }}
      />

      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="max-w-5xl text-white text-center">
          {children}
        </div>
      </div>
    </section>
  );
}
