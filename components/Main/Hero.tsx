import Image from "next/image";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

const Hero = () => {
  const t = useTranslations("Main");
  return (
    <div
      className={cn(
        "flex w-full flex-col items-center justify-center gap-6 pb-20 pt-10 md:gap-12 md:pb-36 md:pt-20",
        "bg-[#F3EEEA]"
      )}
    >
      {/* 배너 이미지 */}
      <div className="w-full max-w-[1105px] px-4 md:px-0">
        <Image
          src={"/images/MainBanner.png"}
          alt="MainBanner"
          width={1105}
          height={500}
          priority
          className="h-auto w-full"
        />
      </div>
      <div className="container px-4 md:px-6">
        <Image
          src={"/images/MainTitle.svg"}
          alt="MainTitle"
          width={408}
          height={100}
          priority
          className="h-auto w-[250px] md:w-[408px]"
        />
        <p className="mt-2 text-sm font-medium md:text-base">{t("location")}</p>
      </div>
    </div>
  );
};
export default Hero;
