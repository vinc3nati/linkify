import useOnClickOutside from "@/hooks/useOnClickOutside";
import { useRef } from "react";
import { twMerge } from "tailwind-merge";
import Button from "../Button";

type ModalWrapperProps = {
  showModal: boolean;
  children: React.ReactNode;
  toggleShowModal: (args?: any) => void;
  showClose?: boolean;
  customStyles?: string;
};

function ModalWrapper({
  showModal,
  toggleShowModal,
  showClose = true,
  children,
  customStyles,
}: ModalWrapperProps) {
  const modalRef = useRef<any>();

  useOnClickOutside(modalRef, toggleShowModal);

  if (!showModal) return;

  return (
    <div className="h-screen w-screen flex fixed bottom-0 left-0 justify-end items-end md:inset-0 md:justify-center md:items-center bg-black/30 z-10 md:px-2">
      <div
        ref={modalRef}
        className="max-w-md w-full max-h-[70dvh] relative px-4 py-5 rounded-md rounded-b-none md:rounded bg-secondary transition-all  animate-zoom md:animate-popup"
      >
        {showClose && (
          <Button
            customClasses="text-sm absolute top-5 right-5 bg-transparent p-0 text-black"
            onClick={toggleShowModal}
          >
            &#x2715;
          </Button>
        )}
        {children}
      </div>
    </div>
  );
}

export default ModalWrapper;
