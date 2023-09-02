"use client";
import { JWT_CREDS } from "@/utils/constants";
import { setCookie } from "@/utils/cookies";
import supabase from "@/utils/supabaseClient";
import { User } from "@supabase/supabase-js";
import { ReactNode, useContext, useEffect, createContext } from "react";
import { SetState, StoreApi, createStore, useStore } from "zustand";

type MeUsername = {
  username: string;
  fullname: string;
  profile_picture_url: string;
};

type AuthStoreType = {
  me: (User & MeUsername) | null;
  setMe: (value: any) => void;
  updateMe: (value: any) => void;
  accessToken: string | null;
  refreshToken: string | null;
  mode: string | null;
  setAccessToken: (value: string) => void;
  setRefreshToken: (value: string) => void;
};

const AuthContext = createContext({});

const store = createStore(
  (set: SetState<AuthStoreType>): AuthStoreType => ({
    me: null,
    setMe: (value) =>
      set(() => ({
        me: value,
      })),
    updateMe: (value) =>
      set(({ me }) => ({
        me: me ? { ...me, ...value } : me,
      })),
    mode: null,
    accessToken: null,
    refreshToken: null,
    setAccessToken: (value) =>
      set(() => ({
        accessToken: value,
      })),
    setRefreshToken: (value) =>
      set(() => ({
        refreshToken: value,
      })),
  })
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    (async () => {
      try {
        const resp = await supabase.auth.getUser();
        const { data, error } = await supabase
          .from("users")
          .select("username, fullname, profile_picture_url")
          .eq("id", resp.data.user?.id);

        if (resp.error || error) throw resp.error || error;
        const dataToBeSaved = {
          ...resp.data.user,
          username: data ? data[0].username : "",
          fullname: data ? data[0].fullname : "",
          profile_picture_url: data ? data[0].profile_picture_url : "",
        };
        store.getState().setMe(dataToBeSaved);
        localStorage.setItem(JWT_CREDS.ME, JSON.stringify(dataToBeSaved));
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);
  return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>;
};

export const useAuthStore = (selector: (state: AuthStoreType) => any) =>
  useStore(useContext(AuthContext) as StoreApi<AuthStoreType>, selector);
