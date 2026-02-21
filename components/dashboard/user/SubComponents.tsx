import { AdminUserDetails } from "@/types/admin";

interface BadgeProps {
  label: string;
  color: "green" | "red" | "gray" | "blue";
}

export function StatusBadge({ label, color }: BadgeProps) {
  const colorMap = {
    green: "bg-green-100 text-green-700",
    red: "bg-rose-100 text-rose-700",
    gray: "bg-gray-200 text-gray-600",
    blue: "bg-blue-100 text-blue-700",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${colorMap[color]}`}>
      {label}
    </span>
  );
}


export function ProfileSection({ user }: { user: AdminUserDetails }) {
  return (
    <div className="space-y-3">
      <InfoRow label="Phone" value={user.phone} />
      <InfoRow label="Location" value={user.location} />
      <InfoRow label="Bio" value={user.bio} />
      <InfoRow label="Provider" value={user.provider} />
    </div>
  );
}


export function SecuritySection({
  user,
  onSuspendToggle,
}: {
  user: AdminUserDetails;
  onSuspendToggle: () => void;
}) {
  return (
    <div className="space-y-4">
      <InfoRow
        label="Email Verified"
        value={user.emailVerified ? "Yes" : "No"}
      />

      <div className="flex items-center justify-between">
        <span>Suspend User</span>
        <button
          onClick={onSuspendToggle}
          className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
            user.isSuspended ? "bg-rose-600" : "bg-gray-300"
          }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
              user.isSuspended ? "translate-x-6" : ""
            }`}
          />
        </button>
      </div>
    </div>
  );
}

export function ActivitySection({ user }: { user: AdminUserDetails }) {
  return (
    <div className="space-y-4">
      <InfoRow
        label="Account Created"
        value={new Date(user.createdAt).toLocaleDateString()}
      />

      {user.passwordChangedAt && (
        <InfoRow
          label="Password Changed"
          value={new Date(user.passwordChangedAt).toLocaleDateString()}
        />
      )}

      <InfoRow
        label="Bookmarks"
        value={`${user.bookmarks?.length} saved items`}
      />
    </div>
  );
}

export function CompanySection({ user }: { user: AdminUserDetails }) {
  return (
    <div className="space-y-3">
      <InfoRow label="Company" value={user.company} />
      <InfoRow label="Company Role" value={user.companyRole} />
    </div>
  );
}


export function InfoRow({
  label,
  value,
}: {
  label: string;
  value?: string | null;
}) {
  return (
    <div className="flex justify-between pb-2 text-sm">
      <span className="text-gray-500">{label}</span>
      <span>{value || "—"}</span>
    </div>
  );
}

