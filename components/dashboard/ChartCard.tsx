export default function ChartCard({ title }) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-md">
      <h3 className="font-semibold mb-3">{title}</h3>
      <div className="h-56 bg-gray-100 rounded flex items-center justify-center text-gray-400">
        Chart Placeholder
      </div>
    </div>
  );
}
