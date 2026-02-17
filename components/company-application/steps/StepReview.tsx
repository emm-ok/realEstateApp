"use client";

export default function StepReview({ formData, goToStep }) {
  const sections = [
    {
      title: "Company Info",
      step: 1,
      data: {
        "Name": formData?.company.name,
        "Email": formData?.company.email,
        "Website": formData?.company.website,
        "Address": formData?.company.address,
      },
    },
    {
      title: "Business Details",
      step: 2,
      data: {
        "Business Type": formData?.company.type,
        "Registration Number": formData?.company.registrationNumber,
        "License Number": formData?.company.licenseNumber,
      },
    },
    {
      title: "Documents",
      step: 3,
      data: {
        "Registration Certificate": formData?.documents.registrationCertificate?.url ? "Uploaded" : "Missing",
        "License Document": formData?.documents.license?.url ? "Uploaded" : "Missing",
        "Owner ID Card": formData?.documents.ownerIdCard?.url ? "Uploaded" : "Missing",
      },
    },
    {
      title: "Branding",
      step: 4,
      data: {
        "Logo": formData?.company.logo,
        "Primary Color": formData?.company.brandColor,
        "Secondary Color": formData?.company.secondaryColor,
      },
    },
  ];

  return (
    <div className="space-y-6">
      {sections.map((section) => (
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
