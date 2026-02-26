"use client"

import { Kpi } from "@/components/dashboard/DashComponents";
import { ListingTabRenderer } from "@/components/dashboard/TabRenderer";
import { getAllListingApplications } from "@/lib/listingApplication";
import React, { useEffect, useState } from "react";

const ListingApplicationsDashboard = () => {
  const [activeTab, setactiveTab] = useState("applications");
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const data = await getAllListingApplications();
      console.log(data)
      setApplications(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "applications") {
      fetchApplications();
    }
  }, [activeTab]);

  return (
    <div>
      <div className="text-2xl font-semibold">Listings</div>
      <p>Manage listing applications and approvals</p>

      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-4">
        <Kpi title="Total Applications" value={applications.length} />
        <Kpi
          title="Approved Listings"
          value={applications?.filter((a) => a.status === "approved").length}
        />
        <Kpi
          title="Pending"
          value={applications?.filter((a) => a.status === "pending").length}
        />
        <Kpi
          title="Rejected"
          value={applications?.filter((a) => a.status === "rejected").length}
        />
      </div>

      <div>
        <main className="flex-1 min-h-[400px]">
            <ListingTabRenderer
                tab={activeTab}    
                applications={applications}    
            />
        </main>
      </div>
    </div>
  );
};

export default ListingApplicationsDashboard;
