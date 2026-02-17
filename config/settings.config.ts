import {
  User,
  Shield,
  KeyRound,
  Trash,
  Receipt,
  Bell,
} from "lucide-react";

export const settingsNav = [
  { id: "account", label: "Account", icon: User },
  { id: "privacy", label: "Privacy", icon: KeyRound },
  { id: "security", label: "Security", icon: Shield },
  { id: "billings", label: "Billings", icon: Receipt },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "delete-account", label: "Delete Account", icon: Trash },
];
