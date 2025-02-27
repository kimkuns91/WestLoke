import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";
import { useTranslations } from "next-intl";

export const metadata: Metadata = {
  title: "페이지를 찾을 수 없습니다",
  description: "요청하신 페이지를 찾을 수 없습니다.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFoundPage() {
  const t = useTranslations("NotFound");
  return (
    <>
      <div className="container flex-1">
        <div className="flex h-96 flex-col items-center justify-center space-y-4">
          <h1 className="text-8xl font-semibold">
            <span>4</span>0<span>4</span>
          </h1>
          <p className="text-xl">{t("title")}</p>
          <Link href="/">
            <Button>{t("button")}</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
