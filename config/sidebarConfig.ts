import { Role, SidebarNavItem } from "@/types/sidebar";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Settings,
  FileText,
  MessageSquare,
  CreditCard,
  BarChart3,
  Shield,
  Building2,
  UserCog,
} from "lucide-react";

// export const SIDEBAR_NAVS: Record<Role, SidebarNavItem[]> = {
export const SIDEBAR_NAVS = {
  user: [
    {
      id: "dashboard",
      label: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      id: "profile",
      label: "Profile",
      path: "/profile",
      icon: Users,
    },
    {
      id: "messages",
      label: "Messages",
      path: "/messages",
      icon: MessageSquare,
    },
    {
      id: "settings",
      label: "Settings",
      path: "/settings",
      icon: Settings,
    },
  ],

  agent: [
    {
      id: "dashboard",
      label: "Dashboard",
      path: "/agent/dashboard",
      icon: LayoutDashboard,
    },
    {
      id: "clients",
      label: "Clients",
      path: "/agent/clients",
      icon: Users,
    },
    {
      id: "deals",
      label: "Deals",
      path: "/agent/deals",
      icon: Briefcase,
    },
    {
      id: "reports",
      label: "Reports",
      path: "/agent/reports",
      icon: BarChart3,
    },
    {
      id: "settings",
      label: "Settings",
      path: "/agent/settings",
      icon: Settings,
    },
  ],

  company_admin: [
    {
      id: "dashboard",
      label: "Dashboard",
      path: "/company/dashboard",
      icon: LayoutDashboard,
    },
    {
      id: "employees",
      label: "Employees",
      path: "/company/employees",
      icon: Users,
    },
    {
      id: "departments",
      label: "Departments",
      path: "/company/departments",
      icon: Building2,
    },
    {
      id: "billing",
      label: "Billing",
      path: "/company/billing",
      icon: CreditCard,
    },
    {
      id: "reports",
      label: "Reports",
      path: "/company/reports",
      icon: BarChart3,
    },
    {
      id: "settings",
      label: "Settings",
      path: "/company/settings",
      icon: Settings,
    },
  ],

  superadmin: [
    {
      id: "dashboard",
      label: "Dashboard",
      path: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      id: "users",
      label: "Users",
      path: "/admin/users",
      icon: Users,
    },
    {
      id: "roles",
      label: "Roles & Permissions",
      path: "/admin/roles",
      icon: Shield,
    },
    {
      id: "companies",
      label: "Companies",
      path: "/admin/companies",
      icon: Building2,
    },
    {
      id: "logs",
      label: "System Logs",
      path: "/admin/logs",
      icon: FileText,
    },
    {
      id: "settings",
      label: "System Settings",
      path: "/admin/settings",
      icon: UserCog,
    },
  ],
};
