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

export const suspendUserById = async (id: string, suspend: boolean) => {
  try {
    const res = await api.patch(`/api/users/${id}/suspend`, { suspend });
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



export const getAllAgents = async() => {
  try{
    const res = await api.get(`/api/agents`);
    return res.data;
  } catch(error){
    apiError(error)
  }
}
export const getAgentApplications = async() => {
  try{
    const res = await api.get(`/api/agent-applications`);
    return res.data.applications;
  } catch(error){
    apiError(error);
    return [];
  }
}

export const getAgentApplicationById = async(agentId: string) => {
  try{
    const res = await api.get(`/api/agent-applications/${agentId}`);
    return res.data;
  } catch(error){
    apiError(error)
  }
}

export const suspendAgent = async(agentId: string) => {
  try{
    const res = await api.patch(`/api/agents/${agentId}/suspend`);
    return res.data;
  } catch(error){
    apiError(error)
  }
}

export const approveAgentApplication = async (applicationId: string) => {
  try {
    const res = await api.patch(
      `/api/agent-applications/${applicationId}/approve`
    );
    return res.data;
  } catch (error) {
    apiError(error);
  }
};

export const rejectAgentApplication = async (applicationId: string, reason: string) => {
  try {
    const res = await api.patch(
      `/api/agent-applications/${applicationId}/reject`,
      { reason }
    );
    return res.data;
  } catch (error) {
    apiError(error);
  }
};


export const getCompanyApplications = async() => {
  try{
    const res = await api.get(`/api/company-applications`);
    return res.data.applications;
  } catch(error){
    apiError(error);
    return [];
  }
}

export const getCompanyApplicationById = async(companyApplicationId: string) => {
  try{
    const res = await api.get(`/api/company-applications/${companyApplicationId}`);
    return res.data;
  } catch(error){
    apiError(error)
  }
}

export const approveCompanyApplication = async (applicationId: string) => {
  try {
    const res = await api.patch(
      `/api/company-applications/${applicationId}/approve`
    );
    return res.data;
  } catch (error) {
    apiError(error);
  }
};

export const rejectCompanyApplication = async (applicationId: string, reason: string) => {
  try {
    const res = await api.patch(
      `/api/agent-applications/${applicationId}/reject`,
      { reason }
    );
    return res.data;
  } catch (error) {
    apiError(error);
  }
};