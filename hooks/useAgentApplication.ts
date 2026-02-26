import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import {
  uploadDocument,
  updateDraft,
  submitApplication,
} from "@/lib/agentApplication";
import { validateStep } from "@/lib/validation/agentApplication.validator";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function useAgentApplication() {
  const [pageLoading, setPageLoading] = useState(true);
  const [stepLoading, setStepLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<any>(null);
  const [localDocs, setLocalDocs] = useState<any>({});
  const [editReturnStep, setEditReturnStep] = useState<number | null>(null);

  const router = useRouter();

  useEffect(() => {
    api
      .get("/api/agent-applications/me")
      .then((res) => {
        const data = res.data.application;
        setFormData({
          professional: {
            ...data.professional,
            specialization: data.professional?.specialization || [],
          },
          documents: data.documents || {},
        });
        setCurrentStep(data.currentStep || 1);
      })
      .finally(() => setPageLoading(false));
  }, []);

  const updateForm = (values: any) => {
    setFormData((prev: any) => ({ ...prev, ...values }));
  };

  // ---------------- NEXT ----------------
  const next = async () => {
    setStepLoading(true);

    try {
      const error = validateStep(currentStep, formData, localDocs);
      if (error) return toast.error(error);

      if (currentStep === 3) {
        if (localDocs.idCard) await uploadDocument("idCard", localDocs.idCard);
        if (localDocs.realEstateLicense)
          await uploadDocument(
            "realEstateLicense",
            localDocs.realEstateLicense,
          );
        if (localDocs.selfie) await uploadDocument("selfie", localDocs.selfie);

        const refreshed = await api.get("/api/agent-applications/me");
        setFormData((prev) => ({
          ...prev,
          documents: refreshed.data.application.documents,
        }));
      }

      if (editReturnStep === 4) {
        await updateDraft({ ...formData, currentStep: 4 });
        setCurrentStep(4);
        setEditReturnStep(null);
        return;
      }

      const nextStep = currentStep + 1;
      await updateDraft({ ...formData, currentStep: nextStep });
      setCurrentStep(nextStep);
    } finally {
      setStepLoading(false);
    }
  };

  const back = () => {
    setCurrentStep((s) => Math.max(1, s - 1));
  };

  const goToStep = (step: number) => {
    setEditReturnStep(currentStep);
    setCurrentStep(step);
    updateDraft({ ...formData, currentStep: step });
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
    // submit,
    localDocs,
    setLocalDocs,
    goToStep,
  };
}

