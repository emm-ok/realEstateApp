"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

const FilterSection = ({ search, setSearch, minPrice, maxPrice, setMinPrice, setMaxPrice, setPropertyType, setBedRoom }) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="w-full">
      
      {/* Mobile Search Bar */}
      <div className="lg:hidden mb-4 flex gap-3">
        <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 w-full bg-white">
          <Search size={18} />
          <input
            placeholder="Search properties..."
            className="outline-none w-full text-sm"
          />
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="border border-gray-300 bg-white rounded-lg px-4 flex items-center gap-2 text-sm"
        >
          <SlidersHorizontal size={18} />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6
        ${showFilters ? "block" : "hidden lg:block"} lg:sticky lg:top-24`}
      >
        <h3 className="font-semibold text-lg text-gray-900">
          Filter Properties
        </h3>

        {/* Location */}
        <div className="space-y-2">
          <label className="text-sm text-gray-500">Location</label>
          <input onChange={(e) => setSearch(e.target.value)} value={search} className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-black outline-none" />
        </div>

        {/* Price */}
        <div className="space-y-2">
          <label className="text-sm text-gray-500">Price Range</label>
          <div className="flex gap-2">
            <input
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
              placeholder="Min"
              className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-black outline-none"
            />
            <input
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="Max"
              className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-black outline-none"
            />
          </div>
        </div>

        {/* Property Type */}
        <div className="space-y-2">
          <label className="text-sm text-gray-500">Property Type</label>
          <select onChange={(e) => setPropertyType(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-black outline-none">
            <option value="any">Any</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="land">Land</option>
          </select>
        </div>

        {/* Bedrooms */}
        <div className="space-y-2">
          <label className="text-sm text-gray-500">Bedrooms</label>
          <select onChange={(e) => setBedRoom(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-black outline-none">
            <option value="any">Any</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
          </select>
        </div>

        <button type="submit" className="w-full bg-black text-white py-3 rounded-lg text-sm font-medium hover:bg-gray-800 transition">
          Apply Filters
        </button>
      </aside>
    </div>
  );
};

export default FilterSection;