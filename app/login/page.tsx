"use client";
import Button from "@/components/Button";
import withAuth from "@/components/PrivateRoute";
import { ToastMessage } from "@/components/Toast/page";
import { useAuthStore } from "@/stores/authStore";
import { ABSOLUTE_PATHS, JWT_CREDS, ToastType } from "@/utils/constants";
import { setCookie } from "@/utils/cookies";
import supabase from "@/utils/supabaseClient";
import { AuthApiError } from "@supabase/supabase-js";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { TypeOptions } from "react-toastify";

function Login() {
  const initialVal = {
    email: "",
    password: "",
  };
  const [userData, setUserData] = useState(initialVal);
  const [loading, setLoading] = useState(false);

  const { setAccessToken, setRefreshToken, setMe } = useAuthStore(
    (state) => state
  );
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const resp = await supabase.auth.signInWithPassword({ ...userData });
      if (resp.error) throw resp.error;
      const { data, error } = await supabase
        .from("users")
        .select("username, fullname")
        .eq("id", resp.data.user.id);
      if (error) throw error;
      const dataToBeSaved = {
        ...resp.data.user,
        username: data ? data[0].username : "",
        fullname: data ? data[0].fullname : "",
      };

      setCookie(
        JWT_CREDS.ACCESS_TOKEN,
        resp.data.session.access_token,
        resp.data.session.expires_in
      );
      setCookie(
        JWT_CREDS.REFRESH_TOKEN,
        resp.data.session.refresh_token,
        resp.data.session.expires_in
      );
      setAccessToken(resp.data.session.access_token);
      setRefreshToken(resp.data.session.refresh_token);
      setMe(dataToBeSaved);
      localStorage.setItem(JWT_CREDS.ME, JSON.stringify(dataToBeSaved));

      ToastMessage({
        message: "Logged in successfully",
        type: ToastType.Success as TypeOptions,
      });
    } catch (err: AuthApiError | any) {
      ToastMessage({
        message: err?.message as string,
        type: ToastType.Error as TypeOptions,
      });
      console.log(">>>>>> LOGIN ERROR", { err });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-[100dvw] h-[100dvh] items-center justify-center">
      <div className="flex flex-col items-center justify-center relative border-2 border-primary/30 p-3 max-w-lg w-full rounded">
        <Button
          title="Go Back"
          customClasses="absolute left-8 top-5 rounded w-10 h-10 border border-primary text-primary bg-white flex items-center justify-center hover:bg-primary hover:text-white active:bg-primary active:text-white"
          onClick={() => {
            router.push("/");
          }}
        >
          <IoIosArrowBack />
        </Button>
        <Image
          src="/logo.png"
          width={100}
          height={100}
          alt="Logo"
          className="mx-auto mb-2"
        />
        <form
          className="max-w-md w-full flex flex-col gap-4"
          onSubmit={handleLogin}
        >
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={userData.email}
            onChange={handleChange}
            required
            className="rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={userData.password}
            onChange={handleChange}
            required
            className="rounded"
          />
          <Button type="submit" isLoading={loading}>
            Login
          </Button>
        </form>
        <p className="mt-2">
          Don&rsquo;t have an account ?{" "}
          <span
            className="text-primary underline cursor-pointer"
            onClick={() => {
              router.push(ABSOLUTE_PATHS.SIGNUP);
            }}
          >
            Sign up instead!
          </span>
        </p>
      </div>
    </div>
  );
}

export default withAuth(Login);
