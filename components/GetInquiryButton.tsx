"use client";

import { IAmplifier } from "@/interface";
import { cn } from "@/lib/utils";
import { createInquiry } from "@/actions/inquiry";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useTranslations } from "next-intl";

interface GetInquiryButtonProps {
  model: IAmplifier;
  className?: string;
}

const GetInquiryButton = ({ model, className }: GetInquiryButtonProps) => {
  const { status } = useSession();
  const t = useTranslations("GetInquiryButton");
  const [isLoading, setIsLoading] = useState(false);

  const handleGetInquiry = async () => {
    if (status !== "authenticated") {
      toast.error(t("signInRequired"));
      return;
    }

    try {
      setIsLoading(true);
      await createInquiry({
        amplifierId: model.id,
      });
      toast.success(t("inquirySent", { name: model.name }), {
        duration: 3000,
      });
    } catch (error) {
      if (error instanceof Error) {
        switch (error.message) {
          case "Already inquired":
            toast.error(t("alreadyInquired"), {
              duration: 3000,
            });
            break;
          case "User not authenticated":
            toast.error(t("signInRequired"), {
              duration: 3000,
            });
            break;
          default:
            toast.error(t("inquiryError"), {
              duration: 3000,
            });
        }
      } else {
        toast.error(t("inquiryError"), {
          duration: 3000,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
  );
};

export default GetInquiryButton;
