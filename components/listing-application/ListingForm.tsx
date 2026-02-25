// /components/listing-application/ListingForm.tsx
"use client";
import { useListingApplication } from "@/hooks/useListingApplication";
import { steps } from "@/config/listingStepsConfig";
import StepRenderer from "./StepRenderer";
import Loader from "../ui/Loader";
import { useConfirm } from "../confirm/ConfirmProvider";
import ProgressBar from "../agent-application/ProgressBar";
import Slide from "../agent-application/Slide";

export default function ListingForm({ listingId }: { listingId?: string }) {
  const app = useListingApplication(listingId);
  const confirm = useConfirm();

  if (app.pageLoading) return <Loader text="Loading listing application..." />;

  const safeStep = Math.min(app.currentStep, steps.length);
  const step = steps[safeStep - 1];

  if (!step) return <Loader text="Resuming your application..." />;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
      <ProgressBar total={steps.length} currentStep={app.currentStep} />
      <h1 className="text-xl font-bold mb-4">{step.title}</h1>
      <Slide>
        <StepRenderer step={step} {...app} />
      </Slide>

      <div className="flex justify-between mt-6">
        {app.currentStep > 1 ? <button onClick={app.back}>Back</button> : <div />}

        {app.currentStep < steps.length ? (
          <button onClick={app.next} disabled={app.uploading || app.stepLoading}>{app.stepLoading ? <Loader text="Saving..." /> : "Next"}</button>
        ) : (
          <button
            onClick={() =>
              confirm({
                title: "Are you sure you want to submit?",
                description: "Your listing will be submitted for review",
                confirmText: "Submit",
                variant: "info",
                onConfirm: async () => {
                  await app.submit();
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