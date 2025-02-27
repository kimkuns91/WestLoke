import Link from "next/link";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

const FeaturedSection = () => {
  const t = useTranslations("FeaturedSection");
  return (
    <div
      className={cn(
        "container mt-40 flex h-[360px] items-end py-16",
        "bg-[url('/images/FeaturedSection.png')] bg-cover bg-center bg-no-repeat"
      )}
    >
      <div className="item-center container flex justify-end text-white">
        <Link href={"/gallery"}>
          <button
            className={cn(
              "border border-white px-8 py-4",
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
