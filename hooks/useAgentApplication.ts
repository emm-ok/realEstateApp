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
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<any>(null);
  const [localDocs, setLocalDocs] = useState<any>({});
  const router = useRouter();

  useEffect(() => {
    api
      .get("/api/agent-applications/me")
      .then((res) => {
        const data = res.data;
        setFormData({
          professional: {
            ...data.professional,
            specialization: data.professional?.specialization || [],
          },
          documents: data.documents || {},
        });
        setCurrentStep(data.currentStep || 1);
      })
      .finally(() => setLoading(false));
  }, []);

  const updateForm = (values: any) => {
    setFormData((prev: any) => ({ ...prev, ...values }));
  };

  const next = async () => {
    const error = validateStep(currentStep, formData, localDocs);

    if (error) {
      toast.error(error);
      return;
    }
    await updateDraft({ ...formData, currentStep });

    if (currentStep === 3) {
      if (localDocs.idCard) await uploadDocument("idCard", localDocs.idCard);
      if (localDocs.realEstateLicense)
        await uploadDocument("realEstateLicense", localDocs.realEstateLicense);
      if (localDocs.selfie) await uploadDocument("selfie", localDocs.selfie);
    }

    setCurrentStep((s) => s + 1);
  };

  const back = () => {
    if (currentStep > 1) setCurrentStep((s) => s - 1);
  };

  const submit = async () => {
    await submitApplication();
    toast("application submitted successfully.");
    setTimeout(() => {
      toast("An email will be sent to you when reivewed");
    }, 3000);

    router.push("/account/become-agent");
  };

  return {
    loading,
    currentStep,
    formData,
    updateForm,
    next,
    back,
    submit,
    localDocs,
    setLocalDocs,
  };
}
