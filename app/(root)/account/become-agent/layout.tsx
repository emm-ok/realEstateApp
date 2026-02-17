"use client";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function DashboardLayout({ children }) {
  return (
    <ProtectedRoute requiredRole="user">
        {children}
    </ProtectedRoute>
);
}
