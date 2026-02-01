import { api, apiError } from "./api";

export const getCurrentUser = async () => {
  const res = await api.get("/api/users/me");
  return res.data.user;
};

export const updateCurrentUser = async (
  data: {
    name: string;
    phone?: string;
    location?: string;
    bio?: string;
    image?: string;
  },
) => {
  try {
    const res = await api.patch(`/api/users/me`, data);
    return res.data;
  } catch (error) {
    apiError(error);
  }
};
