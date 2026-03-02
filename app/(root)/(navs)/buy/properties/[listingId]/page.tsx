"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { MapPin, Bed, Bath, Ruler, Phone, Mail, Bookmark } from "lucide-react";
import { useParams } from "next/navigation";
import { getListingById } from "@/lib/listing";
import { cloudName } from "@/utils";
import Loader from "@/components/ui/Loader";
import { useBookmarks } from "@/context/BookmarkContext";

export default function ListingDetails() {
  const [activeImage, setActiveImage] = useState(0);
  const [listing, setListing] = useState<any>(null);
  const { listingId } = useParams();
  const { toggleBookmark, isBookmarked, loading } = useBookmarks();

  const getListingDetails = async (id: string) => {
    try {
      const res = await getListingById(id);
      setListing(res.listing);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!listingId) return;

    const id = Array.isArray(listingId) ? listingId[0] : listingId;

    getListingDetails(id);
  }, [listingId]);

  if (!listing) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader text="Loading..." />
      </div>
    );
  }

  const images = listing.images || [];
  const imageId = images[activeImage].public_id;

  const bookmarked = isBookmarked(listing._id);
  return (
    <main className="bg-gray-50 min-h-screen">
      {/* IMAGE GALLERY */}
      <section className="relative w-screen h-[60vh] bg-black">
        {images.length > 0 && (
          <Image
            src={`https://res.cloudinary.com/${cloudName}/image/upload/${imageId}`}
            alt="Property"
            fill
            sizes="100vw"
            priority
            className="w-full h-full object-cover"
          />
        )}

        {/* Thumbnails */}
        <div className="absolute bottom-4 left-4 flex gap-2">
          {images.map((img: string, i: number) => (
            <Image
              key={i}
              src={`https://res.cloudinary.com/${cloudName}/image/upload/${img.public_id}`}
              alt=""
              width={80}
              height={80}
              onClick={() => setActiveImage(i)}
              className={`cursor-pointer object-cover rounded 
              ${i === activeImage ? "ring-2 ring-white" : ""}`}
            />
          ))}
        </div>

        <button
          onClick={() => toggleBookmark(listing._id)}
          disabled={loading}
          className="absolute top-3 right-3 bg-white/80 backdrop-blur p-2 rounded-full hover:bg-white transition"
        >
          <Bookmark
            size={18}
            fill={bookmarked ? "black" : "none"}
            className={`transition ${bookmarked ? "text-black" : "text-gray-700"}`}
          />
        </button>
      </section>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 px-4 py-6">
        {/* LEFT */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-xl shadow p-6 space-y-3">
            <h1 className="text-2xl font-semibold">{listing.title}</h1>

            <p className="text-gray-500 flex items-center gap-1">
              <MapPin size={16} />
              {listing.location?.address}, {listing.location?.city}
            </p>

            <p className="text-2xl font-bold">
              ₦{listing.price?.toLocaleString()}
            </p>

            <div className="flex gap-6 text-gray-600">
              <div className="flex items-center gap-1">
                <Bed size={16} /> {listing.bedrooms} Beds
              </div>
              <div className="flex items-center gap-1">
                <Bath size={16} /> {listing.bathrooms} Baths
              </div>
              <div className="flex items-center gap-1">
                <Ruler size={16} /> {listing.areaSize} {listing.areaUnit}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6 space-y-2">
            <h2 className="font-semibold text-lg">Description</h2>
            <p className="text-gray-600 leading-relaxed">
              {listing.description}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="font-semibold text-lg mb-3">Amenities</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-gray-600">
              <p>✔ Parking</p>
              <p>✔ Swimming Pool</p>
              <p>✔ Gym</p>
              <p>✔ Security</p>
              <p>✔ Balcony</p>
              <p>✔ Power Backup</p>
            </div>

            {/* MAP */}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="font-semibold text-lg mb-3">Location</h2>
              <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                Map integration here
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <aside className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-xl shadow p-6 text-center space-y-2">
            <p className="font-semibold">{listing.agentId?.userId?.name}</p>
            <p className="text-sm text-gray-500">Verified Agent</p>
          </div>

          <div className="bg-white rounded-xl shadow p-6 space-y-3">
            <button className="w-full bg-black text-white py-3 rounded-lg">
              Schedule Inspection
            </button>

            <button className="w-full border border-gray-400 py-3 rounded-lg">
              Buy Property
            </button>

            <div className="flex gap-2">
              <button className="flex-1 border border-gray-400 py-2 rounded-lg flex items-center justify-center gap-1">
                <Phone size={16} /> Call
              </button>
              <button className="flex-1 border border-gray-400 py-2 rounded-lg flex items-center justify-center gap-1">
                <Mail size={16} /> Email
              </button>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
