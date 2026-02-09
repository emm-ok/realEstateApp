import { Upload } from "lucide-react";
import { toast } from "sonner";

export default function StepDocuments({ localDocs, setLocalDocs, formData, loading }) {
  if (loading || !formData) return null;

  const savedDocs = formData?.documents || {};

  const displayIdCard = localDocs.idCard || savedDocs.idCard?.url;
  const displaySelfie = localDocs.selfie || savedDocs.selfie?.url;
  const displayRealEstateLicense = localDocs.realEstateLicense || savedDocs.realEstateLicense?.url;

  return (
    <div className="flex flex-col gap-6 text-xs">
      <h2>Documents</h2>

      <label className="flex flex-col gap-2 shadow-md rounded-2xl p-4 cursor-pointer">
        <input
          type="file"
          hidden
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;

            setLocalDocs((prev) => ({
              ...prev,
              idCard: file,
            }));
            toast("ID card uploaded")
          }}
        />
        Upload ID Card <Upload />
        {displayIdCard && (
          <p className="text-green-600">
            {localDocs.idCard ? `Selected: ${localDocs.idCard.name}` : `Uploaded: ${savedDocs.idCard?.url}`}
          </p>
        )}
      </label>

      <label className="flex flex-col gap-2 shadow-md rounded-2xl p-4 cursor-pointer">
        <input
          type="file"
          hidden
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;

            setLocalDocs((prev) => ({
              ...prev,
              realEstateLicense: file,
            }));
            toast("license uploaded")
          }}
        />
        Upload Real Estate License <Upload />
        {displayRealEstateLicense && (
          <p className="text-green-600">
            {localDocs.realEstateLicense ? `Selected: ${localDocs.realEstateLicense.name}` : `Uploaded: ${savedDocs.realEstateLicense?.url}`}
          </p>
        )}
      </label>

      <label className="flex flex-col gap-2 shadow-md rounded-2xl p-4 cursor-pointer">
        <input
          type="file"
          hidden
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;

            setLocalDocs((prev) => ({
              ...prev,
              selfie: file,
            }));
            toast("Selfie uploaded")
          }}
        />
        Upload Selfie <Upload />
        {displaySelfie && (
          <p className="text-green-600">
            {localDocs.selfie ? `Selected: ${localDocs.selfie.name}` : `Uploaded: ${savedDocs.selfie?.url}`}
          </p>
        )}
      </label>
    </div>
  );
}
