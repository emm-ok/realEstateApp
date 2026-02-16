"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, Heart, MapPin } from "lucide-react";
import Image from "next/image";

import house1 from "@/public/images/elite-prop-hmlP-v0vJ5o-unsplash.jpg";
import house2 from "@/public/images/frames-for-your-heart-2d4lAQAlbDA-unsplash.jpg";
import house3 from "@/public/images/francesca-tosolini-tHkJAMcO3QE-unsplash.jpg";


const properties = [
  {
    id: 1,
    title: "Luxury Apartment",
    location: "Lekki Phase 1, Lagos",
    price: "$250,000",
    beds: 3,
    baths: 2,
    image: house1,
  },
  {
    id: 2,
    title: "Modern Duplex",
    location: "Ikoyi, Lagos",
    price: "$420,000",
    beds: 4,
    baths: 3,
    image: house2,
  },
  {
    id: 3,
    title: "Family Bungalow",
    location: "Ajah, Lagos",
    price: "$180,000",
    beds: 2,
    baths: 2,
    image: house3,
  },
];

export default function BrowseProperties() {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <main className="min-h-screen bg-gray-50">

      {/* TOP SEARCH BAR */}
      <header className="sticky top-0 z-20 bg-white px-4 py-3">
        <div className="max-w-7xl mx-auto flex gap-3 items-center">
          <div className="flex items-center gap-2 border border-gray-300 shadow rounded-lg px-3 py-2 w-full">
            <Search size={18} />
            <input
              placeholder="Search by city, area, or property..."
              className="outline-none w-full"
            />
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 border border-gray-300 shadow px-4 py-2 rounded-lg"
          >
            <SlidersHorizontal size={18} />
            Filters
          </button>
        </div>
      </header>

      {/* MAIN LAYOUT */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 px-4 py-6">

        {/* FILTER SIDEBAR */}
        <aside
          className={`lg:col-span-3 bg-white rounded-xl shadow p-4 space-y-4
          ${showFilters ? "block" : "hidden lg:block"}`}
        >
          <h3 className="font-semibold text-lg">Filter Properties</h3>

          <div>
            <p className="text-sm text-gray-500">Location</p>
            <input className="border border-gray-300 rounded-lg rounded w-full p-2" />
          </div>

          <div>
            <p className="text-sm text-gray-500">Price Range</p>
            <div className="flex gap-2">
              <input className="border border-gray-300 rounded-lg w-full p-2" placeholder="Min" />
              <input className="border border-gray-300 rounded-lg w-full p-2" placeholder="Max" />
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500">Property Type</p>
            <select className="border border-gray-300 rounded-lg w-full p-2">
              <option>Any</option>
              <option>Apartment</option>
              <option>House</option>
              <option>Land</option>
            </select>
          </div>

          <div>
            <p className="text-sm text-gray-500">Bedrooms</p>
            <select className="border border-gray-300 rounded-lg w-full p-2">
              <option>Any</option>
              <option>1+</option>
              <option>2+</option>
              <option>3+</option>
            </select>
          </div>

          <button className="w-full bg-black text-white py-2 rounded-lg">
            Apply Filters
          </button>
        </aside>

        {/* PROPERTIES GRID */}
        <section className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
            >
              <div className="relative h-48">
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  className="object-cover"
                />
                <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow">
                  <Heart size={16} />
                </button>
              </div>

              <div className="p-4 space-y-2">
                <h3 className="font-semibold">{property.title}</h3>

                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <MapPin size={14} />
                  {property.location}
                </p>

                <div className="text-sm text-gray-600">
                  {property.beds} Beds • {property.baths} Baths
                </div>

                <p className="font-bold text-lg">{property.price}</p>

                <div className="flex gap-2 pt-2">
                  <button className="flex-1 border rounded-lg py-2 text-sm">
                    View Details
                  </button>
                  <button className="flex-1 bg-black text-white rounded-lg py-2 text-sm">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>

      {/* PAGINATION */}
      <div className="py-8 flex justify-center">
        <button className="px-6 py-2 border rounded-lg">
          Load More
        </button>
      </div>
    </main>
  );
}


