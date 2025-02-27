"use server";

import { IAmplifier } from "@/interface";
import { prisma } from "@/lib/prisma";

export async function getAmplifiers(): Promise<IAmplifier[]> {
  try {
    const amplifiers = await prisma.amplifier.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return amplifiers.map((amp) => ({
      ...amp,
      specs: JSON.parse(JSON.stringify(amp.specs)),
      warranty: JSON.parse(JSON.stringify(amp.warranty)),
      images: JSON.parse(JSON.stringify(amp.images)),
    }));
  } catch (error) {
    console.error("Failed to fetch amplifiers:", error);
    throw error;
  }
}

export async function getAmplifierBySlug(slug: string): Promise<IAmplifier> {
  try {
    const amplifier = await prisma.amplifier.findFirstOrThrow({
      where: {
        name_slug: slug,
      },
    });

    return {
      ...amplifier,
      specs: JSON.parse(JSON.stringify(amplifier.specs)),
      warranty: JSON.parse(JSON.stringify(amplifier.warranty)),
      images: JSON.parse(JSON.stringify(amplifier.images)),
    };
  } catch (error) {
    console.error(`Failed to fetch amplifier with slug ${slug}:`, error);
    throw error;
  }
}
