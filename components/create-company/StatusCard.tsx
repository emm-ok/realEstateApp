"use client";

import { useEffect, useState } from "react";
import { getMyCompanyApplication } from "@/lib/companyApplication";

export default function StatusCard() {
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    getMyCompanyApplication()
      .then((res) => {
        if (res?.application) setStatus(res.application.status);
      })
      .catch(() => setStatus(null));
  }, []);

  if (!status) return null;

  return (
    <section className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
      <p className="text-yellow-700 font-medium">
        Your company application status: <span className="font-bold">{status}</span>
      </p>
    </section>
  );
}
