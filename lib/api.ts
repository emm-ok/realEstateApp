import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    // headers: {
    //     "Content-Type": "application/json",
    // }
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if(token) config.headers.Authorization = `Bearer ${token}`;
    return config;
})


const apiError = (error: unknown): never => {
    if(axios.isAxiosError(error)){
        const message = 
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Something went wrong"
        
        throw new Error(message);
    }
    
    throw new Error("Unexpected error occured");
};

export {api, apiError};