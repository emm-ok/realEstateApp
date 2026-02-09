export default function ProgressBar({ currentStep, total } 
  : { 
    currentStep: number, 
    total: number
   }) {
  const percent = ((currentStep + 1) / total) * 100;

return (
    <div>
      <div className="flex justify-between text-sm mb-2">
        <span>Step {currentStep + 1} of {total}</span>
        <span>{Math.round(percent)}%</span>
      </div>

      <div className="w-full bg-gray-200 h-2 rounded">
        <div
          className="bg-blue-600 h-2 rounded transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
