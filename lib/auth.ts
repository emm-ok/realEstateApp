import { api, apiError } from "./api";

export const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}) => {
  try {
    const res = await api.post("/api/auth/register", data);
    return res.data;
  } catch (error) {
    apiError(error);
  }
};


export const loginUser = async (data: { email: string; password: string }) => {
  try {
    const res = await api.post("/api/auth/login", data);
    return res.data;
  } catch (error) {
    apiError(error);
  }
};


export const logoutUser = async () => {
  await api.post("/api/auth/logout");
};


export const fetchMe = async () => {
  try {
    const res = await api.get("/api/auth/me");
    return res.data || null;
  } catch (error: any) {
    if (error?.response?.status === 401) {
      return null;
    }
    apiError(error);
  }
};
