"use client";

import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import React from "react";
import { useTranslations } from "next-intl";

interface LoginGoogleProps {
  handleGoogleLogin: () => void;
  isLoading: boolean;
}

const LoginGoogle = ({ handleGoogleLogin, isLoading }: LoginGoogleProps) => {
  const t = useTranslations("SignInForm");

  return (
    <Button
      type="button"
      onClick={handleGoogleLogin}
      disabled={isLoading}
      className="flex w-full items-center justify-center gap-2 border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
    >
      {isLoading ? (
        <span className="loading loading-spinner loading-sm" />
      ) : (
        <FcGoogle className="h-5 w-5" />
      )}
      {t("googleLogin")}
    </Button>
  );
};

export default LoginGoogle;
