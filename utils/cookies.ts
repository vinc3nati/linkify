"use client";

import Cookies from "js-cookie";

const isProd = process.env.NODE_ENV === "production";

const crossDomainCookiesList = ["access_token", "refresh_token", "mode"]; //cookies to be shared across the domain loco.gg

const getCookieConfiguration = (
  cookieName: string,
  expires?: number
): Cookies.CookieAttributes => ({
  domain:
    isProd && crossDomainCookiesList.includes(cookieName)
      ? //TODO: change after deploying to prod
        "127.0.0.1"
      : undefined,
  path: "/",
  secure: true,
  sameSite: "none",
  expires: expires ? expires : 30,
});

export const setCookie = (name: string, value: string, expires?: number) => {
  Cookies.set(name, value, getCookieConfiguration(name, expires));
};

export const getCookie = (name: string) => {
  return Cookies.get(name);
};

export const removeCookie = (name: string) => {
  Cookies.remove(name, getCookieConfiguration(name));
};

export const clearCookies = () => {
  Object.keys(Cookies.get()).forEach((cookieName) => {
    Cookies.remove(cookieName, getCookieConfiguration(cookieName));
  });
};
