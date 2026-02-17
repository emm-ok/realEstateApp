export const validateCompanyStep = (
  step: number,
  formData: any,
  localDocs: any
) => {
  switch (step) {
    /* Step 1 – Basic company identity */
    case 1:
      if (!formData?.company?.name)
        return "Company name is required";

      if (!formData?.company?.email)
        return "Company email is required";

      if (!formData?.company?.website)
        return "Company website is required";

      if (!formData?.company?.address)
        return "Company address is required";

      return null;

    /* Step 2 – Business details */
    case 2:
      if (!formData?.company?.type)
        return "Company type is required";

      if (!formData?.company?.registrationNumber)
        return "Company registration number is required";

      if (!formData?.company?.licenseNumber)
        return "Company license number is required";

      return null;

    /* Step 3 – Legal verification */
    case 3:
      if (
        !formData.documents?.registrationCertificate?.url &&
        !localDocs.registrationCertificate
      )
        return "Registration certificate is required";

      if (
        !formData.documents?.license?.url &&
        !localDocs.license
      )
        return "Business license is required";

      if (
        !formData.documents?.ownerIdCard?.url &&
        !localDocs.ownerIdCard
      )
        return "Owner ID card is required";

      return null;

    default:
      return null;
  }
};
