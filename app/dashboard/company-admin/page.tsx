"use client";

import StatCard from "@/components/dashboard/StatCard";
import {
  Users,
  Building2,
  Briefcase,
  CheckCircle,
  DollarSign,
  Percent,
  UserPlus,
  TrendingUp,
} from "lucide-react";

export default function CompanyDashboardPage() {
  // 🔁 Replace with backend aggregation later
  const stats = {
    totalAgents: 42,
    activeListings: 128,
    activeDeals: 24,
    closedDeals: 18,
    monthlyRevenue: "$182,400",
    commissionPaid: "$74,000",
    newLeads: 67,
    conversionRate: "28%",
  };

  const overviewStats = [
    {
      title: "Total Agents",
      value: stats.totalAgents,
      icon: <Users size={22} />,
      href: "/dashboard/company/employees",
    },
    {
      title: "Active Listings",
      value: stats.activeListings,
      icon: <Building2 size={22} />,
      href: "/dashboard/company/listings",
    },
    {
      title: "Active Deals",
      value: stats.activeDeals,
      icon: <Briefcase size={22} />,
      href: "/dashboard/company/deals",
    },
    {
      title: "Closed Deals (This Month)",
      value: stats.closedDeals,
      icon: <CheckCircle size={22} />,
      href: "/dashboard/company/deals?status=closed",
    },
  ];

  const financialStats = [
    {
      title: "Revenue (This Month)",
      value: stats.monthlyRevenue,
      icon: <DollarSign size={22} />,
      href: "/dashboard/company/reports",
    },
    {
      title: "Commission Paid",
      value: stats.commissionPaid,
      icon: <Percent size={22} />,
      href: "/dashboard/company/commissions",
    },
    {
      title: "New Leads",
      value: stats.newLeads,
      icon: <UserPlus size={22} />,
      href: "/dashboard/company/leads",
    },
    {
      title: "Conversion Rate",
      value: stats.conversionRate,
      icon: <TrendingUp size={22} />,
      href: "/dashboard/company/reports",
    },
  ];

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-2xl font-bold">Company Dashboard</h1>

      {/* ✅ Overview Section */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Operational Overview</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {overviewStats.map((item) => (
            <StatCard key={item.title} {...item} />
          ))}
        </div>
      </div>

      {/* ✅ Financial & Growth Section */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Financial & Growth</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {financialStats.map((item) => (
            <StatCard key={item.title} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}