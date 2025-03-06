"use client";

import { useRef, useState } from "react";

import { Button } from "../ui/button";
import IconInput from "../ui/inputIcon";
import { MdKey } from "react-icons/md";
import { completePasswordReset } from "@/actions/auth";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

interface ResetPasswordFormProps {
  token: string;
}

const ResetPasswordForm = ({ token }: ResetPasswordFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const t = useTranslations("ResetPassword");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const password = passwordRef.current?.value;
    const confirmPassword = confirmPasswordRef.current?.value;

    if (!password) {
      toast.error(t("passwordRequired"));
      return;
    }

    if (password.length < 8) {
      toast.error(t("passwordMin"));
      return;
    }

    // Password pattern validation (letters, numbers, special chars)
    const passwordPattern =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordPattern.test(password)) {
      toast.error(t("passwordPattern"));
      return;
    }

    if (password !== confirmPassword) {
      toast.error(t("passwordMismatch"));
      return;
    }

    try {
      setIsLoading(true);

      const result = await completePasswordReset(token, password);

      if (result.error) {
        toast.error(result.error);
        return;
      }

      toast.success(t("success"));

      // Redirect to login page after successful password reset
      setTimeout(() => {
        router.push("/signin");
      }, 2000);
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
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-700"
          >
            {t("password")}
          </label>
          <IconInput
            id="password"
            icon={<MdKey className="text-gray-500" />}
            ref={passwordRef}
            type="password"
            name="password"
            placeholder={t("passwordPlaceholder")}
            disabled={isLoading}
            required
            className="w-full rounded-lg px-4 py-2.5"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="confirmPassword"
            className="text-sm font-medium text-gray-700"
          >
            {t("confirmPassword")}
          </label>
          <IconInput
            id="confirmPassword"
            icon={<MdKey className="text-gray-500" />}
            ref={confirmPasswordRef}
            type="password"
            name="confirmPassword"
            placeholder={t("confirmPasswordPlaceholder")}
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
    </div>
  );
};

export default ResetPasswordForm;
