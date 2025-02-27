import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/amplifiers", "/gallery"],
        disallow: ["/api/*", "/admin/*", "/private/*"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        crawlDelay: 2,
      },
    ],
    sitemap: "https://westloke.com/sitemap.xml",
    host: "https://westloke.com",
  };
}
