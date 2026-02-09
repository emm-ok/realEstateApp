import Input from "@/components/ui/Input";

export default function StepProfessional({ formData, updateForm }) {
  const p = formData.professional;

  return (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="License Number"
        value={p.licenseNumber || ""}
        onChange={(e) =>
          updateForm({
            professional: { ...p, licenseNumber: e.target.value },
          })
        }
      />
      <Input
        placeholder="License Country"
        value={p.licenseCountry || ""}
        onChange={(e) =>
          updateForm({
            professional: { ...p, licenseCountry: e.target.value },
          })
        }
      />

      <Input
        type="number"
        placeholder="Years Experience"
        value={p.yearsExperience || ""}
        onChange={(e) =>
          updateForm({
            professional: { ...p, yearsExperience: e.target.value },
          })
        }
      />
    </div>
  );
}
