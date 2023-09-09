"use client";
import Button from "@/components/Button";
import { useAuthStore } from "@/stores/authStore";
import { ABSOLUTE_PATHS } from "@/utils/constants";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const me = useAuthStore((state) => state.me);

  return (
    <main className="w-[100dvw] min-h-[100dvh] bg-yellow-mango flex justify-center items-center">
      <header className="flex flex-col items-center gap-4">
        <Image src="/logo.png" width={100} height={100} alt="Logo" />
        <div className="text-center">
          <h1 className="text-5xl font-bold w-full mb-1">Connecting World</h1>
          <h2>Join the revolution</h2>
        </div>
        <div>
          <Button
            onClick={() => {
              router.push(me?.username ? me?.username : ABSOLUTE_PATHS.SIGNUP);
            }}
            customClasses="rounded-3xl px-4 py-3"
          >
            Join Now
          </Button>
        </div>
      </header>
    </main>
  );
}
