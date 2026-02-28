"use client";

import { getMyCompany, getMyCompanyAgents } from "@/lib/company";
import React, { useEffect, useState } from "react";

const CompanyAgentsView = () => {
  const [company, setCompany] = useState(null);
  const [companyAgents, setCompanyAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const companyRes = await getMyCompany();
        const agentsRes = await getMyCompanyAgents();

        console.log(companyRes.company)
        console.log(agentsRes.agents)
        setCompany(companyRes.company);
        setCompanyAgents(agentsRes.agents);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="text-center py-20">Loading company applications...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Applied At</th>
                <th className="px-4 py-2">View</th>
              </tr>
            </thead>

            {/* <tbody>
              {companyAgents.map((app) => (
                <tr key={app._id} className="border-b border-gray-200">
                  <td className="px-4 py-2">{app.name || "—"}</td>

                  <td className="px-4 py-2">{app.email || "—"}</td>

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
                    <button
                      onClick={() => setSelectedCompanyId(app._id)}
                      className="bg-neutral-800 text-white px-3 py-1 rounded-md"
                    >
                      View Details
                    </button>{" "}
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
            </tbody> */}
          </table>
        </div>
      )}
    </div>
  );
};

export default CompanyAgentsView;
