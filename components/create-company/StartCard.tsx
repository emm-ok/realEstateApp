"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Skeleton } from "../ui/Skeleton";
import { createCompanyApplication, getMyCompanyApplication } from "@/lib/companyApplication";

const BLOCKED = ["pending", "approved", "suspended"];

export default function StartCard() {
  const router = useRouter();
  const [app, setApp] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const data = await getMyCompanyApplication();
        setApp(data);
        console.log(data)
      } finally {
        setLoading(false);
      }
    };
    fetchApplication()
  }, []);

  const status = app?.status;
  const isBlocked = BLOCKED.includes(status);

  const handleClick = async () => {
    try {
      if (app) {
        if (isBlocked) {
          toast.info(`Application already ${status.replace("_", " ")}`);
          return;
        }
        router.push(`/company-application?app=${app._id}`);
        return;
      }

      // Create new company application if none exists
      const res = await createCompanyApplication();
      router.push(`/company-application?app=${res.application._id}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center gap-6 mt-10 shadow p-6 rounded-xl bg-white">
        <Skeleton className="w-50 h-3" />
        <Skeleton className="w-175 h-12" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-8 shadow text-center space-y-4">
      <p className="text-gray-600">
        {status === "draft" && "Ready to start your company verification?"}
      </p>

      <button
        disabled={isBlocked}
        onClick={handleClick}
        className={`
          w-full py-4 rounded-xl font-medium text-white
          transition-all
          ${isBlocked ? "bg-gray-400 cursor-not-allowed" : "bg-black hover:scale-[1.02]"}
        `}
      >
        {!app && "Start Application"}
        {status === "draft" && "Continue Application"}
        {status === "pending" && "Under Review"}
        {status === "approved" && "Approved"}
        {status === "rejected" && "Start New Application"}
      </button>

      {isBlocked && (
        <p className="text-xs text-gray-400">
          You can only have one active company application at a time.
        </p>
      )}
    </div>
  );
}
