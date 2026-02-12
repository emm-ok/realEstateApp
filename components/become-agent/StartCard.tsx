"use client";

import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const BLOCKED = ["submitted", "under_review", "approved", "suspended"];

export default function StartCard() {
  const router = useRouter();
  const [app, setApp] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/api/agent-applications/me")
      .then((res) => setApp(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null;

  const status = app?.application?.status;
  const isBlocked = BLOCKED.includes(status);

  const handleClick = async () => {
    try {
      if (app) {
        if (isBlocked) {
          toast(`Application already ${status.replace("_", " ")}`);
          return;
        }
        router.push(`/account/agent-application?app=${app._id}`);
        return;
      }

      const res = await api.post("/api/agent-applications");
      router.push(`/account/agent-application?app=${res.data.application._id}`);
    } catch (error) {
      toast(error?.response?.data?.message);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow text-center space-y-4">
      <p className="text-gray-600">Ready to start your verification?</p>

      <button
        disabled={isBlocked}
        onClick={handleClick}
        className={`
          w-full py-4 rounded-xl font-medium text-white
          transition-all
          ${
            isBlocked
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-black hover:scale-[1.02]"
          }
        `}
      >
        {!app && "Start Application"}
        {status === "draft" && "Continue Application"}
        {status === "submitted" && "Submitted"}
        {status === "under_review" && "Under Review"}
        {status === "approved" && "Approved"}
        {status === "rejected" && "Start New Application"}
      </button>

      {isBlocked && (
        <p className="text-xs text-gray-400">
          You can only have one active application at a time.
        </p>
      )}
    </div>
  );
}
