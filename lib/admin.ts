import { ApiResponse } from "@/types/api"
import { User } from "@/types/auth"
import { api } from "./api"


export const getAllUsers = async(): Promise<ApiResponse<User[]>> => {
    const res = await api.get("/api/admin");
    return { users: res.data.users };
};


export const getUserById = async(id: string) => {
    const res = await api.get(`api/admin/${id}`);
    return res.data;
}
