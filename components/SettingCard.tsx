export default function SettingCard({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="shadow-md border border-gray-200 rounded-xl p-5 space-y-3 bg-white">
      <div>
        <h3 className="font-semibold">{title}</h3>
        {description && (
          <p className="text-sm text-gray-500">{description}</p>
        )}
      </div>
      {children}
    </div>
  );
}
