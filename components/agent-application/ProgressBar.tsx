export default function ProgressBar({ currentStep, total }: { currentStep: number, total: number }) {
  const percent = (currentStep / total) * 100;

  return (
    <div className="w-full mb-6">
      <div className="h-2 bg-gray-200 rounded">
        <div
          className="h-2 bg-black rounded transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="text-xs text-gray-500 mt-1">
        Step {currentStep} of {total}
      </p>
    </div>
  );
}
