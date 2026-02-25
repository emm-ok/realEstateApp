"use client";

import { useEffect, useMemo, useState } from "react";
import { getAllApprovedListings } from "@/lib/listing";
import { toast } from "sonner";
import FilterSection from "@/components/listing/FilterSection";
import ListingCard from "./ListingCard";
import Loader from "../ui/Loader";

export default function Listings() {
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [propertyType, setPropertyType] = useState("any");
  const [bedRoom, setBedRoom] = useState<number | null>(null);

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

  // ✅ Optimized Filtering
  const filteredListings = useMemo(() => {
    return listings.filter((listing) => {
      const matchesSearch =
        listing.title?.toLowerCase().includes(search.toLowerCase()) ||
        listing.location?.city?.toLowerCase().includes(search.toLowerCase()) ||
        listing.location?.address?.toLowerCase().includes(search.toLowerCase());

      const matchesMinPrice =
        minPrice === null || listing.price >= minPrice;

      const matchesMaxPrice =
        maxPrice === null || listing.price <= maxPrice;

      const matchesType =
        propertyType === "any" ||
        listing.propertyType?.toLowerCase() === propertyType.toLowerCase();

      const matchesBedroom =
        bedRoom === null || listing.bedrooms >= bedRoom;

      return (
        matchesSearch &&
        matchesMinPrice &&
        matchesMaxPrice &&
        matchesType &&
        matchesBedroom
      );
    });
  }, [listings, search, minPrice, maxPrice, propertyType, bedRoom]);

  if (loading) return <Loader text="Loading listings..." />;

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900">
            Explore Listings
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Find your perfect home from our verified listings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
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

          <section className="lg:col-span-9">
            {filteredListings.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-10 text-center">
                <p className="text-gray-500">
                  No listings match your filters.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredListings.map((listing) => (
                  <ListingCard key={listing._id} listing={listing} />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}