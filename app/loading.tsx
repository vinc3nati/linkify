import { Loader } from "@/components/Loader";

export default function Loading() {
  return (
    <div className="loading-container">
      <Loader cssClassName="w-10 h-10 border-primary border-t-[#ccc] md:h-12 md:w-12 md:border-[5px]" />
    </div>
  );
}
