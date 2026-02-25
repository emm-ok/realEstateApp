import { cloudName } from "@/utils";
import { Bookmark, MapPin } from "lucide-react";
import Image from "next/image";

const ListingCard = ({ listing }) => {
  const imageUrl = `https://res.cloudinary.com/${cloudName}/image/upload/w_600/${listing.images?.[0]?.public_id}`;

  return (
    <div className="flex flex-col justify-between group bg-white rounded-2xl shadow-sm hover:shadow-xl transition duration-300 overflow-hidden border border-gray-100">
      
      {/* Image Section */}
      <div className="relative h-1/2 overflow-hidden">
        <Image
          src={imageUrl}
          alt={listing.title}
          width={600}
          height={600}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        <button className="absolute top-3 right-3 bg-white/80 backdrop-blur p-2 rounded-full hover:bg-white transition">
          <Bookmark size={18} className="text-gray-700" />
        </button>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">
          {listing.title}
        </h3>

        <p className="text-gray-500 flex items-center">
          <MapPin size={16} />
          {listing.location?.address}, {listing.location?.city}
        </p>

        <div className="flex gap-4 items-center text-gray-600">
          <span>{listing.bedrooms} Beds</span>
          <span>{listing.bathrooms} Baths</span>
        </div>

        <p className="font-semibold text-lg text-gray-900">
          ${listing.price?.toLocaleString()}
        </p>

        <div className="flex gap-3 pt-3">
          <button className="flex-1 border border-gray-300 rounded-lg py-2 font-medium hover:bg-gray-100 transition">
            View Details
          </button>
          <button className="flex-1 bg-black text-white rounded-lg py-2 font-medium hover:bg-gray-800 transition">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;