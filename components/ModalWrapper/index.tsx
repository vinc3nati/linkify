import useOnClickOutside from "@/hooks/useOnClickOutside";
import { useRef } from "react";
import Button from "../Button";

type ModalWrapperProps = {
  showModal: boolean;
  children: React.ReactNode;
  toggleShowModal: (args?: any) => void;
};

function ModalWrapper(props: ModalWrapperProps) {
  const modalRef = useRef<any>();

  useOnClickOutside(modalRef, props.toggleShowModal);

  if (!props.showModal) return;

  return (
    <div className="fixed inset-0 h-screen w-screen flex justify-center items-center bg-black/30 z-10">
      <div
        ref={modalRef}
        className="max-w-md w-full max-h-[70dvh] relative px-4 py-5 rounded bg-secondary transition-all animate-zoom"
      >
        <Button
          customClasses="text-sm absolute top-5 right-5 bg-transparent p-0 text-black"
          onClick={props.toggleShowModal}
        >
          &#x2715;
        </Button>
        {props.children}
      </div>
    </div>
  );
}

export default ModalWrapper;
