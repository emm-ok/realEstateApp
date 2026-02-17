import { Upload } from "lucide-react";
import { toast } from "sonner";

export default function StepVerification({ localDocs, setLocalDocs, formData }) {
  if (!formData) return null;

  const savedDocs = formData.documents || {};
  const displayReg = localDocs.registrationCertificate || savedDocs.registrationCertificate?.url;
  const displayLicense = localDocs.license || savedDocs.license?.url;
  const displayOwnerId = localDocs.ownerIdCard || savedDocs.ownerIdCard?.url;

  const uploadLabel = (label: string, type: string, display: string | File) => (
    <label className="flex flex-col gap-2 shadow-md rounded-2xl p-4 cursor-pointer">
      <input
        type="file"
        hidden
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          setLocalDocs((prev) => ({ ...prev, [type]: file }));
          toast(`${label} uploaded`);
        }}
      />
      <div className="flex items-center justify-between">
        Upload {label} <Upload />
      </div>
      {display && <p className="text-green-600">{display instanceof File ? `Selected: ${display.name}` : "Already uploaded"}</p>}
    </label>
  );

  return (
    <div className="flex flex-col gap-6 text-xs">
      {uploadLabel("Registration Certificate", "registrationCertificate", displayReg)}
      {uploadLabel("License Document", "license", displayLicense)}
      {uploadLabel("Owner ID Card", "ownerIdCard", displayOwnerId)}
    </div>
  );
}
