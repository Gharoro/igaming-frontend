/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { API_BASE_URL } from "../config/env";
import { useAppStore } from "../store/useAppStore";
import { callRefreshToken } from "./auth";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const handleTokenRefresh = async (originalRequest: any) => {
  try {
    const { data } = await callRefreshToken();

    if (data?.accessToken) {
      useAppStore.getState().setAccessToken(data.accessToken);
      originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
    }

    return axiosInstance(originalRequest); // Retry the original request
  } catch (refreshError) {
    useAppStore.getState().clearAuth();
    window.location.href = "/login";
    return Promise.reject(refreshError);
  }
};

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

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { data } = await handleTokenRefresh(originalRequest);

        if (data?.accessToken)
          useAppStore.getState().setAccessToken(data.accessToken);

        originalRequest.headers.Authorization = `Bearer ${data?.accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        useAppStore.getState().clearAuth();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
