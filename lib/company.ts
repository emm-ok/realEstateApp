import { api, apiError } from "./api"


export const getMyCompany = async() => {
    try{
        const res = await api.get(`/api/companies/company`);
        return res.data;
    } catch(error){
        apiError(error);
    }
};

export const getMyCompanyAgents = async() => {
    try{
        const res = await api.get(`/api/companies/company/agents`);
        return res.data;
    } catch(error){
        apiError(error);
    }
};
