"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  approveCompanyApplication,
  getCompanyApplications,
  rejectCompanyApplication,
} from "@/lib/admin";
import Link from "next/link";

interface CompanyApplication {
  _id: string;
  company: {
    name: string;
    email: string;
  };
  status: "draft" | "submitted" | "approved" | "rejected";
  createdAt: string;
}

export default function CompanyApplicationsPage() {
  const [activeTab, setActiveTab] = useState<
    "all" | "draft" | "submitted" | "approved" | "rejected"
  >("all");

  const [applications, setApplications] = useState<CompanyApplication[]>([]);
  const [reasons, setReasons] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const fetchApplications = async () => {
    setLoading(true);
    const data = await getCompanyApplications();
    setApplications(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleApprove = async (id: string) => {
    try {
      await approveCompanyApplication(id);
      toast.success("Company approved");
      fetchApplications();
    } catch {
      toast.error("Failed to approve");
    }
  };

  const handleReject = async (id: string, reason: string) => {
    try {
      await rejectCompanyApplication(id, reason);
      toast.success("Company rejected");
      fetchApplications();
    } catch {
      toast.error("Failed to reject");
    }
  };

  const filteredApplications = applications.filter((app) =>
    activeTab === "all" ? true : app.status === activeTab,
  );

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Company Applications</h1>
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
                : "bg-gray-100 text-gray-700"
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
        <div className="text-center py-20">Loading company applications...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">Company</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Applied At</th>
                <th className="px-4 py-2">View</th>
              </tr>
            </thead>

            <tbody>
              {filteredApplications.map((app) => (
                <tr key={app._id} className="border-b border-gray-200">
                  <td className="px-4 py-2">{app.company?.name || "—"}</td>

                  <td className="px-4 py-2">{app.company?.email || "—"}</td>

                  <td className="px-4 py-2 flex gap-2">
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
                    <Link href={`/dashboard/admin/companies/company-applications/${app._id}`} className="bg-neutral-800 text-white px-3 py-1 rounded-md">
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
                    No company applications found.
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



{/* <td className="px-4 py-2">
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
      className="rounded-full px-4 py-1 border border-gray-300"
    />
  )}
</td>; */}

// <>
//   <
//     onClick={() => handleApprove(app._id)}
//     className="bg-emerald-600 text-white px-3 py-1 rounded-md"
//   >
//     Approve

//   <button
//     onClick={() =>
//       handleReject(
//         app._id,
//         reasons[app._id],
//       )
//     }
//     className="bg-rose-600 text-white px-3 py-1 rounded-md"
//   >
//     Reject
//   </button>
// </>
