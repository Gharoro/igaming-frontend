import { toast } from "react-hot-toast";

export const showSuccess = (message: string) => {
  return toast.success(message, {
    duration: 5000,
    position: "top-center",
  });
};

export const showError = (message: string) => {
  return toast.error(message, {
    duration: 5000,
    position: "top-center",
  });
};
