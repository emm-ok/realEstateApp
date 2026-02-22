import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  createCompanyApplication,
  getMyCompanyApplication,
  updateDraft,
  uploadDocument,
  deleteDocument,
  submitCompanyApplication,
} from "@/lib/companyApplication";
import { toast } from "sonner";
import { validateCompanyStep } from "@/lib/validation/companyApplication";

export function useCompanyApplication() {
  const [pageLoading, setPageLoading] = useState(true);
  const [stepLoading, setStepLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<any>(null);
  const [localDocs, setLocalDocs] = useState<any>({});
  const [editReturnStep, setEditReturnStep] = useState<number | null>(null);

  const router = useRouter();

  /* ---------------- LOAD OR CREATE ---------------- */
  useEffect(() => {
    const init = async () => {
      try {
        const res = await getMyCompanyApplication();
        const data = res.application;

        setFormData({
          company: data.company || {},
          documents: data.documents || {},
        });

        setCurrentStep(data.currentStep || 1);
      } catch {
        // No application exists → create
        const createRes = await createCompanyApplication();
        const data = createRes.application;

        setFormData({
          company: data.company || {},
          documents: data.documents || {},
        });

        setCurrentStep(data.currentStep || 1);
      } finally {
        setPageLoading(false);
      }
    };

    init();
  }, []);

  /* ---------------- UPDATE FORM ---------------- */
  const updateForm = (values: any) => {
    setFormData((prev: any) => ({ ...prev, ...values }));
  };

  /* ---------------- NEXT ---------------- */
  const next = async () => {
    setStepLoading(true);

    try {
      const error = validateCompanyStep(currentStep, formData, localDocs);
      if (error) return toast.error(error);

      // Upload documents on verification step
      if (currentStep === 3) {
        if (localDocs.registrationCertificate)
          await uploadDocument(
            "registrationCertificate",
            localDocs.registrationCertificate,
          );

        if (localDocs.license)
          await uploadDocument("license", localDocs.license);

        if (localDocs.ownerIdCard)
          await uploadDocument("ownerIdCard", localDocs.ownerIdCard);

        const refreshed = await getMyCompanyApplication();
        setFormData((prev: any) => ({
          ...prev,
          documents: refreshed.application.documents,
        }));
      }

      // Return from edit mode
      if (editReturnStep === 5) {
        await updateDraft({ ...formData, currentStep: 5 });
        setCurrentStep(5);
        setEditReturnStep(null);
        return;
      }

      const nextStep = currentStep + 1;
      await updateDraft({
        company: formData.company, // must be object
        documents: formData.documents,
        currentStep: nextStep,
      });

      setCurrentStep(nextStep);
    } finally {
      setStepLoading(false);
    }
  };

  /* ---------------- BACK ---------------- */
  const back = () => {
    setCurrentStep((s) => Math.max(1, s - 1));
  };

  /* ---------------- JUMP EDIT ---------------- */
  const goToStep = (step: number) => {
    setEditReturnStep(currentStep);
    setCurrentStep(step);
    updateDraft({ ...formData, currentStep: step });
  };

  /* ---------------- SUBMIT ---------------- */
  const submit = async () => {
    setSubmitLoading(true);
    try {
      await submitCompanyApplication();
      toast.success("Company application submitted");
      router.push("/company/success");
    } finally {
      setSubmitLoading(false);
    }
  };

  /* ---------------- DELETE DOC ---------------- */
  const removeDocument = async (type: string) => {
    try {
      await deleteDocument(type);
      setFormData((prev: any) => ({
        ...prev,
        documents: { ...prev.documents, [type]: null },
      }));
      setLocalDocs((prev: any) => ({ ...prev, [type]: null }));
    } catch {
      toast.error("Failed to remove document");
    }
  };

  return {
    pageLoading,
    stepLoading,
    submitLoading,
    setSubmitLoading,
    currentStep,
    formData,
    updateForm,
    next,
    back,
    submit,
    localDocs,
    setLocalDocs,
    goToStep,
    removeDocument,
  };
}
