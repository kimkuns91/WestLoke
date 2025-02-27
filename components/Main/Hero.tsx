import Image from "next/image";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

const Hero = () => {
  const t = useTranslations("Main");
  return (
    <div
      className={cn(
        "flex w-full flex-col items-center justify-center gap-12 pb-36 pt-20",
        "bg-[#F3EEEA]"
      )}
    >
      {/* 배너 이미지 */}
      <div className="w-full max-w-[1105px]">
        <Image
          src={"/images/MainBanner.png"}
          alt="MainBanner"
          width={1105}
          height={500}
          priority
        />
      </div>
      <div className="container">
        <Image
          src={"/images/MainTitle.svg"}
          alt="MainTitle"
          width={408}
          height={100}
          priority
        />
        <p className="text-base font-medium">{t("location")}</p>
      </div>
      {/* <div
        className={cn(
          "w-full h-full max-w-[1920px] mx-auto flex flex-col items-center justify-between",
          "pt-16 pb-36"
          // "bg-[url('/images/MainBG.png')] bg-no-repeat bg-center bg-cover"
        )}
      >
        <div className="flex flex-col items-center gap-4">
          <h2 className="pretendard text-6xl font-[500] tracking-tighter">
            Westloke Amps
          </h2>
          <p className="text-base font-medium">Redmond,WA</p>
        </div>
        <Image
          src={"/images/MainModel.png"}
          width={1200}
          height={500}
          alt="MainAmp"
        />
        <div className="flex flex-col items-center gap-4">
          <Link
            href={"/amplifiers"}
            className="flex items-center text-2xl font-bold transition-all ease-in-out hover:opacity-30"
          >
            <p>Model 6</p>
          </Link>
          <div className="flex items-center justify-center gap-6">
            <p>Lifetime Warranty for Amp itself</p>
            <p>|</p>
            <p>5 Years Warranty for the Tubes</p>
          </div>
        </div>
      </div> */}
    </div>
  );
};
export default Hero;
