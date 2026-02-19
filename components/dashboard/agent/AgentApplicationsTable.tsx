"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  approveAgentApplication,
  getAgentsApplications,
  rejectAgentApplication,
} from "@/lib/admin";

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
    setLoading(true);
    const data = await getAgentsApplications();
    setApplications(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleApprove = async (id: string) => {
    try {
      const res = await approveAgentApplication(id);
      console.log(res);
      toast.success("Application approved");
      fetchApplications();
    } catch (err) {
      toast.error("Failed to approve");
    }
  };

  const handleReject = async (id: string, reason: string) => {
    try {
      const res = await rejectAgentApplication(id, reason);
      console.log(res);
      toast.success("Application rejected");
      fetchApplications();
    } catch (err) {
      toast.error("Failed to reject");
    }
  };

  const filteredApplications = applications.filter((app) =>
    activeTab === "all" ? true : app.status === activeTab,
  );

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Agent Applications</h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {["all", "draft", "submitted", "approved", "rejected"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as typeof activeTab)}
            className={`px-4 py-2 rounded-lg font-medium ${
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

      {loading ? (
        <div className="text-center py-20">Loading applications...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200 dark:bg-neutral-800">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Applied At</th>
                <th className="px-4 py-2">Actions</th>
                <th className="px-4 py-2">Reason</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.map((app) => (
                <tr
                  key={app._id}
                  className="border-b border-gray-200 dark:border-neutral-700"
                >
                  <td className="px-4 py-2">{app.userId.name}</td>
                  <td className="px-4 py-2">{app.userId.email}</td>
                  <td className="px-4 py-2 capitalize">{app.status}</td>
                  <td className="px-4 py-2">
                    {new Date(app.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    {app.status === "submitted" ? (
                      <>
                        <button
                          onClick={() => handleApprove(app._id)}
                          className="bg-green-700 text-white px-3 py-1 rounded-md"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(app._id, reasons[app._id])}
                          className="bg-red-700 text-white px-3 py-1 rounded-md"
                        >
                          Reject
                        </button>
                      </>
                    ) : app.status === "approved" ? (
                      <h2>Approved</h2>
                    ) : app.status === "rejected" && (
                      <h2>Rejected</h2>
                    )}
                  </td>
                  <td>
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
                      className="rounded-full px-4 py-1 border border-gray-300"
                    />
                    )}
                  </td>
                </tr>
              ))}
              {filteredApplications.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-6 text-center text-gray-500"
                  >
                    No applications found.
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
