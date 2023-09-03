"use client";
export const ABSOLUTE_PATHS = {
  LOGIN: "/login",
  SIGNUP: "/signup",
};

export const ToastType = {
  Warn: "warn",
  Success: "success",
  Info: "info",
  Error: "error",
};

export const JWT_CREDS = {
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
  ME: "LINKIFY_ME",
};

export const USERNAME_CHECK_DELAY = 500;

export const IMAGE_SIZE_LIMIT = 50_000;

export const SINGUP_INITIAL_VAL = {
  username: "",
  name: "",
  email: "",
  password: "",
};

export const LOGIN_INITIAL_VAL = {
  email: "",
  password: "",
};
