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
    <main className="w-[100dvw] min-h-[100dvh] flex justify-center items-center bg-yellow-mango bg-cover bg-no-repeat">
      <header className="flex flex-col items-center gap-4">
        <Image src="/logo.png" width={100} height={100} alt="Logo" />
        <div className="text-center">
          <h1 className="text-5xl font-bold w-full mb-1 drop-shadow-xl text-white">
            Connecting World
          </h1>
          <h2 className="text-white/80">Join the revolution</h2>
        </div>
        <div className="z-10">
          <Button
            onClick={() => {
              router.push(me?.username ? me?.username : ABSOLUTE_PATHS.SIGNUP);
            }}
            customClasses="rounded-[999px] font-bold px-5 py-4 relative after:content-[''] after:absolute after:bg-secondary after:w-full after:h-full after:inset-0 after:top-1 after:left-1 after:-bottom-1 after:rounded-[inherit] after:-z-10 active:after:top-0.5 active:after:-bottom-0.5 active:after:left-0.5 hover:after:top-0.5 hover:after:-bottom-0.5 hover:after:left-0.5 transition-all after:transition-all after:shadow-md hover:after:shadow-sm"
          >
            Join Now
          </Button>
        </div>
      </header>
    </main>
  );
}
