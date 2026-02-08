import Step1 from "@/components/agent-application/steps/Step1Professional";
import Step2 from "@/components/agent-application/steps/Step2Documents";
import Step3 from "@/components/agent-application/steps/Step3Review";

export const steps = [
  { id: 1, title: "Professional", component: Step1 },
  { id: 2, title: "Documents", component: Step2 },
  { id: 3, title: "Review", component: Step3 },
];
