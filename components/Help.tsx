"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, HelpCircle, Rocket, Star } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const Help = () => {
  const [openProfileDropdown, setOpenProfileDropdown] = useState<
    "profile" | "help" | null
  >(null);

  return (
    <div className="w-full md:flex items-center gap-1 md:gap-2 hover:bg-gray-100 ">
      <div
        className="w-full relative md:flex items-center gap-1 cursor-pointer select-none"
        onMouseEnter={() => setOpenProfileDropdown("help")}
        onMouseLeave={() => setOpenProfileDropdown(null)}
        onClick={() =>
          setOpenProfileDropdown(openProfileDropdown === "help" ? null : "help")
        }
      >
        <span className="w-full flex items-center justify-between px-4 py-2 text-xs rounded">
          <div className="flex gap-1">
            <HelpCircle size={16} /> Help
          </div>

          <ChevronRight size={16} />
        </span>

        <AnimatePresence>
          {openProfileDropdown === "help" && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute -left-44 top-0 ml-2 w-40 bg-white rounded-md shadow-lg z-50 overflow-hidden"
              onMouseEnter={() => setOpenProfileDropdown("help")}
              onMouseLeave={() => setOpenProfileDropdown(null)}
            >
              <Link
                className="flex gap-2 px-4 py-2 text-xs hover:bg-gray-100"
                href="/whats-new"
              >
                <Rocket size={16} /> What’s new
              </Link>
              <Link
                className="flex gap-2 px-4 py-2 text-xs hover:bg-gray-100"
                href="/help"
              >
                <HelpCircle size={16} /> Help Center
              </Link>
              <Link
                className="flex gap-2 px-4 py-2 text-xs hover:bg-gray-100"
                href="/community"
              >
                <Star size={16} /> Community
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Help;
