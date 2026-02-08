import {
  User,
  Shield,
  Bell,
  Palette,
  CreditCard,
  Key,
  AlertTriangle,
  KeyRound,
  LockKeyhole,
  Delete,
} from "lucide-react";

export const settingsNav = [
  { id: "profile", label: "Profile", icon: User },
  { id: "security", label: "Security", icon: Shield },
  { id: "change-password", label: "Change Password", icon: KeyRound },
  { id: "verify-email", label: "Email Verification", icon: LockKeyhole },
  // { id: "notifications", label: "Notifications", icon: Bell },
  // { id: "appearance", label: "Appearance", icon: Palette },
  // { id: "billing", label: "Billing", icon: CreditCard },
  // { id: "api", label: "API Keys", icon: Key },
  // { id: "danger", label: "Danger Zone", icon: AlertTriangle },
  { id: "delete-account", label: "Delete Account", icon: Delete },
];
