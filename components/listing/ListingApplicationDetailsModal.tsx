"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  approveListing,
  rejectListing,
  getAllListingApplications,
} from "@/lib/listingApplication";

interface Props {
  applicationId: string | null;
  onClose: () => void;
  onActionComplete: () => void;
}

export default function ListingApplicationDetailsModal({
  applicationId,
  onClose,
  onActionComplete,
}: Props) {
  const [application, setApplication] = useState<any>(null);
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchApplication = async () => {
    if (!applicationId) return;

    try {
      setLoading(true);
      const all = await getAllListingApplications();
      const found = all.find((app: any) => app._id === applicationId);
      setApplication(found);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplication();
  }, [applicationId]);

  const handleApprove = async () => {
    if (!applicationId) return;
    const res = await approveListing(applicationId);
    toast.success(res.message);
    onActionComplete();
    fetchApplication();
  };

  const handleReject = async () => {
    if (!applicationId) return;

    if (!reason.trim()) {
      toast.error("Please provide rejection reason");
      return;
    }

    const res = await rejectListing(applicationId, reason);
    toast.success(res.message);
    onActionComplete();
    fetchApplication();
  };

  if (!applicationId) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white dark:bg-neutral-900 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl p-8 z-10">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500"
        >
          ✕
        </button>

        {loading ? (
          <div className="text-center py-10">Loading details...</div>
        ) : !application ? (
          <div className="text-center py-10">
            Application not found.
          </div>
        ) : (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold">
              Listing Application Details
            </h1>

            <div className="space-y-2">
              <h2 className="font-semibold">Agent Information</h2>
              <p>
                <strong>Name:</strong>{" "}
                {application.agentId?.userId?.name}
              </p>
              <p>
                <strong>Email:</strong>{" "}
                {application.agentId?.userId?.email}
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="font-semibold">Listing Information</h2>
              <p>
                <strong>Title:</strong>{" "}
                {application.title || "—"}
              </p>
              <p>
                <strong>Price:</strong>{" "}
                {application.price || "—"}
              </p>
              <p>
                <strong>Location:</strong>{" "}
                {application.location || "—"}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span className="capitalize">
                  {application.status}
                </span>
              </p>
            </div>

            {application.status === "pending" && (
              <div className="space-y-4">
                <div className="flex gap-4">
                  <button
                    onClick={handleApprove}
                    className="bg-emerald-600 text-white px-4 py-2 rounded-md"
                  >
                    Approve
                  </button>

                  <button
                    onClick={handleReject}
                    className="bg-rose-600 text-white px-4 py-2 rounded-md"
                  >
                    Reject
                  </button>
                </div>

                <textarea
                  placeholder="Rejection reason..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full border px-4 py-2 rounded-md"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}