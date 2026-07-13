import axios from "axios";

const API = "https://nexus-production-121c.up.railway.app/api/documents";

export const getDocuments = async () => {
  const res = await axios.get(API);
  return res.data;
};

export const deleteDocument = async (id: string) => {
  await axios.delete(`${API}/${id}`);
};

export const uploadDocument = async (
  file: File,
  userId: string
) => {
  const formData = new FormData();

  formData.append("document", file);
  formData.append("userId", userId);

  
  const res = await axios.post(`${API}/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
export const signDocument = async (
  id: string,
  signatureImage: string,
  userId: string
) => {
  const res = await axios.post(`${API}/${id}/sign`, {
    signatureImage,
    userId,
  });

  return res.data;
};