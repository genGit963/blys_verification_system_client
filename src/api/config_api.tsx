import axios from "axios";

export const SERVER = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}`,
  timeout: 20000, //in 20sec timeout
});
