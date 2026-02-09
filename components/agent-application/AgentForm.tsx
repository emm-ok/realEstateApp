"use client";

import { useAgentApplication } from "@/hooks/useAgentApplication";
import { steps } from "@/config/stepsConfig";
import StepRenderer from "./StepRenderer";
import Loader from "../ui/Loader";

export default function AgentForm() {
  const app = useAgentApplication();

  if (app.loading) return <Loader text="Loading application..." />;

  const step = steps[app.currentStep - 1];

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-xl font-bold mb-4">{step.title}</h1>

      <StepRenderer
        step={step}
        formData={app.formData}
        updateForm={app.updateForm}
        localDocs={app.localDocs}
        setLocalDocs={app.setLocalDocs}
        loading={app.loading}
      />

      <div className="flex justify-between mt-6">
        {app.currentStep > 1 && (
          <button onClick={app.back}>Back</button>
        )}

        {app.currentStep < steps.length ? (
          <button onClick={app.next}>Next</button>
        ) : (
          <button onClick={app.submit}>Submit</button>
        )}
      </div>
    </div>
  );
}
