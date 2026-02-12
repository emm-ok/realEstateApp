import { api, apiError } from "./api"


export const getCompany = async(companyId: string) => {
    try{
        const res = await api.get(`/api/company/${companyId}`);
        return res.data;
    } catch(error){
        apiError(error);
    }
};

export const updateCompany = async(companyId: string) => {
    try{
        const res = await api.put(`/api/company/${companyId}`);
        return res.data;
    } catch(error){
        apiError(error);
    }
};

export const deleteCompany = async(companyId: string) => {
    try{
        const res = await api.delete(`/api/company/${companyId}`);
        return res.data;
    } catch(error){
        apiError(error);
    }
};