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
  MessageCircle,
  ArrowLeftRight,
  UserCircle,
  List,
} from "lucide-react";

export const SIDEBAR_NAVS = {
  user: [
    {
      id: "dashboard",
      label: "Dashboard",
      path: "/dashboard/user",
      icon: LayoutDashboard,
    },
    {
      id: "profile",
      label: "Profile",
      path: "/dashboard/user/profile",
      icon: Users,
    },
    {
      id: "messages",
      label: "Messages",
      path: "/dashboard/user/messages",
      icon: MessageSquare,
    },
    {
      id: "settings",
      label: "Settings",
      path: "/dashboard/user/settings",
      icon: Settings,
    },
  ],

  agent: [
    {
      id: "dashboard",
      label: "Dashboard",
      path: "/dashboard/agent",
      icon: LayoutDashboard,
    },
    {
      id: "clients",
      label: "Clients",
      path: "/dashboard/agent/clients",
      icon: Users,
    },
    {
      id: "deals",
      label: "Deals",
      path: "/dashboard/agent/deals",
      icon: Briefcase,
    },
    {
      id: "reports",
      label: "Reports",
      path: "/dashboard/agent/reports",
      icon: BarChart3,
    },
    {
      id: "settings",
      label: "Settings",
      path: "/dashboard/agent/settings",
      icon: Settings,
    },
  ],

  company_admin: [
    {
      id: "dashboard",
      label: "Dashboard",
      path: "/dashboard/company",
      icon: LayoutDashboard,
    },
    {
      id: "employees",
      label: "Employees",
      path: "/dashboard/company/employees",
      icon: Users,
    },
    {
      id: "departments",
      label: "Departments",
      path: "/dashboard/company/departments",
      icon: Building2,
    },
    {
      id: "billing",
      label: "Billing",
      path: "/dashboard/company/billing",
      icon: CreditCard,
    },
    {
      id: "reports",
      label: "Reports",
      path: "/dashboard/company/reports",
      icon: BarChart3,
    },
    {
      id: "settings",
      label: "Settings",
      path: "/dashboard/company/settings",
      icon: Settings,
    },
  ],

  superadmin: [
    {
      id: "dashboard",
      label: "Dashboard",
      path: "/dashboard/admin",
      icon: LayoutDashboard,
    },
    {
      id: "users",
      label: "Users",
      path: "/dashboard/admin/users",
      icon: Users,
    },
    {
      id: "roles",
      label: "Roles & Permissions",
      path: "/dashboard/admin/roles",
      icon: Shield,
    },
    {
      id: "companies",
      label: "Companies",
      path: "/dashboard/admin/companies",
      icon: Building2,
    },
    {
      id: "logs",
      label: "System Logs",
      path: "/dashboard/admin/logs",
      icon: FileText,
    },
    {
      id: "agents",
      label: "Agents",
      path: "/dashboard/admin/agents",
      icon: UserCircle,
    },
    {
      id: "listings",
      label: "Listings",
      path: "/dashboard/admin/listings",
      icon: List,
    },
    {
      id: "transaction",
      label: "System Transaction",
      path: "/dashboard/admin/transaction",
      icon: ArrowLeftRight,
    },
    {
      id: "message",
      label: "Message",
      path: "/dashboard/admin/message",
      icon: MessageCircle,
    },
  ],
};
