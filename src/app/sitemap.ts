import type { MetadataRoute } from "next";
import { blogPosts } from "@/data/blogPosts";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.seo.siteUrl;
  const now = new Date();
  const staticRoutes = [
    "/",
    "/servicios",
    "/servicios/seguro-salud-texas",
    "/servicios/seguro-vida-dallas",
    "/servicios/seguro-gastos-finales-texas",
    "/servicios/seguro-dental-texas",
    "/servicios/seguro-vision-texas",
    "/servicios/medicare-texas",
    "/servicios/seguro-indemnizacion-texas",
    "/sobre-mi",
    "/blog",
    "/privacidad",
    "/terminos",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: new URL(route, base).toString(),
    lastModified: now,
    changeFrequency: route === "/" || route === "/blog" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route === "/blog" ? 0.8 : 0.7,
  }));

  const blogEntries: MetadataRoute.Sitemap = blogPosts.filter((post) => post.status !== "legacy").map((post) => ({
    url: new URL(`/blog/${post.slug}`, base).toString(),
    lastModified: new Date(`${post.publishedAt}T12:00:00`),
    changeFrequency: "monthly",
    priority: post.featured ? 0.8 : 0.6,
  }));

  return [...staticEntries, ...blogEntries];
}
