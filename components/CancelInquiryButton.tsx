"use client";

import { Button } from "@/components/ui/button";
import { cancelInquiry } from "@/actions/inquiry";
import toast from "react-hot-toast";
import { useState } from "react";
import { useTranslations } from "next-intl";

interface CancelInquiryButtonProps {
  inquiryId: string;
}

export function CancelInquiryButton({ inquiryId }: CancelInquiryButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations("InquiryPage");

  const handleCancel = async () => {
    try {
      setIsLoading(true);
      await cancelInquiry(inquiryId);
      toast.success(t("cancelSuccess"), { duration: 3000 });
    } catch (error) {
      console.error("Failed to cancel inquiry:", error);
      toast.error(t("cancelError"), { duration: 3000 });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleCancel}
      disabled={isLoading}
      className="border-red-600 text-red-600 hover:bg-red-50"
    >
      {isLoading ? t("canceling") : t("cancel")}
    </Button>
  );
}
