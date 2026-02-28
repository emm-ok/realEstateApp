
import ProtectedRoute from "@/components/ProtectedRoute";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ProtectedRoute requiredRole={["user"]}>{children}</ProtectedRoute>;
}
