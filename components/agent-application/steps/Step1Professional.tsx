export default function Step1({ data, onSave }) {
  const professional = data?.professional || {};

  return (
    <div>
      <h2>Professional Info</h2>

      <input
        placeholder="License Number"
        defaultValue={professional.licenseNumber}
        onBlur={(e) =>
          onSave({
            professional: {
              ...professional,
              licenseNumber: e.target.value,
            },
          })
        }
      />

      <input
        type="number"
        placeholder="Years Experience"
        defaultValue={professional.yearsExperience}
        onBlur={(e) =>
          onSave({
            professional: {
              ...professional,
              yearsExperience: +e.target.value,
            },
          })
        }
      />
    </div>
  );
}
