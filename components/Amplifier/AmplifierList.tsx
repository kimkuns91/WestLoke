"use client";

import { IAmplifier } from "@/interface";
import Image from "next/image";
import Link from "next/link";
import Loading from "../Loading";
import { useAmps } from "@/hooks/useFetchAmp";

export default function AmplifierList() {
  const { data: amplifiers, isLoading } = useAmps();

  if (isLoading)
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loading size={300} />
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Amplifiers</h1>

      <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {amplifiers?.map((amp: IAmplifier) => (
          <Link
            href={`/amplifiers/${amp.name_slug}`}
            key={amp.id}
            className="group"
          >
            <div className="rounded-lg bg-[#F7F7F7] p-6 transition-all duration-300 hover:shadow-lg">
              <div className="relative mb-4 aspect-square overflow-hidden rounded-lg bg-white p-8">
                <Image
                  src={amp.thumbnail}
                  alt={amp.name}
                  fill
                  className="object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="space-y-2">
                <h2 className="text-xl font-bold">{amp.name}</h2>
                <p className="text-sm text-gray-600">{amp.description}</p>
                <p className="text-lg font-medium">
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
