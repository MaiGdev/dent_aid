import axios from "axios";
import { getEnvs } from "../helpers/getEnvs";


const { API_BASE_URL } = getEnvs();

export const dentaidApi = axios.create({
  baseURL: API_BASE_URL,
});

dentaidApi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    "x-token": localStorage.getItem("token"),
  };

  return config;
});
