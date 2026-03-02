"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getMyBookmarks, createBookmark, deleteBookmark } from "@/lib/bookmark";
import { toast } from "sonner";

interface BookmarkContextType {
  bookmarks: string[];
  toggleBookmark: (listingId: string) => Promise<void>;
  isBookmarked: (listingId: string) => boolean;
  loading: boolean
}

const BookmarkContext = createContext<BookmarkContextType | null>(null);

export const BookmarkProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);

  const fetchBookmarks = async () => {
    setLoading(true);
    try {
      const data = await getMyBookmarks(page, limit);
      if (data?.bookmarks) {
        const ids = data.bookmarks.map((b) => b.listing._id);
        setBookmarks(ids);
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {

    fetchBookmarks();
  }, []);

  const isBookmarked = (listingId: string) => {
    return bookmarks.includes(listingId);
  };

  const toggleBookmark = async (listingId: string) => {
    setLoading(true)
    try {
      if (isBookmarked(listingId)) {
        const data = await deleteBookmark(listingId);
        setBookmarks((prev) => prev.filter((id) => id !== listingId));
        fetchBookmarks()
        toast.success(data.message);
      } else {
        const data = await createBookmark(listingId);
        setBookmarks((prev) => [...prev, listingId]);
        fetchBookmarks()
        toast.success(data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <BookmarkContext.Provider
      value={{ bookmarks, toggleBookmark, isBookmarked, loading }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error("useBookmarks must be used inside BookmarkProvider");
  }
  return context;
};
