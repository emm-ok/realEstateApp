// dashboard/page.tsx

import StatsCard from "@/components/admin/StatsCard";
import ChartCard from "@/components/dashboard/ChartCard";
import LeadsTable from "@/components/dashboard/LeadsTable";
import RecentListings from "@/components/dashboard/RecentListings";
import StatCard from "@/components/dashboard/StatCard";


export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard />
        {/* <StatCard title="Total Properties" value="1,248" />
        <StatCard title="Active Listings" value="842" />
        <StatCard title="Monthly Revenue" value="$124,500" />
        <StatCard title="New Leads" value="312" /> */}
      </div>

      {/* Charts */}
      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Sales Over Time" />
        <ChartCard title="Property Types" />
      </div> */}

      {/* Tables */}
      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentListings />
        <LeadsTable />
      </div> */}
    </div>
  );
}
