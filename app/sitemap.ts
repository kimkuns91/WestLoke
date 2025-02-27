import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://westloke.com";

  // 정적 라우트
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/amplifiers`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
  ];

  // 동적 라우트 - 앰프 상세 페이지
  const amplifiers = await prisma.amplifier.findMany({
    select: {
      name_slug: true,
      createdAt: true,
    },
  });

  const amplifierRoutes = amplifiers.map((amp) => ({
    url: `${baseUrl}/amplifiers/${amp.name_slug}`,
    lastModified: amp.createdAt,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...amplifierRoutes];
}
