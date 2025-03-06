import GetInquiryButton from "@/components/GetInquiryButton";
import Image from "next/image";
import Link from "next/link";
import { fetchAmp } from "@/hooks/useFetchAmp";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const amp = await fetchAmp(slug);

  // 앰프가 없는 경우 기본 메타데이터 반환
  if (!amp) {
    return {
      title: "Amplifier Not Found | Westloke Amps",
      description: "The requested amplifier could not be found.",
    };
  }

  // 앰프 데이터 기반 메타데이터 생성
  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL || "https://westlokeamps.com"
    ),
    title: `${amp.name} | Westloke Amps`,
    description: amp.description,
    openGraph: {
      type: "website",
      title: `${amp.name} | Westloke Amps`,
      description: amp.description,
      images: [
        {
          url: amp.thumbnail,
          width: 800,
          height: 600,
          alt: amp.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${amp.name} | Westloke Amps`,
      description: amp.description,
      images: [amp.thumbnail],
    },
    alternates: {
      canonical: `/amplifiers/${amp.name_slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
    keywords: [
      `${amp.name}`,
      "amplifier",
      "tube amp",
      "guitar amp",
      "Westloke Amps",
    ],
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const amp = await fetchAmp(slug);
  const t = await getTranslations("ReverbStore");

  if (!amp) {
    notFound();
  }

  return (
    <div className="container px-4 pb-20 pt-8 md:px-6 md:pb-40 md:pt-20">
      {/* 제품 상세 정보 섹션 */}
      <div className="flex flex-col gap-6 md:flex-row md:gap-9">
        {/* 왼쪽 제품 이미지 */}
        <div className="w-full rounded-lg bg-[#F7F7F7] p-4 md:h-full md:max-h-[500px] md:w-1/2">
          <Image
            src={amp.thumbnail}
            alt={amp.name}
            width={400}
            height={400}
            className="mx-auto h-auto w-full"
            priority
          />
        </div>

        {/* 오른쪽 제품 정보 */}
        <div className="w-full md:w-1/2 md:space-y-6">
          {/* 모바일 레이아웃 - 이미지와 유사하게 */}
          <div className="flex flex-col md:hidden">
            <h1 className="text-2xl font-bold">{amp.name}</h1>
            <p className="mt-1 text-base">{amp.description}</p>
            <p className="mt-4 text-xl font-semibold">
              ${amp.price.toLocaleString()}
            </p>
            <div className="mt-6 w-full">
              <GetInquiryButton model={amp} className="w-full" />
            </div>
            <Link
              href="https://reverb.com/shop/jeans-gear-garage-260"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex w-full items-center justify-center rounded-full bg-[#B50000] px-4 py-2.5 text-center font-medium text-white hover:bg-[#D94C0D] focus:outline-none focus:ring-2 focus:ring-[#F5540E] focus:ring-offset-2"
            >
              {t("buyButton")}
            </Link>
          </div>

          {/* 데스크톱 레이아웃 - 기존 디자인 유지 */}
          <div className="hidden md:block">
            <div className="flex flex-col">
              <div className="mb-4 flex flex-row items-start justify-between">
                <div>
                  <h1 className="mb-1 text-4xl font-bold">{amp.name}</h1>
                  <p className="text-xl">{amp.description}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <GetInquiryButton model={amp} />
                </div>
              </div>
              <p className="mb-2 text-2xl font-semibold">
                ${amp.price.toLocaleString()}
              </p>
            </div>
          </div>
          <Link
            href="https://reverb.com/shop/jeans-gear-garage-260"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center justify-center bg-[#B50000] px-4 py-4 text-center font-medium text-white hover:bg-[#D94C0D] focus:outline-none focus:ring-2 focus:ring-[#F5540E] focus:ring-offset-2 md:flex md:rounded-lg"
          >
            {t("buyButton")}
          </Link>

          {/* 구분선 */}
          <hr className="my-6 border-gray-200 md:my-2" />

          {/* Specs 섹션 */}
          <div>
            <h3 className="mb-4 text-base font-semibold text-gray-400 md:text-lg">
              Specs
            </h3>
            <div className="space-y-3">
              <div className="grid grid-cols-[120px,1fr] gap-y-3 md:grid-cols-[160px,1fr]">
                {Object.entries(amp.specs)
                  .filter(([key]) => key !== "rectifier")
                  .map(([key, value]) => (
                    <div key={key} className="contents">
                      <div className="flex items-center gap-2 text-sm text-gray-400 md:text-base">
                        <span className="h-1.5 w-1.5 rounded-full bg-gray-400"></span>
                        {key.charAt(0).toUpperCase() +
                          key.slice(1).replace(/([A-Z])/g, " $1")}
                      </div>
                      <div className="text-sm md:text-base">{value}</div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* 제품 크기 이미지 */}
          <div className="w-full pt-6 md:w-1/2 md:pt-2">
            <Image
              src={amp.spec_image}
              alt={`${amp.name} specifications`}
              width={400}
              height={200}
              className="mx-auto object-contain"
            />
          </div>

          {/* Warranty 섹션 */}
          <div className="pt-6 md:pt-2">
            <h3 className="mb-2 text-base font-semibold text-gray-400 md:text-lg">
              Warranty
            </h3>
            <div className="text-xs font-medium text-gray-400 md:text-sm">
              <p>{amp.warranty.amp}</p>
              <p>{amp.warranty.tubes}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 이미지 갤러리 */}
      <div className="mx-auto mt-20 flex w-full max-w-[763px] flex-col gap-4 md:mt-40 md:gap-8">
        {amp.images.map((image: string) => (
          <div
            key={image}
            className="relative aspect-video overflow-hidden rounded-lg"
          >
            <Image
              src={image}
              alt={`${amp.name} detail`}
              fill
              sizes="(max-width: 768px) 100vw, 763px"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
