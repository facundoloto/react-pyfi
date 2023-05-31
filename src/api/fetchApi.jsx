import axios from "axios";
const routesApi = import.meta.env.VITE_URL_API;

const api = axios.create({
  baseURL: routesApi,
});

export const getAllPost = async () => {
  const res = await api.get("/home/post/");
  return res.data;
};

export default api;