const steps = [
  "Company Info",
  "Business",
  "Verification",
  "Branding",
  "Review",
];

export default function Stepper({ step }: any) {
  return (
    <div className="flex justify-between text-sm">
      {steps.map((label, i) => (
        <div
          key={label}
          className={`flex-1 text-center ${
            step === i + 1 ? "font-bold" : "text-gray-400"
          }`}
        >
          {label}
        </div>
      ))}
    </div>
  );
}
