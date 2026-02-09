export default function StepReview({ formData }) {
  return (
    <pre className="bg-gray-100 p-4 rounded text-xs">
      {JSON.stringify(formData, null, 2)}
    </pre>
  );
}
