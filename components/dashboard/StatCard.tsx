"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: ReactNode;
  href?: string;
  description?: string;
}

export default function StatCard({
  title,
  value,
  icon,
  href = "#",
  description,
}: StatCardProps) {
  return (
    <Link href={href}>
      <motion.div
        whileHover={{ scale: 1.03 }}
        className="bg-white rounded-xl shadow-md p-5 cursor-pointer transition"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
            {description && (
              <p className="text-xs text-gray-400 mt-1">{description}</p>
            )}
          </div>

          <div className="text-gray-600">{icon}</div>
        </div>
      </motion.div>
    </Link>
  );
}