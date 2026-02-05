import { ApiResponse } from "@/types/api";
import { User } from "@/types/auth";
import { api, apiError } from "./api";

export const getAllUsers = async () => {
  try {
    const res = await api.get("/api/admin/users");
    return { users: res.data.users };
  } catch (error) {
    apiError(error);
  }
};

export const getUserById = async (id: string) => {
  const res = await api.get(`api/admin/users/${id}`);
  return res.data;
};
