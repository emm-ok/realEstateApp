"use client";

import { useEffect, useState } from "react";
import { getMyBookmarks } from "@/lib/bookmark";
import ListingCard from "@/components/listing/ListingCard";
import Link from "next/link";
import { TriangleAlert } from "lucide-react";
import Loader from "@/components/ui/Loader";

const BookmarksPage = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMyBookmarks();
        console.log(data);
        setBookmarks(data.bookmarks);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if(loading) return <Loader text="Loading bookmarks..." />

  return (
    <div className="flex items-center">
      {bookmarks.length === 0 ? (
        <div className="flex flex-col gap-4 justify-center items-center">
          <TriangleAlert />
          <h2 className="text-2xl font-medium">No Bookmarks available!</h2>
          <p>Save your favorite listings</p>
          <Link
            href="/buy/properties"
            className="px-6 py-2 bg-neutral-800 text-white rounded-xl"
          >
            View listings now
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          {bookmarks.map((bookmark) => (
            <ListingCard key={bookmark._id} listing={bookmark.listing} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookmarksPage;
