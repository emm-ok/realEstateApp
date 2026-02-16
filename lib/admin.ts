import { api, apiError } from "./api";

export const getAllUsers = async () => {
  try {
    const res = await api.get("/api/users");
    return { users: res.data.users };
  } catch (error) {
    apiError(error);
  }
};

export const getUserById = async (id: string) => {
  try {
    const res = await api.get(`api/users/${id}`);
    return res.data;
  } catch (error) {
    apiError(error);
  }
};

export const updateUserById = async (id: string) => {
  try {
    const res = await api.put(`/api/users/${id}`);
    return res.data;
  } catch (error) {
    apiError(error);
  }
};

export const suspendUserById = async (id: string) => {
  try {
    const res = await api.patch(`/api/users/${id}/suspend`);
    return res.data;
  } catch (error) {
    apiError(error);
  }
};

export const getAllCompanies = async () => {
  try {
    const res = await api.get(`/api/companies`);
    return res.data;
  } catch (error) {
    apiError(error);
  }
};

export const getCompany = async (id: string) => {
  try {
    const res = await api.get(`/api/companies/${id}`);
    return res.data;
  } catch (error) {
    apiError(error);
  }
};

export const suspendCompany = async (id: string) => {
  try {
    const res = await api.patch(`/api/companies/${id}/suspend`);
    return res.data;
  } catch (error) {
    apiError(error);
  }
};

export const verifyCompany = async (id: string) => {
  try {
    const res = await api.patch(`/api/companies/${id}/verify`);
    return res.data;
  } catch (error) {
    apiError(error);
  }
};
