import { useAuthStore } from "@/stores/authStore";
import Image from "next/image";
import React from "react";

export default function NoLinks() {
  const me = useAuthStore((state) => state.me);
  return (
    <div className="flex flex-col items-center justify-center">
      <Image
        src={"/no_links.jpg"}
        alt="no links"
        height={100}
        width={100}
        className="rounded-full"
      />
      <h2>
        {me?.id
          ? "Please add links to see them in action 🔥"
          : "No links present at the time 👀"}
      </h2>
    </div>
  );
}
