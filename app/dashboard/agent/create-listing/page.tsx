"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  createListingApplication,
  getMyListingApplications,
  deleteListingApplication,
} from "@/lib/listingApplication";
import { Skeleton } from "@/components/ui/Skeleton";
import Modal from "@/components/ui/Modal";
import ListingForm from "@/components/listing-application/ListingForm";
import Image from "next/image";
import { cloudName } from "@/utils";
import { CheckCircle } from "lucide-react";

const PAGE_SIZE = 6;

export default function CreateListingPage() {
  const router = useRouter();

  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [activeListingId, setActiveListingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await getMyListingApplications();
        setListings(res.listings || []);
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  /* ---------------- FILTERING ---------------- */

  const filteredListings = useMemo(() => {
    return listings
      .filter((l) => l.title?.toLowerCase().includes(search.toLowerCase()))
      .filter((l) =>
        statusFilter === "all" ? true : l.status === statusFilter,
      );
  }, [listings, search, statusFilter]);

  const totalPages = Math.ceil(filteredListings.length / PAGE_SIZE);

  const paginatedListings = filteredListings.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  /* ---------------- HANDLERS ---------------- */

  const handleCreate = async () => {
    try {
      setCreating(true);
      const res = await createListingApplication();
      setActiveListingId(res.newListingApplication._id);
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setDeleting(true)
      await deleteListingApplication(id);
      setListings((prev) => prev.filter((l) => l._id !== id));
      toast.success("Draft deleted");
    } finally{
      setDeleting(false)
    }
  };

  const handleOpen = (id: string) => {
    setActiveListingId(id);
  };

  /* ---------------- PROGRESS CALC ---------------- */

  const calculateProgress = (listing: any) => {
    let completed = 0;
    const total = 6;

    if (listing.title && listing.description) completed++;
    if (listing.price && listing.type && listing.listingType) completed++;
    if (listing.bedrooms !== undefined) completed++;
    if (listing.location?.address) completed++;
    if (listing.images?.length > 0) completed++;

    return Math.round((completed / total) * 100);
  };

  if (loading) {
    return (
      <div className="p-8 space-y-4">
        <Skeleton className="h-20 rounded-xl" />
        <Skeleton className="h-20 rounded-xl" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-8">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Your Listings</h1>
        <button
          onClick={handleCreate}
          disabled={creating}
          className="bg-black text-white px-6 py-3 rounded-xl"
        >
          {creating ? "Creating..." : "Create New Listing"}
        </button>
      </div>

      {/* SEARCH + FILTER */}
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Search listings..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border border-gray-300 p-2 rounded-xl"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-300 p-2 rounded-xl"
        >
          <option value="all">All Status</option>
          <option value="draft">Draft</option>
          <option value="pending">Pending Review</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* LIST */}
      {paginatedListings.length === 0 ? (
        <div className="bg-white p-10 rounded-2xl shadow text-center">
          No listings found.
        </div>
      ) : (
        <div className="grid gap-6">
          {paginatedListings.map((listing) => {
            const firstImage = listing.images?.[0]?.public_id;
            const progress = calculateProgress(listing);

            return (
              <div
                key={listing._id}
                className="bg-white rounded-2xl shadow p-6 flex gap-6"
              >
                {/* THUMBNAIL */}
                <div className="w-40 h-28 bg-gray-100 rounded-xl overflow-hidden">
                  {firstImage ? (
                    <Image
                      src={`https://res.cloudinary.com/${cloudName}/image/upload/${firstImage}`}
                      className="w-full h-full object-cover"
                      width={500}
                      height={300}
                      alt="listing"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-xs text-gray-400">
                      No Image
                    </div>
                  )}
                </div>

                {/* INFO */}
                <div className="flex-1">
                  <h2 className="font-semibold text-lg">
                    {listing.title || "Untitled Listing"}
                  </h2>

                  {/* PRICE + LOCATION */}
                  <p className="text-sm text-gray-600">
                    {listing.currency || "$"} {listing.price || 0}
                  </p>
                  <p className="text-sm text-gray-500">
                    {listing.location?.city}, {listing.location?.country}
                  </p>

                  {/* PROGRESS (Draft Only) */}
                  {listing.status === "draft" && (
                    <div className="mt-3">
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-2 bg-black rounded-full"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {progress}% complete
                      </p>
                    </div>
                  )}
                </div>

                {/* ACTIONS */}
                <div className="flex flex-col justify-between items-end">
                  <span className="text-xs px-3 py-1 bg-gray-100 rounded-full">
                    {listing.status.replace("_", " ")}
                  </span>

                  <div className="flex gap-2 mt-4">
                    {listing.status === "approved" && (
                      <button
                        // onClick={() => router.push(`/listings/${listing.slug}`)}
                        className="p-2 rounded-full text-sm text-green-600"
                      >
                        <CheckCircle />
                      </button>
                    )}

                    {listing.status !== "approved" && (
                      <button
                        onClick={() => handleOpen(listing._id)}
                        className="px-4 py-2 text-sm bg-black text-white rounded-xl"
                      >
                        {listing.status === "draft" ? "Continue" : "View"}
                      </button>
                    )}

                    {listing.status === "draft" && (
                      <button
                        onClick={() => handleDelete(listing._id)}
                        className="px-3 py-2 text-sm text-red-600"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-3 mt-6">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1 border rounded"
          >
            Prev
          </button>

          <span className="px-3 py-1">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 border rounded"
          >
            Next
          </button>
        </div>
      )}

      <Modal open={!!activeListingId} onClose={() => setActiveListingId(null)}>
        {activeListingId && <ListingForm listingId={activeListingId} />}
      </Modal>
    </div>
  );
}
