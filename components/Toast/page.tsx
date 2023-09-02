import { Zoom, TypeOptions, toast, cssTransition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type ToastProps = {
  message: string;
  type: TypeOptions | undefined;
};

export const ToastMessage = ({ message, type }: ToastProps) => {
  return toast(message, {
    position: "bottom-right",
    autoClose: 1500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    type: type,
    transition: Zoom,
    theme: "light",
  });
};
