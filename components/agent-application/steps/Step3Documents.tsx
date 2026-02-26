import { Upload } from "lucide-react";
import { toast } from "sonner";

export default function StepDocuments({
  localDocs,
  setLocalDocs,
  formData,
  loading,
}) {
  if (loading || !formData) return null;

  const savedDocs = formData?.documents || {};

  const displayIdCard = localDocs.idCard || savedDocs.idCard?.url;
  const displaySelfie = localDocs.selfie || savedDocs.selfie?.url;
  const displayRealEstateLicense =
    localDocs.realEstateLicense || savedDocs.realEstateLicense?.url;

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
            toast.success("ID card uploaded");
          }}
        />
        <div className="flex items-center justify-between">
          Upload ID Card <Upload />
        </div>
        {formData.documents.idCard?.url && (
          <p className="text-green-600 text-sm">ID Card already uploaded</p>
        )}

        {displayIdCard && (
          <p className="text-green-600">
            {localDocs.idCard && `Selected: ${localDocs.idCard.name}`}
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
            toast.success("license uploaded");
          }}
        />
        <div className="flex items-center justify-between">
          Upload Real Estate License <Upload />
        </div>
        {formData.documents.realEstateLicense?.url && (
          <p className="text-green-600 text-sm">License already uploaded</p>
        )}

        {displayRealEstateLicense && (
          <p className="text-green-600">
            {localDocs.realEstateLicense &&
              `Selected: ${localDocs.realEstateLicense.name}`}
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
            toast.success("Selfie uploaded");
          }}
        />
        <div className="flex items-center justify-between">
          Upload Selfie <Upload />
        </div>
        {formData.documents.selfie?.url && (
          <p className="text-green-600 text-sm">Selfie already uploaded</p>
        )}

        {displaySelfie && (
          <p className="text-green-600">
            {localDocs.selfie && `Selected: ${localDocs.selfie.name}`}
          </p>
        )}
      </label>
    </div>
  );
}
