import { useAuthStore } from "@/stores/authStore";
import Image from "next/image";
import React from "react";

export default function NoLinks({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <Image
        src={"/no_links.jpeg"}
        alt="no links"
        height={100}
        width={100}
        className="rounded-full"
      />
      <h2>
        {isLoggedIn
          ? "Please add links to see them in action 🔥"
          : "No links present at the time 👀"}
      </h2>
    </div>
  );
}
