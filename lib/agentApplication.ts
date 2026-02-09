import { api, apiError } from "./api";

export const createApplication = async () => {
  try {
    const res = await api.post("/api/agent-applications");
    return res.data;
  } catch (error) {
    apiError(error);
  }
};

export const getMyApplication = async () => {
  try {
    const res = await api.get("/api/agent-applications/me");
    return res.data;
  } catch (error) {
    apiError(error);
  }
};

export const updateDraft = async (payload: any) => {
  try {
    const res = await api.put("/api/agent-applications/me", payload);
    return res.data;
  } catch (error) {
    apiError(error);
  }
};

export const uploadDocument = async (
  type: "idCard" | "realEstateLicense" | "selfie",
  file: File,
) => {
  try {
    const form = new FormData();
    form.append("file", file);

    const res = await api.post(
      `/api/agent-applications/me/documents/${type}`,
      form,
    );
    return res.data;
  } catch (error) {
    apiError(error);
  }
};

export const deleteDocument = async (type: string) => {
  try {
    const res = await api.delete(
      `/api/agent-applications/me/documents/${type}`,
    );
    return res.data;
  } catch (error) {
    apiError(error);
  }
};

export const submitApplication = async () => {
  try {
    const res = await api.post(`/api/agent-applications/me/submit`);
    return res.data;
  } catch (error) {
    apiError(error);
  }
};

export const archiveApplication = async () => {
  try {
    const res = await api.delete(`/api/agent-applications/me`);
    return res.data;
  } catch (error) {
    apiError(error);
  }
};
