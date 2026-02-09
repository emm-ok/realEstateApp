import StepProfessional from "@/components/agent-application/steps/Step1Professional";
import StepSpecialization from "@/components/agent-application/steps/Step2Specialization";
import StepDocuments from "@/components/agent-application/steps/Step3Documents";
import StepReview from "@/components/agent-application/steps/Step4Review";

export const steps = [
  { id: 1, title: "Professional", component: StepProfessional },
  { id: 2, title: "Specialization", component: StepSpecialization },
  { id: 3, title: "Documents", component: StepDocuments },
  { id: 4, title: "Review", component: StepReview },
];
