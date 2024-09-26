"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { LoginPropTypes, SignupTypes } from "@/types/types";
import { SignUpUser } from "@/app/api/signup/signup";
import Link from "next/link";
import { Navbar } from "@/component/navbar";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const signupUser = SignUpUser();
  const router = useRouter();
  const { register: registerSignup, handleSubmit: handleSignupSubmit } = useForm<SignupTypes>();

  const SignupSubmit: SubmitHandler<SignupTypes> = (data) => {
    console.log(data, "signupdata");

    signupUser.mutate(data, {
      onSuccess: async (data) => {
        console.log(data, "signup successfull");
        router.replace("/login");
      },

      onError: async (error) => {
        console.error(error);
      },
    });
  };

  return (
    <section className="w-[85vw] mx-auto ">
      <Navbar items={[]} />
      <div className="flex flex-col mt-24 justify-center items-center">
        <form
          className=" w-[30vw] p-6 bg-[#f4f4f4] rounded-xl"
          onSubmit={handleSignupSubmit(SignupSubmit)}
        >
          <legend className="flex justify-center">Sign up</legend>
          <fieldset className="flex flex-col gap-6">
            <div className="flex flex-col gap-1 text-[14px] text-slate-500">
              <label>Fullname</label>

              <input
                type="fullname"
                {...registerSignup("fullname")}
                className="border px-4 py-2 rounded-md"
                placeholder="fullname"
              />
            </div>

            <div className="flex flex-col gap-1 text-[14px] text-slate-500">
              <label>Email</label>

              <input
                type="email"
                {...registerSignup("email")}
                className="border px-4 py-2 rounded-md"
                placeholder="email"
              />
            </div>

            <div className="flex flex-col gap-1 text-[14px] text-slate-500">
              <label>Password</label>

              <input
                type="password"
                {...registerSignup("password")}
                className="border px-4 py-2 rounded-md"
                placeholder="password"
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="py-3 px-6 bg-black text-white font-semibold rounded-full hover:scale-105"
              >
                Sign up to continue →
              </button>
            </div>
            <div>
              <p className="text-slate-400">Already signed up? </p>
              <Link href="/signin" className="underline">
                Login
              </Link>
            </div>
          </fieldset>
        </form>
      </div>
    </section>
  );
}
