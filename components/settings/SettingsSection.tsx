export function SettingsSection({ title, description, children }) {
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-xl shadow p-6 mb-6">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-sm text-neutral-500 mb-4">{description}</p>
      {children}
    </div>
  );
}
