"use client";

import {
  getAllListingApplications,
} from "@/lib/listingApplication";
import React, { useEffect, useState } from "react";
import ListingApplicationDetailsModal from "./ListingApplicationDetailsModal";
import Loader from "../ui/Loader";

const ListingApplicationsTable = () => {
  const [activeTab, setActiveTab] = useState<
    "all" | "pending" | "approved" | "rejected"
  >("all");

  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedListingId, setSelectedListingId] = useState<string | null>(null);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const data = await getAllListingApplications();
      setApplications(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const filteredApplications = applications.filter((app) =>
    activeTab === "all" ? true : app.status === activeTab,
  );

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mt-4 mb-4">
        <h1 className="text-2xl font-bold">Listing Applications</h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {["all", "pending", "approved", "rejected"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as typeof activeTab)}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              activeTab === tab
                ? "bg-primary text-white shadow"
                : "bg-gray-100"
            }`}
          >
            {tab === "all"
              ? "All"
              : tab === "pending"
              ? "Pending"
              : tab === "approved"
              ? "Approved"
              : "Rejected"}
          </button>
        ))}
      </div>

      {/* Table */}
      {loading ? (
        <div className="text-center py-20">
          <Loader /> Loading listing applications...
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">Agent Name</th>
                <th className="px-4 py-2">Agent Email</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Applied At</th>
                <th className="px-4 py-2">View</th>
              </tr>
            </thead>

            <tbody>
              {filteredApplications.map((app) => (
                <tr
                  key={app._id}
                  className=""
                >
                  <td className="px-4 py-2">
                    {app.agentId?.userId?.name || "—"}
                  </td>

                  <td className="px-4 py-2">
                    {app.agentId?.userId?.email || "—"}
                  </td>

                  <td className="px-4 py-2 capitalize">
                    {app.status === "approved" ? (
                      <span className="text-emerald-600 font-medium">
                        Approved
                      </span>
                    ) : app.status === "rejected" ? (
                      <span className="text-rose-600 font-medium">
                        Rejected
                      </span>
                    ) : (
                      app.status
                    )}
                  </td>

                  <td className="px-4 py-2">
                    {new Date(app.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-4 py-2">
                    <button
                      onClick={() => setSelectedListingId(app._id)}
                      className="bg-neutral-800 text-white px-3 py-1 rounded-md"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}

              {filteredApplications.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-6 text-center text-gray-500"
                  >
                    No listing applications found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      <ListingApplicationDetailsModal
        applicationId={selectedListingId}
        onClose={() => setSelectedListingId(null)}
        onActionComplete={fetchApplications}
      />
    </div>
  );
};

export default ListingApplicationsTable;