import { api, apiError } from "./api";

export const getMyBookmarks = async (page = 1, limit = 10) => {
  try {
    const res = await api.get(`/api/bookmarks?page=${page}&limit=${limit}`);
    return res.data;
  } catch (error) {
    apiError(error);
  }
};

export const createBookmark = async (listingId: string) => {
  try {
    const res = await api.post("/api/bookmarks", { listingId });
    return res.data;
  } catch (error) {
    apiError(error);
  }
};

export const deleteBookmark = async (listingId: string) => {
  try {
    const res = await api.delete(`/api/bookmarks/listing/${listingId}`);
    return res.data;
  } catch (error) {
    apiError(error);
  }
};