import type { Metadata } from "next";
import Link from "next/link";
import GridContainer from "@/components/GridContainer";
import PostCTA from "@/components/PostCTA";
import BlogCategoryFilter from "@/components/BlogCategoryFilter";
import { siteConfig } from "@/config/site";
import { activePosts, featuredPost, getVisiblePosts, getCategories } from "@/data/blogPosts";

const blogUrl = `${siteConfig.seo.siteUrl}/blog`;
const ogImage = `${siteConfig.seo.siteUrl}${siteConfig.seo.defaultOgImage}`;

export const metadata: Metadata = {
  title: "Guías de Seguros en Texas | Blog TC Insurance",
  description:
    "Guías prácticas sobre seguros de salud, vida y gastos finales para familias en Texas. Escrito por Tatiana Castañeda, agente bilingüe en Lewisville, TX.",
  alternates: {
    canonical: blogUrl,
  },
  openGraph: {
    type: "website",
    title: "Guías de Seguros en Texas | Blog TC Insurance",
    description:
      "Guías prácticas sobre seguros de salud, vida y gastos finales para familias en Texas. Escrito por Tatiana Castañeda, agente bilingüe en Lewisville, TX.",
    url: blogUrl,
    siteName: siteConfig.brand.name,
    locale: "es_US",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "TC Insurance Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Guías de Seguros en Texas | Blog TC Insurance",
    description:
      "Guías prácticas sobre seguros de salud, vida y gastos finales para familias en Texas. Escrito por Tatiana Castañeda, agente bilingüe en Lewisville, TX.",
    images: [ogImage],
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: siteConfig.seo.siteUrl },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${siteConfig.seo.siteUrl}/blog` },
  ],
};

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Guías de seguros en Texas",
  description: "Artículos educativos sobre seguros de salud, vida y gastos finales en Texas",
  numberOfItems: activePosts.length,
  itemListElement: activePosts.map((post, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: `${siteConfig.seo.siteUrl}/blog/${post.slug}`,
    name: post.title,
  })),
};

export default function BlogPage() {
  const posts = getVisiblePosts();
  const categories = getCategories();

  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <GridContainer
        as="section"
        data-testid="blog-index"
        data-agent-context="blog-index"
        className="pt-8"
      >
        <div className="col-span-12 md:col-span-2 pt-10">
          <Link href="/" className="tap-target text-meta text-swiss-gray hover:text-swiss-red-ink">
            Volver a inicio &rarr;
          </Link>
        </div>

        <div className="col-span-12 md:col-start-2 md:col-span-10 pt-8">
          <h1 className="text-display tracking-[-0.055em]">
            Guías de Seguros de Salud y Vida en Texas
          </h1>
        </div>

        <p className="col-span-12 md:col-start-8 md:col-span-5 text-body text-swiss-gray pt-10 pb-14">
          Guías claras para tomar mejores decisiones sobre salud, vida y
          protección familiar de largo plazo.
        </p>

        <div className="col-span-12 border-t border-swiss-black" />

        <BlogCategoryFilter
          posts={posts}
          categories={categories}
          featuredPost={featuredPost.status === "active" ? featuredPost : null}
        />

        <div className="col-span-12 pt-10 pb-20">
          <PostCTA trackingId="blog_index_end" />
        </div>
      </GridContainer>
    </div>
  );
}
