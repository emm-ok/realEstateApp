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
  try {
    const res = await api.get(`api/admin/users/${id}`);
    return res.data;
  } catch (error) {
    apiError(error);
  }
};

export const updateUserById = async (id: string) => {
  try {
    const res = await api.put(`/api/admin/users/${id}`);
    return res.data;
  } catch (error) {
    apiError(error);
  }
};

export const suspendUserById = async (id: string) => {
  try {
    const res = await api.patch(`/api/admin/users/${id}/suspend`);
    return res.data;
  } catch (error) {
    apiError(error);
  }
};

export const getAllCompanies = async () => {
  try {
    const res = await api.get(`/api/admin/companies`);
    return res.data;
  } catch (error) {
    apiError(error);
  }
};

export const getCompany = async (id: string) => {
  try {
    const res = await api.get(`/api/admin/companies/${id}`);
    return res.data;
  } catch (error) {
    apiError(error);
  }
};

export const suspendCompany = async (id: string) => {
  try {
    const res = await api.patch(`/api/admin/companies/${id}/suspend`);
    return res.data;
  } catch (error) {
    apiError(error);
  }
};

export const verifyCompany = async (id: string) => {
  try {
    const res = await api.patch(`/api/admin/companies/${id}/verify`);
    return res.data;
  } catch (error) {
    apiError(error);
  }
};
