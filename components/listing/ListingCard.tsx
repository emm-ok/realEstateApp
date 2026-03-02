import { useBookmarks } from "@/context/BookmarkContext";
import { cloudName } from "@/utils";
import { Bookmark, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ListingCard = ({ listing }) => {
  const { toggleBookmark, isBookmarked, loading } = useBookmarks();
  const imageUrl = `https://res.cloudinary.com/${cloudName}/image/upload/w_600/${listing.images?.[0]?.public_id}`;

  const bookmarked = isBookmarked(listing._id);
  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition duration-300 overflow-hidden border border-gray-100">
      {/* Image Section */}
      <div className="relative h-1/2 ">
        <Image
          src={imageUrl}
          alt={listing.title}
          width={600}
          height={600}
          className="w-full max-h-1/3 object-cover group-hover:scale-105 transition duration-500"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

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

        {/* Bookmark Count */}
        <div className="absolute bottom-3 right-3 bg-black text-white text-xs px-2 py-1 rounded-full">
          {listing.bookmarkCount || 0} saved
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        <h3 className="font-semibold text-md text-gray-900 line-clamp-1">
          {listing.title}
        </h3>

        <p className="text-gray-500 flex items-center gap-2">
          <MapPin size={16} />
          {listing.location?.address}, {listing.location?.city}
        </p>

        <div className="flex gap-2 items-center text-gray-600">
          <span>{listing.bedrooms} Beds</span>
          <span>{listing.bathrooms} Baths</span>
        </div>

        <div className="flex justify-between items-center">
          <p className="font-semibold text-md text-gray-900">
            ${listing.price?.toLocaleString()}
          </p>
          <p className="text-gray-600">Agent: {listing.agentId.userId.name}</p>
        </div>

        <div className="flex gap-3 pt-3">
          <Link
            href={`/buy/properties/${listing._id}`}
            className="flex flex-1 items-center justify-center border border-gray-300 rounded-lg py-2 font-medium hover:bg-gray-100 transition"
          >
            View Details
          </Link>
          <button className="flex flex-1 items-center justify-center gap-2 bg-black text-white rounded-lg py-2 font-medium hover:bg-gray-800 transition">
            <Phone size={16} /> Agent
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
