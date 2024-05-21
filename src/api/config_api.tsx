import axios from "axios";

export const SERVER = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}`,
  timeout: 10000, //in 10sec
});
