"use client";
import Button from "@/components/Button";
import withAuth from "@/components/PrivateRoute";
import { ToastMessage } from "@/components/Toast/page";
import {
  ABSOLUTE_PATHS,
  ToastType,
  USERNAME_CHECK_DELAY,
} from "@/utils/constants";
import supabase from "@/utils/supabaseClient";
import { AuthApiError } from "@supabase/supabase-js";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { TypeOptions } from "react-toastify";

function SignUp() {
  const initialVal = {
    username: "",
    name: "",
    email: "",
    password: "",
  };
  const [userData, setUserData] = useState(initialVal);
  const [usernameError, setUsernameError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const timerId = useRef<any>();

  const handleCheckUsername = async (username: string) => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("username")
        .eq("username", username);
      if (error) throw error;
      if (data?.length > 0) throw { message: "Username already exists" };
      ToastMessage({
        message: "Username available",
        type: ToastType.Success as TypeOptions,
      });
      setUsernameError(false);
    } catch (err: any) {
      ToastMessage({
        message: err?.message ?? "",
        type: ToastType.Error as TypeOptions,
      });
      setUsernameError(true);
      console.error(">>>>>> CREATE USER ERROR", err);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserData((prev) => ({
      ...prev,
      [name]: name === "username" || name === "password" ? value.trim() : value,
    }));
  };

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (usernameError) {
        throw { message: "Username already exists" };
      }
      const resp = await supabase.auth.signUp({ ...userData });
      if (resp.error) throw resp.error;
      ToastMessage({
        message: "Mail verification sent successfully",
        type: ToastType.Success as TypeOptions,
      });
      const userId = resp.data.user?.id;
      if (userId) {
        await handleCreateUser(userId);
      }
      setUserData(initialVal);
    } catch (err: AuthApiError | any) {
      ToastMessage({
        message: err?.message as string,
        type: ToastType.Error as TypeOptions,
      });
      console.error(">>>>>> SIGN UP ERROR", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (userId: string) => {
    try {
      const { error } = await supabase.from("users").insert({
        id: userId,
        username: userData.username.toLowerCase(),
        fullname: userData.name,
      });
      console.log("User created successfully");
      if (error) throw error;
    } catch (err) {
      console.error(">>>>>> CREATE USER ERROR", err);
    }
  };

  useEffect(() => {
    if (userData.username.length > 0) {
      clearTimeout(timerId.current);
      timerId.current = setTimeout(() => {
        handleCheckUsername(userData.username);
      }, USERNAME_CHECK_DELAY);
    }
  }, [userData.username]);

  return (
    <div className="flex flex-col w-[100dvw] h-[100dvh] items-center justify-center px-2">
      <div className="flex flex-col items-center justify-center relative border-2 border-primary/40 p-3 max-w-lg w-full rounded">
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
          onSubmit={handleSignup}
        >
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={userData.name}
            onChange={handleChange}
            required
            className="rounded"
          />
          <input
            type="text"
            name="username"
            placeholder="Enter Username"
            value={userData.username}
            onChange={handleChange}
            required
            className="rounded"
          />
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
          <Button isLoading={loading} type="submit">
            Sign Up
          </Button>
        </form>
        <p className="mt-2">
          Already have an account ?{" "}
          <span
            className="text-primary underline cursor-pointer"
            onClick={() => {
              router.push(ABSOLUTE_PATHS.LOGIN);
            }}
          >
            Login instead!
          </span>
        </p>
      </div>
    </div>
  );
}

export default withAuth(SignUp);
