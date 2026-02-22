// /config/listingStepsConfig.ts
import StepBasicInfo from "@/components/listing-application/steps/Step1BasicInfo";
import StepPricing from "@/components/listing-application/steps/Step2Pricing";
import StepPropertyDetails from "@/components/listing-application/steps/Step3PropertyDetails";
import StepLocation from "@/components/listing-application/steps/Step4Location";
import StepMedia from "@/components/listing-application/steps/Step5Media";
import StepReview from "@/components/listing-application/steps/Step6Review";

export const steps = [
  {
    id: 1,
    title: "Basic Info",
    component: StepBasicInfo,
    fields: ["title", "description"]
  },
  {
    id: 2,
    title: "Pricing & Classification",
    component: StepPricing,
    fields: ["price", "currency", "rentalFrequency", "type", "listingType", "condition"]
  },
  {
    id: 3,
    title: "Property Details",
    component: StepPropertyDetails,
    fields: ["bedrooms", "bathrooms", "parkingSpaces", "areaSize", "areaUnit", "lotSize", "yearBuilt", "furnishing", "amenities"]
  },
  {
    id: 4,
    title: "Location",
    component: StepLocation,
    fields: ["location"]
  },
  {
    id: 5,
    title: "Media",
    component: StepMedia,
    fields: ["images", "videos"]
  },
  {
    id: 6,
    title: "Review & Submit",
    component: StepReview,
  }
];