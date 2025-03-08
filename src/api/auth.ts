/* eslint-disable no-useless-catch */
import axiosInstance, { axiosBase } from "./axiosInstance";
import { handleApiError } from "../utils/apiError";
import { LOGIN, LOGOUT, REFRESH_TOKEN, REGISTER } from "../utils/constants";
import {
  DefaultApiResponse,
  LoginResponse,
  RefreshTokenResponse,
  RegisterResponse,
} from "../interfaces/interface";

// Register user
export const registerUser = async (
  username: string
): Promise<RegisterResponse> => {
  try {
    const { data } = await axiosInstance.post<RegisterResponse>(REGISTER, {
      username,
    });
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Login user
export const loginUser = async (username: string): Promise<LoginResponse> => {
  try {
    const { data } = await axiosInstance.post<LoginResponse>(LOGIN, {
      username,
    });
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Refresh token
export const callRefreshToken = async (): Promise<RefreshTokenResponse> => {
  try {
    const { data } = await axiosBase.post<RefreshTokenResponse>(REFRESH_TOKEN);
    return data;
  } catch (error) {
    throw error;
  }
};

// Logout
export const logout = async (): Promise<DefaultApiResponse> => {
  try {
    const { data } = await axiosInstance.post<DefaultApiResponse>(LOGOUT);
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
