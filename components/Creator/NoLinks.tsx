import Image from "next/image";
import React from "react";

export default function NoLinks() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Image
        src={"/no_links.jpg"}
        alt="no links"
        height={100}
        width={100}
        className="rounded-full"
      />
      <h2>Please add links to see them in action 🔥</h2>
    </div>
  );
}
