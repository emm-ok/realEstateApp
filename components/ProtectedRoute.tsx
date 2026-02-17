"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({
  children,
  requiredRole,
}: {
  children: React.ReactNode;
  requiredRole?: string;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace("/login");
      } else if (requiredRole && user.role !== requiredRole) {
        router.replace("/unauthorized");
      }
    }
  }, [user, loading]);

  if (loading || !user) return null;

  if (requiredRole && user.role !== requiredRole) return null;

  return <>{children}</>;
}
