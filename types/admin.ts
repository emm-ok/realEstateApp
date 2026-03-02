export type UserRole =
  | "user"
  | "agent"
  | "admin";

export interface AdminUserDetails {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  bio?: string;
  location?: string;
  image?: string;
  role: UserRole;
  provider: string;
  emailVerified: boolean;
  isActive: boolean;
  isSuspended: boolean;
  company?: string | null;
  companyRole?: string | null;
  bookmarks: string[];
  createdAt: string;
  passwordChangedAt?: string;
}
