import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex justify-center items-center flex-col h-screen">
      <div className="border-2 border-primary/30 rounded px-6 py-8 flex flex-col items-center text-center select-none">
        <Image
          src="/not_found.png"
          width={100}
          height={100}
          alt="Logo"
          className="mx-auto mb-2"
        />
        <h2 className="text-2xl font-bold">
          Oops! Could not locate the profile
        </h2>
        <p className="text-sm max-w-[80%] mb-2">
          Try searching again or create an account for the same url 🙈
        </p>
        <Link href="/signup" className="border-b border-b-primary">
          Create Profile
        </Link>
      </div>
    </div>
  );
}
