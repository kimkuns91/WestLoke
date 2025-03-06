"use client";

import { useRef, useState } from "react";

import { Button } from "../ui/button";
import IconInput from "../ui/inputIcon";
import { MdEmail } from "react-icons/md";
import { resetPassword } from "@/actions/auth";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const ForgotPasswordForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const t = useTranslations("ForgotPassword");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!emailRef.current?.value) {
      toast.error(t("emailRequired"));
      return;
    }

    try {
      setIsLoading(true);
      const email = emailRef.current.value;

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        toast.error(t("emailInvalid"));
        return;
      }

      const result = await resetPassword(email);

      if (result.error) {
        toast.error(result.error);
        return;
      }

      toast.success(t("success"));
      // Clear the form
      emailRef.current.value = "";
    } catch (error) {
      console.error("Password reset error:", error);
      toast.error(t("error"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-[380px] flex-col justify-center gap-6 px-6 py-20">
      <div className="text-center">
        <h1 className="mb-2 text-3xl font-bold">{t("title")}</h1>
        <p className="text-gray-500">{t("description")}</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
            placeholder={t("emailPlaceholder")}
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
          {isLoading ? t("loading") : t("submit")}
        </Button>
      </form>

      <div className="text-center">
        <button
          onClick={() => router.push("/signin")}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          {t("backToLogin")}
        </button>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
