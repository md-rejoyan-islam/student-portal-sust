import { SITE_URL } from "@/lib/env";
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = SITE_URL;

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/login", "/forgot-password", "/reset-password"],
        disallow: ["/api/", "/courses/", "/enrollment/", "/profile", "/"],
      },
      {
        userAgent: "Googlebot",
        allow: ["/login", "/forgot-password", "/reset-password"],
        disallow: ["/api/"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
