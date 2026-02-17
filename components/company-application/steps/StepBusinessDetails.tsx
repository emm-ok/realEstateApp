import Input from "@/components/ui/Input";

export default function StepBusinessDetails({ formData, updateForm }) {
  const company = formData.company || {};

  return (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Business Type (LLC, Corp, etc.)"
        value={company.type || ""}
        onChange={(e) => updateForm({ company: { ...company, type: e.target.value } })}
      />
      <Input
        placeholder="Registration Number"
        value={company.registrationNumber || ""}
        onChange={(e) =>
          updateForm({ company: { ...company, registrationNumber: e.target.value } })
        }
      />
      <Input
        placeholder="License Number"
        value={company.licenseNumber || ""}
        onChange={(e) => updateForm({ company: { ...company, licenseNumber: e.target.value } })}
      />
    </div>
  );
}
