"use client";

import { useEffect, useState } from "react";
import { getAllApprovedListings } from "@/lib/listing";
import { toast } from "sonner";
import FilterSection from "@/components/listing/FilterSection";
import ListingCard from "./ListingCard";
import Loader from "../ui/Loader";

export default function Listings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [propertyType, setPropertyType] = useState("any");
  const [bedRoom, setBedRoom] = useState(null);

  const getAllListings = async () => {
    try {
      const res = await getAllApprovedListings();
      setListings(res.listings || []);
    } catch (error: any) {
      toast(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllListings();
  }, []);

  if (loading) return <Loader text="Loading listings..." />;

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10">
        
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900">
            Explore Listings
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Find your perfect home from our verified listings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar */}
          <div className="lg:col-span-3">
            <FilterSection 
              search={search}
              setSearch={setSearch}
              minPrice={minPrice}
              maxPrice={maxPrice}
              setMinPrice={setMinPrice}
              setMaxPrice={setMaxPrice}
              setPropertyType={setPropertyType}
              setBedRoom={setBedRoom} 
            />
          </div>

          {/* Properties Grid */}
          <section className="lg:col-span-9">
            {properties.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-10 text-center">
                <p className="text-gray-500">
                  No listings available at the moment.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {listings.map((listing) => (
                  <ListingCard key={listing._id} listing={listing} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {properties.length > 0 && (
              <div className="flex justify-center mt-10">
                <button className="px-6 py-3 rounded-lg border border-gray-300 bg-white hover:bg-gray-100 transition text-sm font-medium">
                  Load More
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}