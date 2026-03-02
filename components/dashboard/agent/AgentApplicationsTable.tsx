"use client";

import { useEffect, useState } from "react";
import {
  getAgentApplications,
} from "@/lib/admin";
import AgentApplicationDetailsModal from "./AgentApplicationDetailsModal";

interface AgentApplication {
  _id: string;
  userId: {
    name: string;
    email: string;
  };
  status:  "pending" | "approved" | "rejected";
  createdAt: string;
}

export default function AgentApplicationsPage() {
  const [activeTab, setActiveTab] = useState<
    "all" | "pending" | "approved" | "rejected"
  >("all");

  const [applications, setApplications] = useState<AgentApplication[]>([]);
  const [reasons, setReasons] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const data = await getAgentApplications();
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
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Agent Applications</h1>
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
                : "bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-300"
            }`}
          >
            {tab === "all"
              ? "All"
                : tab === "submitted" || tab === "pending"
                  ? "Pending"
                  : tab === "approved"
                    ? "Approved"
                    : "Rejected"}
          </button>
        ))}
      </div>

      {/* Table */}
      {loading ? (
        <div className="text-center py-20">Loading agent applications...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200 dark:bg-neutral-800">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Applied At</th>
                <th className="px-4 py-2">View</th>
              </tr>
            </thead>

            <tbody>
              {filteredApplications.map((app) => (
                <tr
                  key={app._id}
                  className="border-b border-gray-200 dark:border-neutral-700"
                >
                  <td className="px-4 py-2">{app.userId?.name || "—"}</td>
                  <td className="px-4 py-2">{app.userId?.email || "—"}</td>
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
                  <td>
                    <button
                      onClick={() => setSelectedId(app._id)}
                      className="text-blue-600 hover:underline"
                    >View Details</button>
                  </td>
                </tr>
              ))}

              {filteredApplications.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-6 text-center text-gray-500"
                  >
                    No agent applications found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      <AgentApplicationDetailsModal
        applicationId={selectedId}
        onClose={() => setSelectedId(null)}
        onActionComplete={fetchApplications}
       />
    </div>
  );
}
