"use client";

import { useAgentApplication } from "@/hooks/useAgentApplication";
import { steps } from "@/config/stepsConfig";
import StepRenderer from "./StepRenderer";
import Loader from "../ui/Loader";
import ProgressBar from "./ProgressBar";
import { useConfirm } from "../confirm/ConfirmProvider";
import { submitApplication } from "@/lib/agentApplication";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Slide from "./Slide";

export default function AgentForm() {
  const app = useAgentApplication();
  const confirm = useConfirm();
  const router = useRouter();

  if (app.pageLoading) return <Loader text="Loading application..." />;

  const safeStep = Math.min(app.currentStep, steps.length);
  const step = steps[safeStep - 1];

  if (!step) {
    return <Loader text="Resuming your application..." />;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
      <ProgressBar currentStep={app.currentStep} />
      <h1 className="text-xl font-bold mb-4">{step.title}</h1>
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
        {app.currentStep > 1 ? (
          <button onClick={app.back}>Back</button>
        ) : (
          <div />
        )}

        {app.currentStep < steps.length ? (
          <button onClick={app.next}>
            {app.stepLoading && app.currentStep ? (
              <Loader text="Saving..." />
            ) : (
              "Next"
            )}
          </button>
        ) : (
          <button
            onClick={() =>
              confirm({
                title: "Are you sure you want to submit?",
                description: "You application will be submitted for review",
                confirmText: "Submit",
                variant: "info",
                onConfirm: async () => {
                  try {
                    await submitApplication();
                    toast("Application submitted successfully.");
                    router.push("/become-agent/success");
                  } finally {
                    app.setSubmitLoading(false);
                  }
                },
              })
            }
            className=" px-4 py-2 text-red-600 hover:bg-gray-100"
          >
            {app.submitLoading ? <Loader text="Submitting..." /> : "Submit"}
          </button>
        )}
      </div>
    </div>
  );
}
