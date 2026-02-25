import { api, apiError } from "./api"


export const getAllApprovedListings = async() => {
    try{
        const res = await api.get("/api/listings");
        return res.data;
    } catch(error){
        apiError(error);
    }
}
export const searchListings = async() => {
    try{
        const res = await api.get("/api/listings/search");
        return res.data;
    } catch(error){
        apiError(error);
    }
}
export const getListingById = async(listingId: string) => {
    try{
        const res = await api.get(`/api/listings/${listingId}`);
        return res.data;
    } catch(error){
        apiError(error);
    }
}
export const getMyListings = async() => {
    try{
        const res = await api.get(`/api/listings/agent/me`);
        return res.data;
    } catch(error){
        apiError(error);
    }
}
export const updateListing = async(listingId: string) => {
    try{
        const res = await api.put(`/api/listings/${listingId}`);
        return res.data;
    } catch(error){
        apiError(error);
    }
}
export const deleteListing = async(listingId: string) => {
    try{
        const res = await api.delete(`/api/listings/${listingId}`);
        return res.data;
    } catch(error){
        apiError(error);
    }
}
export const getAllListingsForAdmin = async() => {
    try{
        const res = await api.get(`/api/listings/admin/all`);
        return res.data;
    } catch(error){
        apiError(error);
    }
}
export const featureListing = async(listingId: string) => {
    try{
        const res = await api.patch(`/api/listings/${listingId}/feature`);
        return res.data;
    } catch(error){
        apiError(error);
    }
}