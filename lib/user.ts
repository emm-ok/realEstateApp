import { api, apiError } from "./api";

export const getCurrentUser = async () => {
  const res = await api.get("/api/users/me");
  return res.data.user;
};

export const updateUserById = async (
  id: string,
  data: {
    name: string;
    phone?: string;
    location?: string;
    bio?: string;
    image?: string;
  },
) => {
  try {
    const res = await api.patch(`/api/users/${id}`, data);
    return res.data;
  } catch (error) {
    apiError(error);
  }
};
