import { CheckCircle } from "lucide-react";

const items = [
  "Valid government ID",
  "Professional license",
  "Company or brokerage info",
  "Profile photo (selfie)",
];

export default function Requirements() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow">
      <h3 className="font-semibold mb-4">
        What you’ll need
      </h3>

      <ul className="space-y-2 text-sm text-gray-600">
        {items.map(i => (
          <li key={i} className="flex items-center gap-2">
            <CheckCircle size={16} className="text-green-500" />
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}
