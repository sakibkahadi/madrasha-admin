/* eslint-disable react-hooks/rules-of-hooks */
import { BASE_URL } from "@/constants/ApiEndPoints";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getSession } from "next-auth/react";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(async (config) => {
  const session = await getSession();
  const token = session?.accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

class APIClient {
  getAll = (endpoint, options) =>
    axiosInstance.get(endpoint, options).then((res) => res.data);

  post = (endpoint, options) =>
    axiosInstance.post(endpoint, options).then((res) => res.data);

  getQuery = (key) =>
    useQuery({
      queryKey: [key],
      queryFn: () => this.getAll(key),
      staleTime: 24 * 60 * 60 * 1000,
    });
}

export default APIClient;
export { axiosInstance };
