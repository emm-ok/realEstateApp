import { api } from "@/lib/api";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    api.get("/api/agent-applications/me")
      .then(res => setApp(res.data))
      .catch(() => {});
  }, []);

  if (!app) return null;
  console.log(app);
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
        <p className={`font-semibold ${statusColor[app?.application?.status]}`}>
          {app?.application?.status.replace("_", " ")}
        </p>
      </div>

      <span className="text-xs text-gray-400">
        Created {new Date(app.application.createdAt).toLocaleDateString()}
      </span>
    </div>
  );
}
