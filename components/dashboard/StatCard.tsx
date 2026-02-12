export default function StatCard({ title, value }) {
  return (
    <div className="flex flex-col justify-center bg-white rounded-xl p-5 shadow-md">
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-2xl font-semibold mt-1">{value}</h2>
    </div>
  );
}
