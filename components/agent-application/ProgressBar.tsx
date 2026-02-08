export default function ProgressBar({ step, total }) {
  const percent = (step / total) * 100;

  return (
    <div className="mb-4">
      <div className="h-2 bg-gray-200 rounded">
        <div
          className="h-2 bg-blue-600 rounded"
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="text-sm mt-1">
        Step {step} of {total}
      </p>
    </div>
  );
}
