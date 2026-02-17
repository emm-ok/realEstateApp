import StepBranding from "@/components/company-application/steps/StepBranding";
import StepBusinessDetails from "@/components/company-application/steps/StepBusinessDetails";
import StepCompanyInfo from "@/components/company-application/steps/StepCompanyInfo";
import StepReview from "@/components/company-application/steps/StepReview";
import StepVerification from "@/components/company-application/steps/StepVerification";

export const steps = [
  { title: "Company Info", component: StepCompanyInfo },
  { title: "Business Details", component: StepBusinessDetails },
  { title: "Verification", component: StepVerification },
  { title: "Branding", component: StepBranding },
  { title: "Review", component: StepReview },
];
