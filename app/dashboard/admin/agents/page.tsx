"use client";

import { useEffect, useState } from "react";
import Loader from "@/components/ui/Loader";
import { getAgentsApplications } from "@/lib/admin";
import { Kpi, NavItem, StatusBadge } from "@/components/dashboard/DashComponents";
import { navItems } from "@/config/dashboardNavItems";
import { AgentTabRenderer } from "@/components/dashboard/TabRenderer";

interface AgentApplication {
  _id: string;
  userId: {
    name: string;
    email: string;
  };
  company: {
    type: string;
  };
  status: "draft" | "submitted" | "approved" | "rejected" | "suspended";
  createdAt: string;
}

export default function AgentsDashboard() {
  const [activeTab, setActiveTab] = useState("applications");
  const [applications, setApplications] = useState<AgentApplication[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeTab === "applications") {
      fetchApplications();
    }
  }, [activeTab]);

  const fetchApplications = async () => {
    setLoading(true);
    const data = await getAgentsApplications();
    setApplications(data);
    console.log(data);
    setLoading(false);
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Agents</h1>
        <p className="text-slate-400">
          Manage applications, approvals and operations
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-4">
        <Kpi title="Total Applications" value={applications.length} />
        <Kpi title="Approved Agents" value={applications.filter(a => a.status === "approved").length} />
        <Kpi title="Total Submitted" value={applications.filter(a => a.status === "submitted").length} />
        <Kpi title="Pending" value={applications.filter(a => a.status === "submitted").length} />
        <Kpi title="Rejected" value={applications.filter(a => a.status === "rejected").length} />
        {/* <Kpi title="Suspended" value={applications.filter(a => a.status === "suspended").length} color="rose" /> */}
        <Kpi title="This Month Tx" value="₦4.2M" color="indigo" />
      </div>

      {/* Recent Applications
      <div className="border border-slate-300 shadow-md rounded-xl p-6">
        <div className="flex justify-between mb-4">
          <h2 className="font-medium">Recent Applications</h2>
          <button className="text-indigo-400 hover:underline text-sm">
            View all
          </button>
        </div>

        <table className="w-full text-left">
          <thead className="text-slate-400">
            <tr>
              <th className="text-left py-2">Name</th>
              <th>Email</th>
              <th>Country</th>
              <th>Status</th>
              <th>Submitted</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app._id} className="border-t border-gray-300">
                <td className="py-2">{app.userId.name}</td>
                <td>{app.userId.email}</td>
                <td>
                  <StatusBadge status={app.status} />
                </td>
                <td>{new Date(app.createdAt).toLocaleDateString()}</td>
                <td>
                  <button className="text-indigo-400 text-xs hover:underline">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}

      <div className="flex flex-col gap-8">
        {/* Sub Nav */}
        <aside className="flex gap-1  max-w-full space-y-1">
          {navItems.agent.map((item) => (
            <NavItem
              key={item.value}
              label={item.label}
              value={item.value}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          ))}
        </aside>

        {/* Content */}
        <main className="flex-1 min-h-[400px]">
            <AgentTabRenderer
              tab={activeTab}
              applications={applications}
            />
        </main>
      </div>
    </div>
  );
}




