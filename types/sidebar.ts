// sidebarTypes.ts
import { LucideIcon } from "lucide-react";

export type Role = "user" | "agent" | "company_admin" | "superadmin";

export interface SidebarNavItem {
  id: string;
  label: string;
  path: string;
  icon: LucideIcon;
}
