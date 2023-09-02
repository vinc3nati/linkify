import { twMerge } from "tailwind-merge";

type LoaderProps = {
  cssClassName?: string;
  style?: React.CSSProperties;
};

export function Loader({ cssClassName, style }: LoaderProps) {
  return (
    <div
      className={twMerge(
        "animate-spin w-8 h-8 rounded-full border-[4px] border-[#ccc] border-t-black",
        cssClassName
      )}
      style={style}
    ></div>
  );
}
