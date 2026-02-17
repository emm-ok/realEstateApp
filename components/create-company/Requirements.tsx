const requirements = [
  "Business registration certificate",
  "Company license document",
  "Valid ID for company owner",
  "Website URL (optional)",
  "Company logo (optional)"
];

export default function CompanyRequirements() {
  return (
    <section className="bg-white shadow-md rounded-xl p-6 space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800">What You Need</h2>
      <ul className="list-disc list-inside text-gray-600 space-y-1">
        {requirements.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
