// Step1BasicInfo.tsx
export default function Step1BasicInfo({ formData, updateForm }: any) {
  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Listing Title"
        value={formData?.title || ""}
        onChange={(e) => updateForm({ title: e.target.value })}
        className="w-full border p-2 rounded"
      />

      <textarea
        placeholder="Listing Description"
        value={formData?.description || ""}
        onChange={(e) => updateForm({ description: e.target.value })}
        className="w-full border p-2 rounded"
        rows={5}
      />
    </div>
  );
}