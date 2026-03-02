"use client";

import { useEffect, useState } from "react";
import { getAllApprovedListings } from "@/lib/listing";
import ListingCard from "./ListingCard";

export const Listings = () => {
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const getAllListings = async () => {
    try {
      const res = await getAllApprovedListings();
      setListings(res.listings || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllListings();
  }, []);

  return (
    <div>
      <section className="lg:col-span-9">
        {listings.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-10 text-center">
            <p className="text-gray-500">No listings match your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {listings.slice(0, 4).map((listing) => (
              <div key={listing._id}>
                <ListingCard listing={listing} />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Listings;
