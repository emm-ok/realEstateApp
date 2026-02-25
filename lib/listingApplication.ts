import { api, apiError } from "./api"

export const createListingApplication = async() => {
    try{
        const res = await api.post("/api/listing-applications");
        return res.data;
    } catch(error){
        apiError(error);
    }
}
export const getMyListingApplications = async() => {
    try{
        const res = await api.get("/api/listing-applications/me");
        return res.data;
    } catch(error){
        apiError(error);
    }
}
export const getSingleListingApplication = async(listingId: string) => {
    try{
        const res = await api.get(`/api/listing-applications/me/${listingId}`);
        return res.data;
    } catch(error){
        apiError(error);
    }
}
export const updateListingApplicationDraft = async(listingId: string, data: any) => {
    try{
        const res = await api.put(`/api/listing-applications/me/${listingId}`, data);
        return res.data;
    } catch(error){
        apiError(error);
    }
}
export const submitListingApplication = async(listingId: string) => {
    try{
        const res = await api.post(`/api/listing-applications/me/${listingId}/submit`);
        return res.data;
    } catch(error){
        apiError(error);
    }
}

export const uploadListingMedia = async (
  listingId: string,
  files: File[],
  type: "image" | "video"
) => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("files", file);
  });

  const res = await api.post(
    `/api/listing-applications/me/${listingId}/media/${type}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
};
export const deleteListingMedia = async(listingId: string, mediaId: string, type: string) => {
    try{
        const res = await api.delete(`/api/listing-applications/me/${listingId}/media/${type}/${mediaId}`);
        return res.data;
    } catch(error){
        apiError(error);
    }
}

export const deleteListingApplication = async(listingId: string) => {
    try{
        const res = await api.delete(`/api/listing-applications/me/${listingId}`);
        return res.data;
    } catch(error){
        apiError(error);
    }   
};
export const getAllListingApplications = async() => {
    try{
        const res = await api.get(`/api/listing-applications`);
        return res.data;
    } catch(error){
        apiError(error);
    }   
};
export const getListingById = async(listingId: string) => {
    try{
        const res = await api.get(`/api/listing-applications/${listingId}`);
        return res.data;
    } catch(error){
        apiError(error);
    }   
};
export const approveListing = async(listingId: string) => {
    try{
        const res = await api.patch(`/api/listing-applications/${listingId}/approve`);
        return res.data;
    } catch(error){
        apiError(error);
    }   
};
export const rejectListing = async(listingId: string) => {
    try{
        const res = await api.patch(`/api/listing-applications/${listingId}/reject`);
        return res.data;
    } catch(error){
        apiError(error);
    }   
};