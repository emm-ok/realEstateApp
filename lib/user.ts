import { api, apiError } from "./api";

export const getCurrentUser = async () => {
  try {
    const res = await api.get("/api/users/me");
    return res.data.user;
  } catch (error) {
    apiError(error);
  }
};

export const updateCurrentUser = async (data: {
  name: string;
  phone?: string;
  location?: string;
  bio?: string;
  image?: string;
}) => {
  try {
    const res = await api.patch(`/api/users/me`, data);
    return res.data;
  } catch (error) {
    apiError(error);
  }
};

export const changePassword = async (data: {
  currentPassword: string
  newPassword: string
}) => {
  try {
    const res = await api.put(`/api/users/me/change-password`, data);
    return res.data;
  } catch (error) {
    apiError(error);
  }
};


