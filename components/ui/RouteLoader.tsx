"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import PageLoader from "./PageLoader";

export function RouteLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 300); // smoothness buffer

    return () => clearTimeout(timeout);
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur">
      <PageLoader text="Loading..." />
    </div>
  );
}
