export function Kpi({ title, value, color = "neutral" }) {
  return (
    <div className="border border-gray-300 shadow-md rounded-xl p-4">
      <p className="text-slate-400 text-sm">{title}</p>
      <p className={`text-2xl font-semibold text-${color}-800`}>{value}</p>
    </div>
  );
}

export function NavItem({
  label,
  value,
  activeTab,
  setActiveTab,
}: {
  label: string;
  value: string;
  activeTab: string;
  setActiveTab: (v: string) => void;
}) {
  const isActive = activeTab === value;

  return (
    <button
      onClick={() => setActiveTab(value)}
      className={`w-full p-2 rounded-md transition
        ${
          isActive
            ? "bg-slate-800 text-white"
            : "hover:bg-gray-300"
        }
      `}
    >
      {label}
    </button>
  );
}

export function StatusBadge({ status }) {
  const map = {
    pending: "bg-amber-500/10 text-amber-400",
    approved: "bg-emerald-500/10 text-emerald-400",
    rejected: "bg-rose-500/10 text-rose-400",
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs ${map[status]}`}>
      {status}
    </span>
  );
}

export function Section({ title, children }) {
  return (
    <div className="shadow-md border border-gray-300 rounded-xl p-6 space-y-3">
      <h3 className="font-medium mb-2">{title}</h3>
      {children}
    </div>
  );
}
