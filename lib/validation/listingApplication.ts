// /lib/validation/listingApplication.ts
export function validateListingStep(step: number, data: any, localMedia: any) {
  if (!data) return "Listing data not loaded";

  switch (step) {
    // STEP 1: BASIC INFO
    case 1:
      if (!data.title?.trim()) return "Title is required";
      if (!data.description?.trim()) return "Description is required";
      return null;

    // STEP 2: PRICING & CLASSIFICATION
    case 2:
      if (!data.price || data.price <= 0) return "Valid price is required";
      if (!data.type) return "Property type is required";
      if (!data.listingType) return "Listing type is required";
      if (data.listingType === "for_rent" && !data.rentalFrequency) {
        return "Rental frequency is required for rental listings";
      }
      return null;

    // STEP 3: PROPERTY DETAILS
    case 3:
      if (data.bedrooms === undefined || data.bedrooms < 0) return "Number of bedrooms is required";
      if (data.bathrooms === undefined || data.bathrooms < 0) return "Number of bathrooms is required";
      if (!data.areaSize || data.areaSize <= 0) return "Area size is required";
      if (!data.areaUnit) return "Area unit is required";
      return null;

    // STEP 4: LOCATION
    case 4:
      if (!data.location?.address) return "Address is required";
      if (!data.location?.city) return "City is required";
      if (!data.location?.state) return "State is required";
      if (!data.location?.country) return "Country is required";
      return null;

    // STEP 5: MEDIA
    case 5:
      // Images are required
      const hasImages = (data.images?.length || 0) + (localMedia.images?.length || 0) > 0;
      if (!hasImages) return "At least one image is required";
      return null;

    default:
      return null;
  }
}