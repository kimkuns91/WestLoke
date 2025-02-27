"use client";

import { IAuthError } from "@/interface/auth";
import { ISignUpValues } from "@/interface/auth";
import Link from "next/link";
import { Suspense } from "react";
import { createUser } from "@/actions/user";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const SignUpForm = dynamic(() => import("@/components/Auth/SignUpForm"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[400px] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
    </div>
  ),
});

export default function SignUpPage() {
  const router = useRouter();
  const t = useTranslations("SignUpForm");

  const handleSubmit = async (values: ISignUpValues) => {
    try {
      await createUser({
        email: values.email,
        password: values.password,
        name: values.name,
      });

      toast.success(t("errors.signupSuccess"));
      toast.success(t("errors.redirecting"));

      router.push("/signin");
    } catch (error: IAuthError | unknown) {
      const err = error as IAuthError;
      if (err.message === "EXISTING_GOOGLE_USER") {
        toast.error(t("errors.existingGoogleUser"));
        toast(t("errors.useGoogleSignIn"), {
          icon: "🔍",
        });
      } else if (err.message === "EXISTING_GITHUB_USER") {
        toast.error(t("errors.existingGithubUser"));
        toast(t("errors.useGithubSignIn"), {
          icon: "🔍",
        });
      } else if (err.message === "EXISTING_EMAIL_USER") {
        toast.error(t("errors.existingEmailUser"));
        toast(t("errors.useEmailSignIn"), {
          icon: "🔍",
        });
      } else {
        toast.error(t("errors.signupFailed"));
        toast.error(t("errors.tryAgain"));
      }
    }
  };

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {t("title")}
          </h1>
        </div>

        <Suspense
          fallback={
            <div className="flex h-[400px] items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
            </div>
          }
        >
          <SignUpForm onSubmit={handleSubmit} />
        </Suspense>

        <p className="text-center text-sm text-gray-600">
          {t("haveAccount")}{" "}
          <Link
            href="/signin"
            className="font-medium text-blue-600 transition-colors duration-200 hover:text-blue-500"
          >
            {t("login")}
          </Link>
        </p>
      </div>
    </div>
  );
}
