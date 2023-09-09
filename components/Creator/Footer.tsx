import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <footer className="w-full flex flex-col justify-center items-center gap-1 mt-auto pb-[4.5rem] md:pb-2">
      <p className="text-primary/90 font-bold text-xl">
        <Link href={"/"}>Linkify</Link>
      </p>
      <p>
        Made with ❤️ by{" "}
        <Link
          className="underline text-primary"
          href={"https://www.vinitkanse.com/"}
          target="_blank"
        >
          Vinit Kanse
        </Link>
      </p>
    </footer>
  );
}

export default Footer;
