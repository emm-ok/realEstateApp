// Step3Details.tsx
export default function Step3PropertyDetails({ formData, updateForm }: any) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <input
        type="number"
        placeholder="Bedrooms"
        value={formData?.bedrooms || ""}
        onChange={(e) => updateForm({ bedrooms: Number(e.target.value) })}
        className="border p-2 rounded"
      />

      <input
        type="number"
        placeholder="Bathrooms"
        value={formData?.bathrooms || ""}
        onChange={(e) => updateForm({ bathrooms: Number(e.target.value) })}
        className="border p-2 rounded"
      />

      <input
        type="number"
        placeholder="Area Size"
        value={formData?.areaSize || ""}
        onChange={(e) => updateForm({ areaSize: Number(e.target.value) })}
        className="border p-2 rounded"
      />

      <select
        value={formData?.areaUnit || ""}
        onChange={(e) => updateForm({ areaUnit: e.target.value })}
        className="border p-2 rounded"
      >
        <option value="">Area Unit</option>
        <option value="sqm">sqm</option>
        <option value="sqft">sqft</option>
      </select>
    </div>
  );
}