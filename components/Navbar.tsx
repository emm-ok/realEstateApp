"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import logo from "../assets/logo2.png";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ChevronUp, ChevronDown } from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import { useConfirm } from "./confirm/ConfirmProvider";
import PageLoader from "./ui/PageLoader";
import ProfileDropDown from "./ProfileDropDown";
import Logout from "./Logout";

const navLinks = [
  {
    name: "Buy",
    href: "/buy",
    subLinks: [
      { name: "Apartments", href: "/buy/apartments" },
      { name: "Houses", href: "/buy/houses" },
      { name: "Development", href: "/buy/development" },
      { name: "Properties", href: "/buy/properties" },
    ],
  },

  {
    name: "Rent",
    href: "/rent",
    subLinks: [
      { name: "Apartments", href: "/rent/apartments" },
      { name: "Houses", href: "/rent/houses" },
      { name: "Short-let / Furnished", href: "/rent/shortlet" },
      { name: "Student Housing", href: "/rent/studentHousing" },
    ],
  },

  {
    name: "Developments",
    href: "/developments",
    subLinks: [
      {
        name: "Off-plan properties",
        href: "/developments/off-plan-properties",
      },
      {
        name: "Under-construction projects",
        href: "/developments/under-construction-projects",
      },
      { name: "Developer listings", href: "/developments/developer-listings" },
    ],
  },

  {
    name: "Map View",
    href: "/map",
    subLinks: [
      { name: "Map Search (Mapbox / Google Maps)", href: "/map/map-search" },
      { name: "Nearby listings", href: "/map/nearby-listings" },
    ],
  },

  {
    name: "Agents",
    href: "/agents",
    subLinks: [
      { name: "Find an Agent", href: "/agents/find-agent" },
      { name: "Real Estate Companies", href: "/agents/real-estate-companies" },
      { name: "Verified Agents", href: "/agents/verified-agents" },
      { name: "Agent Profiles", href: "/agents/agent-profiles" },
    ],
  },

  {
    name: "Insights",
    href: "/insights",
    subLinks: [
      { name: "Property Prices", href: "/insights/property-prices" },
      { name: "Market Trends", href: "/insights/market-trends" },
      { name: "Area Guides", href: "/insights/area-guides" },
      { name: "Price per sqm", href: "/insights/price-per-sqm" },
    ],
  },

  {
    name: "Tools",
    href: "/tools",
    subLinks: [
      { name: "Mortgage Calculator", href: "/tools/mortgage-calculator" },
      {
        name: "Rent Affordability Calculator",
        href: "/tools/rent-affordabilty-calculator",
      },
      { name: "Property Valuation", href: "/tools/property-valuation" },
      { name: "ROI Calculator(for investors)", href: "/tools/roi-calculator" },
    ],
  },
  {
    name: "Resources",
    href: "/resources",
    subLinks: [
      { name: "Blog / News", href: "/resources/blog" },
      { name: "Buying Guides", href: "/resources/buying-guides" },
      { name: "Renting Guides", href: "/resources/renting-guides" },
      { name: "Legal Tips", href: "/resources/legal-tips" },
    ],
  },
];

