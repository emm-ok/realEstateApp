"use client";

import StatCard from "@/components/dashboard/StatCard";
import {
  Building2,
  Users,
  Briefcase,
  CheckCircle,
  DollarSign,
  Calendar,
  UserPlus,
  TrendingUp,
} from "lucide-react";

export default function AgentDashboardPage() {
  // 🔁 Replace with API data later
  const stats = {
    activeListings: 14,
    activeClients: 22,
    pendingDeals: 5,
    closedDeals: 8,
    monthlyRevenue: "$48,500",
    scheduledTours: 6,
    newLeads: 11,
    conversionRate: "32%",
  };

  const primaryStats = [
    {
      title: "Active Listings",
      value: stats.activeListings,
      icon: <Building2 size={22} />,
      href: "/dashboard/agent/listings",
    },
    {
      title: "Active Clients",
      value: stats.activeClients,
      icon: <Users size={22} />,
      href: "/dashboard/agent/clients",
    },
    {
      title: "Pending Deals",
      value: stats.pendingDeals,
      icon: <Briefcase size={22} />,
      href: "/dashboard/agent/deals?status=pending",
    },
    {
      title: "Closed Deals (This Month)",
      value: stats.closedDeals,
      icon: <CheckCircle size={22} />,
      href: "/dashboard/agent/deals?status=closed",
    },
  ];

  const performanceStats = [
    {
      title: "Revenue (This Month)",
      value: stats.monthlyRevenue,
      icon: <DollarSign size={22} />,
      href: "/dashboard/agent/reports",
    },
    {
      title: "Scheduled Tours",
      value: stats.scheduledTours,
      icon: <Calendar size={22} />,
      href: "/dashboard/agent/tours",
    },
    {
      title: "New Leads",
      value: stats.newLeads,
      icon: <UserPlus size={22} />,
      href: "/dashboard/agent/leads",
    },
    {
      title: "Conversion Rate",
      value: stats.conversionRate,
      icon: <TrendingUp size={22} />,
      href: "/dashboard/agent/reports",
    },
  ];

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-2xl font-bold">Agent Dashboard</h1>

      {/* ✅ Primary Stats */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Overview</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {primaryStats.map((item) => (
            <StatCard key={item.title} {...item} />
          ))}
        </div>
      </div>

      {/* ✅ Performance Stats */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Performance</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {performanceStats.map((item) => (
            <StatCard key={item.title} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}