import Input from "@/components/ui/Input";

export default function StepCompanyInfo({ formData, updateForm }) {
  const company = formData.company || {};

  return (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Company Name"
        value={company.name || ""}
        onChange={(e) => updateForm({ company: { ...company, name: e.target.value } })}
      />
      <Input
        placeholder="Email"
        value={company.email || ""}
        onChange={(e) => updateForm({ company: { ...company, email: e.target.value } })}
      />
      <Input
        placeholder="Website URL"
        value={company.website || ""}
        onChange={(e) => updateForm({ company: { ...company, website: e.target.value } })}
      />
      <Input
        placeholder="Address"
        value={company.address || ""}
        onChange={(e) => updateForm({ company: { ...company, address: e.target.value } })}
      />
    </div>
  );
}
