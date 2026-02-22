// Step2Pricing.tsx
export default function Step2Pricing({ formData, updateForm }: any) {
  return (
    <div className="space-y-4">
      <input
        type="number"
        placeholder="Price"
        value={formData?.price || ""}
        onChange={(e) => updateForm({ price: Number(e.target.value) })}
        className="w-full border p-2 rounded"
      />

      <select
        value={formData?.listingType || ""}
        onChange={(e) => updateForm({ listingType: e.target.value })}
        className="w-full border p-2 rounded"
      >
        <option value="">Select Listing Type</option>
        <option value="for_sale">For Sale</option>
        <option value="for_rent">For Rent</option>
      </select>

      {formData?.listingType === "for_rent" && (
        <select
          value={formData?.rentalFrequency || ""}
          onChange={(e) => updateForm({ rentalFrequency: e.target.value })}
          className="w-full border p-2 rounded"
        >
          <option value="">Rental Frequency</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      )}

      <select
        value={formData?.type || ""}
        onChange={(e) => updateForm({ type: e.target.value })}
        className="w-full border p-2 rounded"
      >
        <option value="">Property Type</option>
        <option value="apartment">Apartment</option>
        <option value="house">House</option>
        <option value="land">Land</option>
      </select>
    </div>
  );
}