"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  approveAgentApplication,
  getAgentApplications,
  rejectAgentApplication,
} from "@/lib/admin";
import Link from "next/link";

interface AgentApplication {
  _id: string;
  userId: {
    name: string;
    email: string;
  };
  status: "draft" | "submitted" | "approved" | "rejected";
  createdAt: string;
}

export default function AgentApplicationsPage() {
  const [activeTab, setActiveTab] = useState<
    "all" | "draft" | "submitted" | "approved" | "rejected"
  >("all");

  const [applications, setApplications] = useState<AgentApplication[]>([]);
  const [reasons, setReasons] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const data = await getAgentApplications();
      setApplications(data);
    } catch {
      toast.error("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleApprove = async (id: string) => {
    try {
      await approveAgentApplication(id);
      toast.success("Application approved");
      fetchApplications();
    } catch {
      toast.error("Failed to approve application");
    }
  };

  const handleReject = async (id: string) => {
    const reason = reasons[id];

    if (!reason?.trim()) {
      toast.error("Please provide a rejection reason");
      return;
    }

    try {
      await rejectAgentApplication(id, reason);
      toast.success("Application rejected");
      fetchApplications();
    } catch {
      toast.error("Failed to reject application");
    }
  };

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
        {["all", "draft", "submitted", "approved", "rejected"].map((tab) => (
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
              : tab === "draft"
                ? "Drafts"
                : tab === "submitted"
                  ? "Submitted"
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
                    <Link href={`/dashboard/admin/agents/agent-applications/${app._id}`} className="bg-neutral-800 text-white px-3 py-1 rounded-md">
                      View Details
                    </Link>
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
    </div>
  );
}

{
  /* <td className="px-4 py-2">
  {app.status === "submitted" && (
    <input
      type="text"
      value={reasons[app._id] || ""}
      onChange={(e) =>
        setReasons((prev) => ({
          ...prev,
          [app._id]: e.target.value,
        }))
      }
      placeholder="Reason..."
      className="rounded-full px-4 py-1 border border-gray-300 dark:bg-neutral-800"
    />
  )}
</td>; */
}

{/* <td className="px-4 py-2 flex gap-2">
  {app.status === "submitted" ? (
    <>
      <button
        onClick={() => handleApprove(app._id)}
        className="bg-emerald-600 text-white px-3 py-1 rounded-md hover:opacity-90 transition"
      >
        Approve
      </button>

      <button
        onClick={() => handleReject(app._id)}
        className="bg-rose-600 text-white px-3 py-1 rounded-md hover:opacity-90 transition"
      >
        Reject
      </button>
    </>
  ) : app.status === "draft" ? (
    <span className="text-gray-500">Draft</span>
  ) : null}
</td>; */}
