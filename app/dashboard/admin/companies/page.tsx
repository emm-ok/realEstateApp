"use client";

import { Kpi, NavItem, TabRenderer } from "@/components/dashboard/DashComponents";
import { CompanyTabRenderer } from "@/components/dashboard/TabRenderer";
import Loader from "@/components/ui/Loader";
import { navItems } from "@/config/dashboardNavItems";
import { getCompanyApplications } from "@/lib/admin";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface CompanyApplication {
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
export default function CompaniesDashboard() {
  const [activeTab, setActiveTab] = useState("applications");
  const [applications, setApplications] = useState<CompanyApplication[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeTab === "applications") {
      fetchApplications();
    }
  }, [activeTab]);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const data = await getCompanyApplications();
      setApplications(data);
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to fetch applications",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Companies</h1>
        <p className="text-slate-400">
          Manage business accounts and operations
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-4">
        <Kpi
          title="Total Companies"
          value={applications.filter((c) => c.status === "approved").length}
        />
        <Kpi title="Total Applications" value={applications.length} />
        <Kpi
          title="Pending"
          value={applications.filter((c) => c.status === "submitted").length}
        />
        <Kpi
          title="Verified"
          value={applications.filter((c) => c.status === "approved").length}
        />
        <Kpi
          title="Rejected"
          value={applications.filter((c) => c.status === "rejected").length}
        />
        <Kpi
          title="Suspended"
          value={applications.filter((c) => c.status === "suspended").length}
        />
        <Kpi title="Monthly Volume" value="$18.4M" />
      </div>
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Companies</h1>
        <p className="text-slate-400">
          Manage company onboarding and operations
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {/* Sub Nav */}
        <aside className="flex gap-2">
          {navItems.company.map((item) => (
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
        <main className="min-h-[400px]">
            <CompanyTabRenderer tab={activeTab} applications={applications} />
        </main>
      </div>
    </div>
  );
}
