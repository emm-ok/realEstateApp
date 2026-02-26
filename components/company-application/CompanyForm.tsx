"use client";

import { useCompanyApplication } from "@/hooks/useCompanyApplication";
import Loader from "../ui/Loader";
import { useConfirm } from "../confirm/ConfirmProvider";
import { submitCompanyApplication } from "@/lib/companyApplication";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { steps } from "@/config/companyStepsConfig";
import Stepper from "./Stepper";
import Slide from "../agent-application/Slide";
import StepRenderer from "./StepRenderer";
import ProgressBar from "../agent-application/ProgressBar";

export default function CompanyForm() {
  const app = useCompanyApplication();
  const confirm = useConfirm();
  const router = useRouter();

  if (app.pageLoading) return <Loader text="Loading application..." />;

  const safeStep = Math.min(app.currentStep, steps.length);
  const step = steps[safeStep - 1];

  if (!step) return <Loader text="Resuming your application..." />;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-xl font-bold mb-4">{step.title}</h1>
      <Stepper step={app.currentStep} />
      <ProgressBar total={steps.length} currentStep={app.currentStep} />


      <Slide>
        <StepRenderer
          step={step}
          formData={app.formData}
          updateForm={app.updateForm}
          localDocs={app.localDocs}
          setLocalDocs={app.setLocalDocs}
          loading={app.pageLoading}
          goToStep={app.goToStep}
        />
      </Slide>

      <div className="flex justify-between mt-6">
        {app.currentStep > 1 ? <button onClick={app.back}>Back</button> : <div />}
        {app.currentStep < steps.length ? (
          <button onClick={app.next}>
            {app.stepLoading ? <Loader text="Saving..." /> : "Next"}
          </button>
        ) : (
          <button
            onClick={() =>
              confirm({
                title: "Are you sure you want to submit?",
                description: "Your application will be submitted for review",
                confirmText: "Submit",
                variant: "info",
                onConfirm: async () => {
                  try {
                    await submitCompanyApplication(app.formData);
                    toast.success("Application submitted successfully.");
                    router.push("/company-application/success");
                  } finally {
                    app.setSubmitLoading(false);
                  }
                },
              })
            }
            className="px-4 py-2 text-red-600 hover:bg-gray-100"
          >
            {app.submitLoading ? <Loader text="Submitting..." /> : "Submit"}
          </button>
        )}
      </div>
    </div>
  );
}
