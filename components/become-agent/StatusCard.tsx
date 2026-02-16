"use client";

import { api } from "@/lib/api";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/Skeleton";

type ApplicationStatus =
  | "draft"
  | "submitted"
  | "under_review"
  | "approved"
  | "rejected";

type AgentApplication = {
  _id: string;
  status: ApplicationStatus;
  createdAt: string;
};

export default function StatusCard() {
  const [app, setApp] = useState<AgentApplication | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/api/agent-applications/me")
      .then((res) => setApp(res.data.application))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-between items-center shadow p-6">
        <div>
          <Skeleton className="w-50 h-3" />
          <Skeleton className="w-30 h-3 mt-3" />
        </div>
        <Skeleton className="w-50 h-3" />
      </div>
    );
  }
  if (!app) return null;
  const statusColor: Record<ApplicationStatus, string> = {
    draft: "text-yellow-600",
    submitted: "text-blue-600",
    under_review: "text-purple-600",
    approved: "text-green-600",
    rejected: "text-red-600",
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow flex justify-between items-center">
      <div>
        <p className="text-sm text-gray-500">Your application</p>
        <p className={`font-semibold ${statusColor[app?.status]}`}>
          {app?.status.replace("_", " ")}
        </p>
      </div>

      <span className="text-xs text-gray-400">
        Created {new Date(app.createdAt).toLocaleDateString()}
      </span>
    </div>
  );
}
