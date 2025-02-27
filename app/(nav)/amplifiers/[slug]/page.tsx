import GetInquiryButton from "@/components/GetInquiryButton";
import Image from "next/image";
import { fetchAmp } from "@/hooks/useFetchAmp";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const amp = await fetchAmp(slug);

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
          {/* 제품 정보 헤더 */}
          <div className="flex flex-col">
            {/* 상단 제목과 버튼 */}
            <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <h1 className="mb-1 text-2xl font-bold md:text-4xl">
                  {amp.name}
                </h1>
                <p className="text-base md:text-xl">{amp.description}</p>
              </div>
              <GetInquiryButton model={amp} />
            </div>

            {/* 가격 */}
            <p className="mb-2 text-xl font-semibold md:text-2xl">
              ${amp.price.toLocaleString()}
            </p>
          </div>

          {/* 구분선 */}
          <hr className="my-6 border-gray-200 md:my-2" />

          {/* Specs 섹션 */}
          <div>
            <h3 className="mb-4 text-base font-semibold text-gray-400 md:text-lg">
              Specs
            </h3>
            <div className="space-y-3">
              <div className="grid grid-cols-[120px,1fr] gap-y-3 md:grid-cols-[160px,1fr]">
                {Object.entries(amp.specs).map(([key, value]) => (
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
