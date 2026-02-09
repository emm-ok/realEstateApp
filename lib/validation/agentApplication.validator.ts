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
      // if (!formData?.professional?.specialization.length)
      //   return "Please pick at least one specialization";
      if (!formData?.professional?.companyName)
        return "Company name is required";
      if (!formData?.professional?.website)
        return "Website url is required";
      return null;

    case 3:
      if (!localDocs?.idCard)
        return "Please upload your ID card";
      if (!localDocs?.realEstateLicense)
        return "Please upload your License";
      if (!localDocs?.selfie)
        return "Please upload a selfie";
      return null;

    default:
      return null;
  }
};
