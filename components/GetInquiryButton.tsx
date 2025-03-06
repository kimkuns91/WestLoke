"use client";

import * as Yup from "yup";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ErrorMessage, Field, Form, Formik } from "formik";

import { Button } from "@/components/ui/button";
import { IAmplifier } from "@/interface";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { createInquiry } from "@/actions/inquiry";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useTranslations } from "next-intl";

interface GetInquiryButtonProps {
  model: IAmplifier;
  className?: string;
}

const GetInquiryButton = ({ model, className }: GetInquiryButtonProps) => {
  const t = useTranslations("GetInquiryButton");
  const guestT = useTranslations("GetInquiryButton.guestInquiry");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: session } = useSession();

  // 이메일 유효성 검증 스키마
  const InquirySchema = Yup.object().shape({
    email: Yup.string()
      .email(guestT("emailInvalid") || "유효한 이메일 주소를 입력해주세요")
      .required(guestT("emailRequired") || "이메일은 필수 입력 항목입니다"),
    name: Yup.string(), // 이름은 선택 사항으로 변경
  });

  const handleGetInquiry = async () => {
    // 로그인한 사용자는 바로 문의 생성
    if (session?.user) {
      await createInquiryForUser();
    } else {
      // 비회원은 모달 표시
      setIsModalOpen(true);
    }
  };

  const createInquiryForUser = async () => {
    setIsLoading(true);
    try {
      const response = await createInquiry({
        amplifierId: model.id,
      });

      if (response) {
        toast.success(t("inquirySuccess"));
        router.push("/inquiry");
      } else {
        toast.error(t("inquiryError"));
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";

      if (error instanceof Error) {
        switch (errorMessage) {
          case "Already inquired":
            toast.error(t("alreadyInquired"));
            break;
          default:
            toast.error(t("inquiryError"));
        }
      } else {
        toast.error(t("inquiryError"));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestInquiry = async (values: {
    email: string;
    name?: string;
  }) => {
    setIsLoading(true);
    try {
      const response = await createInquiry({
        amplifierId: model.id,
        email: values.email,
        name: values.name || "Guest", // 이름이 없는 경우 "Guest"로 설정
      });

      if (response) {
        toast.success(t("inquirySuccess"));
        setIsModalOpen(false);
        toast.success(guestT("successMessage"));
      } else {
        toast.error(t("inquiryError"));
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";

      if (error instanceof Error) {
        switch (errorMessage) {
          case "Already inquired with this email":
            toast.error(guestT("alreadyInquired"));
            break;
          default:
            toast.error(t("inquiryError"));
        }
      } else {
        toast.error(t("inquiryError"));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleGetInquiry}
        disabled={isLoading}
        className={cn(
          "rounded-full bg-black px-8 py-2 font-medium text-white",
          "transition-opacity duration-300 hover:opacity-70",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
      >
        {isLoading ? t("sending") : t("label")}
      </button>

      {/* 비회원 문의 모달 */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{guestT("title")}</DialogTitle>
            <DialogDescription>
              {guestT("description", { name: model.name })}
            </DialogDescription>
          </DialogHeader>

          <Formik
            initialValues={{ email: "", name: "" }}
            validationSchema={InquirySchema}
            onSubmit={handleGuestInquiry}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className="space-y-4 py-4">
                {/* 이메일 필드를 먼저 배치 */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    {guestT("emailLabel")}{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <Field
                    as={Input}
                    id="email"
                    name="email"
                    type="email"
                    placeholder={guestT("emailPlaceholder")}
                    className={cn(
                      errors.email && touched.email ? "border-red-500" : ""
                    )}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-sm text-red-500"
                  />
                </div>

                {/* 이름 필드를 나중에 배치 */}
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    {guestT("nameLabel")}{" "}
                    <span className="text-gray-400">{guestT("optional")}</span>
                  </label>
                  <Field
                    as={Input}
                    id="name"
                    name="name"
                    placeholder={guestT("namePlaceholder")}
                    className={cn(
                      errors.name && touched.name ? "border-red-500" : ""
                    )}
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-sm text-red-500"
                  />
                </div>

                <DialogFooter className="pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsModalOpen(false)}
                  >
                    {guestT("cancelButton")}
                  </Button>
                  <Button type="submit" disabled={isSubmitting || isLoading}>
                    {isLoading ? guestT("processing") : guestT("submitButton")}
                  </Button>
                </DialogFooter>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GetInquiryButton;
