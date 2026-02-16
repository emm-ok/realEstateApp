export const validateStep = (step: number, formData: any, localDocs: any) => {
  switch (step) {
    case 1:
      if (!formData?.professional?.licenseNumber)
        return "License number is required";
      if (!formData?.professional?.licenseCountry)
        return "License country is required";
      if (!formData?.professional?.yearsExperience)
        return "Years of experience is required";
      return null;

    case 2:
      if (
        !Array.isArray(formData?.professional?.specialization) ||
        formData.professional.specialization.length === 0
      ) {
       return `Select at least 1 specialization (${formData.professional.specialization.length} selected)`;
      }
      if (!formData?.professional?.companyName)
        return "Company name is required";
      if (!formData?.professional?.website) return "Website url is required";
      return null;

    case 3:
      if (!formData.documents.idCard?.url && !localDocs.idCard)
        return "ID Card is required";

      if (
        !formData.documents.realEstateLicense?.url &&
        !localDocs.realEstateLicense
      )
        return "Real estate license is required";

      if (!formData.documents.selfie?.url && !localDocs.selfie)
        return "Selfie is required";

      return null;

    default:
      return null;
  }
};
