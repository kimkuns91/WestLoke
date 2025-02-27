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
    <div className="container pb-40 pt-20">
      <div className="flex gap-9">
        {/* 왼쪽 제품 이미지 */}
        <div className="h-full max-h-[500px] w-1/2 rounded-lg bg-[#F7F7F7] p-4">
          <Image
            src={amp.thumbnail}
            alt={amp.name}
            width={400}
            height={400}
            className="h-auto w-full"
          />
        </div>

        {/* 오른쪽 제품 정보 */}
        <div className="w-1/2 space-y-6">
          {/* 제품 정보 헤더 */}
          <div className="flex flex-col">
            {/* 상단 제목과 버튼 */}
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h1 className="mb-1 text-4xl font-bold">{amp.name}</h1>
                <p className="text-xl font-medium">{amp.description}</p>
              </div>
              <GetInquiryButton model={amp} />
            </div>

            {/* 가격 */}
            <p className="mb-2 text-2xl font-semibold">
              ${amp.price.toLocaleString()}
            </p>
          </div>

          {/* 구분선 */}
          <hr className="my-2 border-gray-200" />

          {/* Specs 섹션 */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-gray-400">Specs</h3>
            <div className="space-y-3">
              <div className="grid grid-cols-[160px,1fr] gap-y-3">
                <div className="flex items-center gap-2 text-gray-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-gray-400"></span>
                  Controls
                </div>
                <div>{amp.specs.controls}</div>

                <div className="flex items-center gap-2 text-gray-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-gray-400"></span>
                  Preamp Tube
                </div>
                <div>{amp.specs.preampTube}</div>

                <div className="flex items-center gap-2 text-gray-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-gray-400"></span>
                  Power Tube
                </div>
                <div>{amp.specs.powerTube}</div>

                <div className="flex items-center gap-2 text-gray-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-gray-400"></span>
                  Rectifier
                </div>
                <div>{amp.specs.rectifier}</div>

                <div className="flex items-center gap-2 text-gray-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-gray-400"></span>
                  Speaker
                </div>
                <div>{amp.specs.speaker}</div>

                <div className="flex items-center gap-2 text-gray-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-gray-400"></span>
                  Cabinet
                </div>
                <div>{amp.specs.cabinet}</div>
              </div>
            </div>
          </div>

          {/* 제품 크기 이미지 */}
          <div className="w-1/2 pt-2">
            <Image
              src={amp.spec_image}
              alt={`${amp.name} specifications`}
              width={400}
              height={200}
              className="object-contain"
            />
          </div>

          {/* Warranty 섹션 */}
          <div className="pt-2">
            <h3 className="mb-2 text-lg font-semibold text-gray-400">
              Warranty
            </h3>
            <div className="text-sm font-medium text-gray-400">
              <p>{amp.warranty.amp}</p>
              <p>{amp.warranty.tubes}</p>
            </div>
          </div>
        </div>
      </div>
      {/* 이미지 갤러리 */}
      <div className="mx-auto mt-40 flex w-full max-w-[763px] flex-col gap-8">
        {amp.images.map((image: string) => (
          <div
            key={image}
            className="relative aspect-video overflow-hidden rounded-lg"
          >
            <Image
              src={image}
              alt={`${amp.name} detail`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
