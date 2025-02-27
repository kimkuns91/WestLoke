"use client";

import * as Yup from "yup";

import { FiLock, FiMail, FiUser } from "react-icons/fi";
import { Field, Form, Formik } from "formik";
import { ISignUpFormProps, ISignUpValues } from "@/interface/auth";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";

export default function SignUpForm({ onSubmit }: ISignUpFormProps) {
  const t = useTranslations("SignUpForm");

  const SignUpSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, t("errors.nameMin"))
      .required(t("errors.nameRequired")),
    email: Yup.string()
      .email(t("errors.emailInvalid"))
      .required(t("errors.emailRequired")),
    password: Yup.string()
      .min(8, t("errors.passwordMin"))
      .matches(
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
        t("errors.passwordPattern")
      )
      .required(t("errors.passwordRequired")),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], t("errors.confirmPasswordMatch"))
      .required(t("errors.confirmPasswordRequired")),
  });

  const initialValues: ISignUpValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  return (
    <Card className="p-6 sm:p-8 md:p-10">
      <Formik
        initialValues={initialValues}
        validationSchema={SignUpSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await onSubmit(values);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="flex items-center gap-2 text-sm font-medium text-gray-700"
              >
                <FiUser className="h-4 w-4" />
                {t("name")}
              </label>
              <div className="relative">
                <Field
                  as={Input}
                  id="name"
                  name="name"
                  type="text"
                  placeholder={t("namePlaceholder")}
                  className={`w-full rounded-lg border py-2 pl-4 pr-4 ${
                    errors.name && touched.name
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  } transition-all duration-200 focus:border-transparent focus:ring-2`}
                />
              </div>
              {errors.name && touched.name && (
                <div className="mt-1 text-sm text-red-500">{errors.name}</div>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="flex items-center gap-2 text-sm font-medium text-gray-700"
              >
                <FiMail className="h-4 w-4" />
                {t("email")}
              </label>
              <div className="relative">
                <Field
                  as={Input}
                  id="email"
                  name="email"
                  type="email"
                  placeholder={t("emailPlaceholder")}
                  className={`w-full rounded-lg border py-2 pl-4 pr-4 ${
                    errors.email && touched.email
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  } transition-all duration-200 focus:border-transparent focus:ring-2`}
                />
              </div>
              {errors.email && touched.email && (
                <div className="mt-1 text-sm text-red-500">{errors.email}</div>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="flex items-center gap-2 text-sm font-medium text-gray-700"
              >
                <FiLock className="h-4 w-4" />
                {t("password")}
              </label>
              <div className="relative">
                <Field
                  as={Input}
                  id="password"
                  name="password"
                  type="password"
                  placeholder={t("passwordPlaceholder")}
                  className={`w-full rounded-lg border py-2 pl-4 pr-4 ${
                    errors.password && touched.password
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  } transition-all duration-200 focus:border-transparent focus:ring-2`}
                />
              </div>
              {errors.password && touched.password && (
                <div className="mt-1 text-sm text-red-500">
                  {errors.password}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="confirmPassword"
                className="flex items-center gap-2 text-sm font-medium text-gray-700"
              >
                <FiLock className="h-4 w-4" />
                {t("confirmPassword")}
              </label>
              <div className="relative">
                <Field
                  as={Input}
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder={t("confirmPasswordPlaceholder")}
                  className={`w-full rounded-lg border py-2 pl-4 pr-4 ${
                    errors.confirmPassword && touched.confirmPassword
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  } transition-all duration-200 focus:border-transparent focus:ring-2`}
                />
              </div>
              {errors.confirmPassword && touched.confirmPassword && (
                <div className="mt-1 text-sm text-red-500">
                  {errors.confirmPassword}
                </div>
              )}
            </div>

            <Button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-2.5 text-white transition-colors duration-200 hover:bg-blue-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="h-5 w-5 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {t("loading")}
                </>
              ) : (
                t("submit")
              )}
            </Button>
          </Form>
        )}
      </Formik>
    </Card>
  );
}
