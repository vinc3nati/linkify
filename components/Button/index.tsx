import { twMerge } from "tailwind-merge";
import { Loader } from "../Loader";
import { ButtonHTMLAttributes } from "react";

type ButtonProps = {
  customClasses?: string;
  children: React.ReactNode;
  onClick?: () => void;
  isLoading?: boolean;
  loader?: React.ReactElement;
  extraProps?: any;
};

function Button(props: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  const {
    children,
    onClick,
    isLoading = false,
    loader,
    customClasses,
    ...extraProps
  } = props;

  const CustomLoader = () => {
    return loader ? (
      loader
    ) : (
      <Loader cssClassName={"m-[0 1rem] border-t-[#f4faff]"} />
    );
  };

  return (
    <button
      onClick={onClick}
      className={twMerge(
        "select-none px-2 py-3 bg-primary text-white rounded flex gap-1 uppercase tracking-wide items-center justify-center transition-all",
        customClasses
      )}
      {...extraProps}
    >
      {!isLoading ? children : <CustomLoader />}
    </button>
  );
}

export default Button;
