"use client";

export default function StepReview({ formData, goToStep}) {

  const sections = [
    {
      title: "Professional Info",
      step: 1,
      data: {
        "License Number": formData?.professional.licenseNumber,
        "License Country": formData?.professional.licenseCountry,
        "Years Experience": formData?.professional.yearsExperience,
        "Company Name": formData?.professional.companyName,
        "Website": formData?.professional.website,
      }
    },
    {
      title: "Specialization",
      step: 2,
      data: {
        "Specializations": formData?.professional.specialization.join(", "),
      }
    },
    {
      title: "Documents",
      step: 3,
      data: {
        "ID Card": formData?.documents.idCard?.url ? "Uploaded" : "Missing",
        "Real Estate License": formData?.documents.realEstateLicense?.url ? "Uploaded" : "Missing",
        "Selfie": formData?.documents.selfie?.url ? "Uploaded" : "Missing",
      }
    }
  ];

  return (
    <div className="space-y-6">
      {sections.map(section => (
        <div key={section.title} className="shadow-md rounded-xl p-4">
          <div className="flex justify-between mb-3">
            <h3 className="font-semibold">{section.title}</h3>
            <button
              onClick={() => goToStep(section.step)}
              className="text-sm text-blue-600 hover:underline"
            >
              Edit
            </button>
          </div>

          <div className="space-y-2 text-sm">
            {Object.entries(section.data).map(([label, value]) => (
              <div key={label} className="flex justify-between">
                <span className="text-gray-500">{label}</span>
                <span className="font-medium">{value || "—"}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
