"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Role = "admin" | "user" | "agent" | "company_admin";

export default function ProtectedRoute({
  children,
  requiredRole,
}: {
  children: React.ReactNode;
  requiredRole?: Role[];
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace("/login");
      return;
    }

    if (requiredRole && !requiredRole.includes(user.role)) {
      router.replace("/unauthorized");
    }
  }, [user, loading, router, requiredRole]);

  if (loading) return null;
  if (!user) return null;
  if (requiredRole && !requiredRole.includes(user.role)) return null;

  return <>{children}</>;
}
