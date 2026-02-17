import Input from "@/components/ui/Input";

export default function StepBranding({ formData, updateForm }) {
  const company = formData.company || {};
  return (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Company Logo URL"
        value={company.logo || ""}
        onChange={(e) => updateForm({ company: { ...company, logo: e.target.value } })}
      />
      <Input
        placeholder="Primary Brand Color"
        value={company.brandColor || ""}
        onChange={(e) => updateForm({ company: { ...company, brandColor: e.target.value } })}
      />
      <Input
        placeholder="Secondary Brand Color"
        value={company.secondaryColor || ""}
        onChange={(e) => updateForm({ company: { ...company, secondaryColor: e.target.value } })}
      />
    </div>
  );
}