const otherThree = [
  {
    name: "Saved",
    href: "/saved",
    subLink: [
      { name: "Saved Properties", href: "/saved/saved-properties" },
      { name: "Saved Searches", href: "/saved/saved-searches" },
    ],
  },

  {
    name: "Account",
    href: "/account",
    subLink: [
      { name: "Login / Sign Up", href: "/login-signup" },
      { name: "My Profile", href: "/my-profile" },
      { name: "My Listings", href: "/my-listings" },
      { name: "Messages / Chats", href: "/messages-chat" },
      { name: "Notifications", href: "/notifications" },
    ],
  },
  {
    name: "Post a Listing",
    href: "/post-listing",
    subLink: [{ name: "Post Property", href: "/post-listing/post-property" }],
  },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);

  const [openDropDown, setOpenDropDown] = useState<string | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const { user } = useAuth();
  const confirm = useConfirm();
  const profileRef = useRef<HTMLDivElement | null>(null);

  const pathname = usePathname();

  useEffect(() => {
    setMobileOpen(false);
    setMobileDropdown(null);
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setOpenDropDown(null);
        setProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getInitials = (name = "") => {
    const parts = name.trim().split(" ");
    if (parts.length === 0) return "";
    if (parts.length === 1) return parts[0][0]?.toUpperCase() || "";
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const initials = getInitials(user?.name);

  const isActive = (href: string) =>
    pathname === href || pathname?.startsWith(href + "/");

  if (redirecting) {
    return <PageLoader text="Logging out..." />;
  }

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-md">
      <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-8">
          {/* Logo */}
          <Link href="/" className="cursor-pointer flex items-center gap-2">
            <Image
              src={logo}
              alt="VeriSpace logo"
              width={50}
              height={50}
              loading="eager"
              className="rounded-full shadow-sm"
            />
            <span className="hidden md:block text-sm font-bold text-primary">
              VeriSpace
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1 md:gap-2">
            {navLinks
              .map((link) => (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() =>
                    link.subLinks && setOpenDropDown(link.name)
                  }
                  onMouseLeave={() => setOpenDropDown(null)}
                >
                  <Link
                    href={link.href}
                    className={`flex items-center rounded-xs text-xs font-medium transition-colors ${
                      isActive(link.href)
                        ? "text-primary font-semibold border-primary"
                        : "text-gray-700"
                    }`}
                  >
                    {link.name}{" "}
                    {openDropDown === link.name ? (
                      <ChevronUp />
                    ) : (
                      <ChevronDown />
                    )}
                  </Link>

                  {/* Desktop Dropdown */}
                  {link.subLinks && (
                    <AnimatePresence>
                      {openDropDown === link.name && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                          className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50"
                        >
                          {link.subLinks.map((sub) => (
                            <Link
                              key={sub.name}
                              href={sub.href}
                              className={`block px-4 py-2 text-sm transition hover:bg-gray-100 ${
                                isActive(sub.href)
                                  ? "text-primary font-semibold"
                                  : "text-gray-700"
                              }`}
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))
              .slice(0, 5)}
          </div>

          <div className="flex items-center">
            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-gray-700 hover:bg-gray-100 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                {mobileOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>

            {!user ? (
              // <button
              // onClick={() => setModalOpen("login")}
              //   className="hidden md:flex bg-primary text-white px-4 py-2 rounded-lg"
              // >
              //   Login
              // </button>
              <Link
                href="/login"
                className="md:flex text-white bg-neutral-800 px-4 py-2 rounded"
              >
                Login
              </Link>
            ) : (
              <ProfileDropDown
                profileRef={profileRef}
                initials={initials}
                user={user}
                profileOpen={profileOpen}
                setProfileOpen={setProfileOpen}
                setRedirecting={setRedirecting}
                confirm={confirm}
              />
            )}
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-white"
          >
            <div className="flex flex-col p-4 space-y-2">
              {navLinks.map((link) => (
                <div key={link.name} className="flex flex-col">
                  {/* MAIN BUTTON */}
                  <button
                    onClick={() =>
                      setMobileDropdown((prev) =>
                        prev === link.name ? null : link.name,
                      )
                    }
                    className="flex justify-between items-center py-2 font-medium text-gray-700"
                  >
                    {link.name}
                    {mobileDropdown === link.name ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )}
                  </button>

                  {/* SUB LINKS */}
                  <AnimatePresence>
                    {mobileDropdown === link.name && (
                      <motion.div
                        layout
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="pl-4 flex flex-col"
                      >
                        {link.subLinks.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            onClick={() => {
                              setMobileOpen(false);
                              setMobileDropdown(null);
                            }}
                            className="py-1 text-sm text-gray-600 hover:text-primary"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              {user && <Logout />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
export default Navbar;
