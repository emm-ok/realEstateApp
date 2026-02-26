"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  MapPin,
  Bed,
  Bath,
  Ruler,
  Heart,
  Phone,
  Mail,
} from "lucide-react";


import house1 from "@/public/images/elite-prop-hmlP-v0vJ5o-unsplash.jpg";
import house2 from "@/public/images/frames-for-your-heart-2d4lAQAlbDA-unsplash.jpg";
import house3 from "@/public/images/francesca-tosolini-tHkJAMcO3QE-unsplash.jpg";
import { useParams } from "next/navigation";
import { getListingById } from "@/lib/listing";



const images = [house1, house2, house3];

export default function ListingDetails() {
  const [activeImage, setActiveImage] = useState(0);
  const [listing, setListing] = useState([]);
  const {listingId} = useParams();

  const getListingDetails = async(listingId) => {
    const res = await getListingById(listingId);
    console.log(res)
    setListing(res);
  }

  useEffect(() => {
    getListingDetails(listingId)
  }, [listingId]);

  return (
    <main className="bg-gray-50 min-h-screen">

      {/* IMAGE GALLERY */}
      <section className="relative h-[60vh] bg-black">
        <Image
          src={listing?.images[0]}
          alt="Property"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute bottom-4 left-4 flex gap-2">
          {listing?.images.map((img, i) => (
            <Image
              key={i}
              src={img[i]}
              alt=""
              width={80}
              height={80}
              onClick={() => setActiveImage(i)}
              className={`cursor-pointer object-cover rounded 
              ${i === activeImage ? "ring-2 ring-white" : ""}`}
            />
          ))}
        </div>

        <button className="absolute top-4 right-4 bg-white p-2 rounded-full">
          <Heart />
        </button>
      </section>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 px-4 py-6">

        {/* LEFT CONTENT */}
        <div className="lg:col-span-8 space-y-6">

          {/* SUMMARY */}
          <div className="bg-white rounded-xl shadow p-6 space-y-3">
            <h1 className="text-2xl font-semibold">
              Luxury 3-Bedroom Apartment
            </h1>

            <p className="text-gray-500 flex items-center gap-1">
              <MapPin size={16} />
              Lekki Phase 1, Lagos
            </p>

            <p className="text-2xl font-bold">$250,000</p>

            <div className="flex gap-6 text-gray-600">
              <div className="flex items-center gap-1">
                <Bed size={16} /> 3 Beds
              </div>
              <div className="flex items-center gap-1">
                <Bath size={16} /> 2 Baths
              </div>
              <div className="flex items-center gap-1">
                <Ruler size={16} /> 1200 sqft
              </div>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="bg-white rounded-xl shadow p-6 space-y-2">
            <h2 className="font-semibold text-lg">Description</h2>
            <p className="text-gray-600 leading-relaxed">
              This luxury apartment offers modern living with high-end
              finishes, spacious rooms, natural lighting, and a beautiful
              city view. Perfect for families and investors.
            </p>
          </div>

          {/* AMENITIES */}
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
          </div>

          {/* MAP */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="font-semibold text-lg mb-3">Location</h2>
            <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
              Map integration here
            </div>
          </div>
        </div>

        {/* RIGHT ACTION PANEL */}
        <aside className="lg:col-span-4 space-y-4">

          {/* AGENT CARD */}
          <div className="bg-white rounded-xl shadow p-6 text-center space-y-2">
            <Image
              src={house1}
              alt="Agent"
              width={80}
              height={80}
              className="rounded-full w-14 h-14 object-cover mx-auto"
            />
            <p className="font-semibold">John Doe</p>
            <p className="text-sm text-gray-500">
              Verified Agent
            </p>
          </div>

          {/* CTA */}
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
