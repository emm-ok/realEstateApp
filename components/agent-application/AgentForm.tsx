"use client";

import { useAgentApplication } from "@/hooks/useAgentApplication";
import ProgressBar from "./ProgressBar";
import Slide from "./Slide";
import { steps } from "@/config/stepsConfig";

export default function AgentForm() {
  const { data, step, setStep, saveDraft, loading } = useAgentApplication();

  if (loading) return <p>Loading...</p>;

  const StepComponent = steps[step - 1].component;

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <Slide>
        <ProgressBar step={step} total={steps.length} />

        <StepComponent data={data} onSave={saveDraft} />

        <div className="flex justify-between mt-6">
          {step > 1 && <button onClick={() => setStep(step - 1)}>Back</button>}
          {step < steps.length && (
            <button onClick={() => setStep(step + 1)}>Next</button>
          )}
        </div>
      </Slide>
    </div>
  );
}
