// StepSpecialization.tsx
import Input from "@/components/ui/Input";

const options = [
  "residential",
  "commercial",
  "luxury",
  "student",
  "shortlet",
  "land",
];

export default function StepSpecialization({ formData, updateForm }) {
  const professional = formData.professional || {};
  const specialization = professional.specialization || [];

  const toggle = (val: string) => {
    const next = specialization.includes(val)
      ? specialization.filter((x) => x !== val)
      : [...specialization, val];

    updateForm({
      professional: {
        ...professional,
        specialization: next,
      },
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-3">
        {options.map((opt) => (
          <label key={opt} className="flex gap-2">
            <input
              type="checkbox"
              checked={specialization.includes(opt)}
              onChange={() => toggle(opt)}
            />
            {opt}
          </label>
        ))}
      </div>

      <Input
        placeholder="Company Name"
        value={professional.companyName || ""}
        onChange={(e) =>
          updateForm({
            professional: {
              ...professional,
              companyName: e.target.value,
            },
          })
        }
      />

      <Input
        placeholder="Website Url"
        value={professional.website || ""}
        onChange={(e) =>
          updateForm({
            professional: {
              ...professional,
              website: e.target.value,
            },
          })
        }
      />
    </div>
  );
}
