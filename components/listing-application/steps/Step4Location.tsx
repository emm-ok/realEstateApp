// Step4Location.tsx
export default function Step4Location({ formData, updateForm }: any) {
  const location = formData?.location || {};

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Address"
        value={location.address || ""}
        onChange={(e) =>
          updateForm({ location: { ...location, address: e.target.value } })
        }
        className="w-full border p-2 rounded"
      />

      <input
        type="text"
        placeholder="City"
        value={location.city || ""}
        onChange={(e) =>
          updateForm({ location: { ...location, city: e.target.value } })
        }
        className="w-full border p-2 rounded"
      />

      <input
        type="text"
        placeholder="State"
        value={location.state || ""}
        onChange={(e) =>
          updateForm({ location: { ...location, state: e.target.value } })
        }
        className="w-full border p-2 rounded"
      />

      <input
        type="text"
        placeholder="Country"
        value={location.country || ""}
        onChange={(e) =>
          updateForm({ location: { ...location, country: e.target.value } })
        }
        className="w-full border p-2 rounded"
      />
    </div>
  );
}