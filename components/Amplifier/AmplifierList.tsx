"use client";

import { IAmplifier } from "@/interface";
import Image from "next/image";
import Link from "next/link";
import Loading from "../Loading";
import { cn } from "@/lib/utils";
import { useAmps } from "@/hooks/useFetchAmp";

export default function AmplifierList() {
  const { data: amplifiers, isLoading } = useAmps();

  if (isLoading)
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loading size={200} />
      </div>
    );

  return (
    <div className="container mx-auto px-4 md:px-6">
      {/* 헤더 섹션 */}
      <div className="mb-8 md:mb-12">
        <h1 className="text-2xl font-bold md:text-3xl lg:text-4xl">
          Amplifiers
        </h1>
        <p className="mt-2 text-sm text-gray-600 md:text-base">
          Handcrafted tube amplifiers made in Redmond, WA
        </p>
      </div>

      {/* 앰프 그리드 */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {amplifiers?.map((amp: IAmplifier) => (
          <Link
            href={`/amplifiers/${amp.name_slug}`}
            key={amp.id}
            className="group block h-full"
          >
            <div
              className={cn(
                "h-full rounded-lg bg-[#F7F7F7] p-4 md:p-6",
                "transition-all duration-300",
                "hover:shadow-lg"
              )}
            >
              {/* 이미지 컨테이너 */}
              <div
                className={cn(
                  "relative mb-4 aspect-square overflow-hidden",
                  "rounded-lg bg-white p-4 md:p-8"
                )}
              >
                <Image
                  src={amp.thumbnail}
                  alt={amp.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className={cn(
                    "object-contain",
                    "transition-transform duration-300",
                    "group-hover:scale-105"
                  )}
                />
              </div>

              {/* 텍스트 컨텐츠 */}
              <div className="space-y-2">
                <h2 className="text-lg font-bold md:text-xl">{amp.name}</h2>
                <p className="line-clamp-2 text-xs text-gray-600 md:text-sm">
                  {amp.description}
                </p>
                <p className="text-base font-medium md:text-lg">
                  ${amp.price.toLocaleString()}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
