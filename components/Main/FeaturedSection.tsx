import Link from "next/link";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

const FeaturedSection = () => {
  const t = useTranslations("FeaturedSection");
  return (
    <div
      className={cn(
        "container mt-20 flex h-[240px] items-end py-8 md:mt-40 md:h-[360px] md:py-16",
        "bg-[url('/images/FeaturedSection.png')] bg-cover bg-center bg-no-repeat"
      )}
    >
      <div className="item-center container flex justify-end px-4 text-white md:px-6">
        <Link href={"/gallery"}>
          <button
            className={cn(
              "border border-white px-6 py-3 text-sm md:px-8 md:py-4 md:text-base",
              "hover:border-black hover:bg-white hover:text-black",
              "transition-all duration-300 ease-in-out"
            )}
          >
            {t("button")}
            <span className="ml-2 text-sm">▶</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedSection;
