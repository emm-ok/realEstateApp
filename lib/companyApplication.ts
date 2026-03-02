import { api, apiError } from "./api";

// Create new company application
export const createCompanyApplication = async () => {
  try {
    const res = await api.post("/api/company-applications");
    return res.data;
  } catch (error) {
    apiError(error);
  }
};

// Get the current user's company application
export const getMyCompanyApplication = async () => {
  try {
    const res = await api.get("/api/company-applications/me");
    return res.data.application;
  } catch (error) {
    apiError(error);
  }
};

// Update draft application
export const updateDraft = async (payload: any) => {
  try {
    const res = await api.put("/api/company-applications/me", payload);
    return res.data;
  } catch (error) {
    apiError(error);
  }
};

// Upload documents: registrationCertificate, license, ownerIdCard
export const uploadDocument = async (
  type: "registrationCertificate" | "license" | "ownerIdCard",
  file: File,
) => {
  try {
    const form = new FormData();
    form.append("file", file);

    const res = await api.post(
      `/api/company-applications/me/documents/${type}`,
      form
    );
    return res.data;
  } catch (error) {
    apiError(error);
  }
};

// Delete uploaded document
export const deleteDocument = async (type: string) => {
  try {
    const res = await api.delete(`/api/company-applications/me/documents/${type}`);
    return res.data;
  } catch (error) {
    apiError(error);
  }
};

// Submit the company application
export const submitCompanyApplication = async (
  payload?: any,
) => {
  try {
    const res = await api.post(`/api/company-applications/me/submit`, payload);
    return res.data;
  } catch (error) {
    apiError(error);
  }
};

// Archive draft
export const archiveApplication = async () => {
  try {
    const res = await api.delete(`/api/company-applications/me`);
    return res.data;
  } catch (error) {
    apiError(error);
  }
};
