"use client";
import { getLocalStorage, setLocalStorage } from "@/utils/storageHelper";
import { useState, useEffect } from "react";
import Link from "next/link";
import { LINKIFY_COOKIE } from "@/utils/constants";
import ModalWrapper from "../ModalWrapper";
import Button from "../Button";

export default function CookieBanner() {
  const [cookieConsent, setCookieConsent] = useState(() =>
    getLocalStorage(LINKIFY_COOKIE, null)
  );

  const acceptCookie = () => {
    setCookieConsent(true);
    //@ts-ignore
    window.gtag("consent", "update", {
      analytics_storage: "granted",
    });
    setLocalStorage(LINKIFY_COOKIE, "true");
  };

  useEffect(() => {
    const storedCookieConsent = getLocalStorage(LINKIFY_COOKIE, null);

    setCookieConsent(storedCookieConsent);
  }, []);

  if (cookieConsent !== null) return <></>;

  return (
    <div
      className={`my-10 mx-auto max-w-max md:max-w-[500px]
      fixed bottom-0 left-0 right-0 
      flex px-3 md:px-6 py-3 justify-between items-center sm:flex-row gap-4  
       bg-secondary rounded-lg shadow-md`}
    >
      <div className="text-center">
        <Link href="/cookies">
          <p>
            We use <span className="font-bold text-primary">cookies</span> on
            our site.
          </p>
        </Link>
      </div>

      <div className="flex gap-2">
        <Button
          customClasses="text-sm px-5 py-2 text-white rounded-lg"
          onClick={acceptCookie}
        >
          Got it!
        </Button>
      </div>
    </div>
  );
}
