import axios from "axios";
import { API_BASE_URL } from "../config/env";
import { useAppStore } from "../store/useAppStore";
import { callRefreshToken } from "./auth";
import { REFRESH_TOKEN } from "../utils/constants";

export const axiosBase = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Request Interceptor: Attach Access Token
axiosInstance.interceptors.request.use(
  (config) => {
    const { accessToken } = useAppStore.getState();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle Token Refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== REFRESH_TOKEN
    ) {
      originalRequest._retry = true;

      try {
        const { data } = await callRefreshToken();

        if (data?.accessToken) {
          useAppStore.getState().setAccessToken(data.accessToken);

          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

          return axiosInstance(originalRequest);
        } else {
          throw new Error("No access token received");
        }
      } catch (refreshError) {
        // Handle refresh failure - clear auth and redirect to login
        useAppStore.getState().clearAuth();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
