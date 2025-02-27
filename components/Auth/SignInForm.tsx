"use client";

import { MdEmail, MdKey } from "react-icons/md";
import { useRef, useState } from "react";

import { Button } from "../ui/button";
import IconInput from "../ui/inputIcon";
import LoginGoogle from "./LoginGoogle";
import { login } from "@/actions/auth";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const SignInForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const t = useTranslations("SignInForm");

  const handleCredentialsSignIn = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    try {
      e.preventDefault();
      setIsLoading(true);

      const res = await signIn("credentials", {
        email: emailRef.current?.value ?? "",
        password: passwordRef.current?.value ?? "",
        redirect: false,
      });

      if (res?.error) {
        toast.error(res.error);
        return;
      }

      toast.success("로그인 성공!");
      router.push("/");
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      await login("google");
    } catch (error) {
      toast.error("Google 로그인에 실패했습니다.");
      console.error("Google login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-[380px] flex-col justify-center gap-6 px-6 py-20">
      <div className="text-center">
        <h1 className="mb-2 text-3xl font-bold">Welcome Back!</h1>
        <p className="text-gray-500">{t("startLogin")}</p>
      </div>

      {/* Credentials 로그인 폼 */}
      <form onSubmit={handleCredentialsSignIn} className="flex flex-col gap-4">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            {t("email")}
          </label>
          <IconInput
            id="email"
            icon={<MdEmail className="text-gray-500" />}
            ref={emailRef}
            type="email"
            name="email"
            placeholder="name@example.com"
            disabled={isLoading}
            required
            className="w-full rounded-lg px-4 py-2.5"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              {t("password")}
            </label>
            <a
              href="/forgot-password"
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              {t("forgotPassword")}
            </a>
          </div>
          <IconInput
            id="password"
            icon={<MdKey className="text-gray-500" />}
            ref={passwordRef}
            type="password"
            name="password"
            placeholder="········"
            disabled={isLoading}
            required
            className="w-full rounded-lg px-4 py-2.5"
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="mt-2 w-full rounded-lg bg-blue-600 py-2.5 text-white transition-colors hover:bg-blue-700"
        >
          {t("emailLogin")}
        </Button>
      </form>

      {/* 구분선 */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-4 text-gray-500">{t("or")}</span>
        </div>
      </div>

      {/* 소셜 로그인 */}
      <LoginGoogle
        handleGoogleLogin={handleGoogleSignIn}
        isLoading={isLoading}
      />

      {/* 회원가입 안내 */}
      <p className="text-center text-gray-600">
        {t("signup")}{" "}
        <button
          onClick={() => router.push("/signup")}
          className="font-medium text-blue-600 hover:text-blue-800"
        >
          {t("signupLink")}
        </button>
      </p>
    </div>
  );
};

export default SignInForm;
