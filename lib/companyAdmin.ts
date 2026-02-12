import { api, apiError } from "./api"

export const getCompanyUsers = async(companyId: string) => {
    try{
        const res = await api.get(`/api/companies/${companyId}/users`);
        return res.data;
    } catch(error){
        apiError(error)
    }
}
export const createCompanyInvite = async(companyId: string) => {
    try{
        const res = await api.post(`/api/companies/${companyId}/invites`);
        return res.data;
    } catch(error){
        apiError(error)
    }
}
export const manageCompanyUser = async(companyId: string, userId: string) => {
    try{
        const res = await api.delete(`/api/companies/${companyId}/users/${userId}`);
        return res.data;
    } catch(error){
        apiError(error)
    }
}
export const updateAdminRole = async(companyId: string, userId: string) => {
    try{
        const res = await api.delete(`/api/companies/${companyId}/admins/${userId}`);
        return res.data;
    } catch(error){
        apiError(error)
    }
}