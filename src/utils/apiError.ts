import { AxiosError } from "axios";
import { showError } from "./responses";

export const handleApiError = (error: unknown) => {
  const errorMessage =
    error instanceof AxiosError
      ? error.response?.data?.message || "Something went wrong!"
      : error instanceof Error
      ? error.message
      : "An unexpected error occurred. Please try again.";

  showError(errorMessage);
  throw new Error(errorMessage);
};
