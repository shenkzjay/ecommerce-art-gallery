"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { SignInUser } from "../api/signinapicall/signin";
import { LoginPropTypes } from "@/types/types";
import Link from "next/link";
import { Navbar } from "@/component/navbar";
import { useRouter } from "next/navigation";
import AuthContext from "../context/AuthProvider";
import { useContext, useEffect } from "react";

export default function SignIn() {
  const signInUser = SignInUser();

  const router = useRouter();

  const { register: registerLogin, handleSubmit: handleLoginSubmit } = useForm<LoginPropTypes>();

  const context = useContext(AuthContext);

  if (!context) return;

  const { setUserData, setAuth, auth } = context;

  //login
  const onSubmit: SubmitHandler<LoginPropTypes> = (data) => {
    console.log(data, "login");

    signInUser.mutate(data, {
      onSuccess: async (data) => {
        console.log(data, "onSucess");
        setAuth(data.accessToken);
        setUserData(data.userData);
        router.replace("/");
      },

      onError: async (error) => {
        console.error(error);
      },
    });
  };

  return (
    <section className="w-[85vw] mx-auto">
      <Navbar items={[]} />
      <div className=" flex flex-col justify-center items-center mt-24">
        <form
          className="w-[30vw] p-6 bg-[#f4f4f4] rounded-xl"
          onSubmit={handleLoginSubmit(onSubmit)}
        >
          <legend className="flex justify-center">Log in</legend>
          <fieldset className="flex flex-col gap-6">
            <div className="flex flex-col gap-1 text-[14px] text-slate-500">
              <label>Email</label>

              <input
                type="email"
                {...registerLogin("email")}
                className="border px-4 py-2 rounded-md"
                placeholder="email"
              />
            </div>

            <div className="flex flex-col gap-1 text-[14px] text-slate-500">
              <label>Password</label>

              <input
                type="password"
                {...registerLogin("password")}
                className="border px-4 py-2 rounded-md"
                placeholder="password"
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="py-3 px-6 bg-black text-white font-semibold rounded-full hover:scale-105"
              >
                Login to continue →
              </button>
            </div>

            <div>
              <p className="text-slate-400">Not yet signed up? </p>
              <Link href="/signup" className="underline">
                Sign up
              </Link>
            </div>
          </fieldset>
        </form>
      </div>
    </section>
  );
}
