import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import GridContainer from "@/components/GridContainer";
import PostCTA from "@/components/PostCTA";
import { HOME_SECTION_PATHS, siteConfig } from "@/config/site";
import {
  blogPosts,
  formatBlogDateShort,
  getPostBySlug,
  getRelatedPosts,
  getAdjacentPosts,
} from "@/data/blogPosts";
import ShareButtons from "@/components/ShareButtons";

function renderInlineMarkdown(text: string): ReactNode[] {
  const tokens = text
    .split(/(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g)
    .filter(Boolean);

  return tokens.map((token, index) => {
    if (token.startsWith("**") && token.endsWith("**")) {
      return (
        <strong key={`strong-${index}`} className="font-semibold text-swiss-black">
          {token.slice(2, -2)}
        </strong>
      );
    }

    if (token.startsWith("*") && token.endsWith("*")) {
      return (
        <em key={`em-${index}`} className="italic">
          {token.slice(1, -1)}
        </em>
      );
    }

    const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const href = linkMatch[2];
      const isInternal = href.startsWith("/");
      return isInternal ? (
        <Link key={`link-${index}`} href={href} className="text-swiss-red hover:text-swiss-red-ink underline underline-offset-2">
          {linkMatch[1]}
        </Link>
      ) : (
        <a key={`link-${index}`} href={href} target="_blank" rel="noopener noreferrer" className="text-swiss-red hover:text-swiss-red-ink underline underline-offset-2">
          {linkMatch[1]}
        </a>
      );
    }

    return <Fragment key={`text-${index}`}>{token}</Fragment>;
  });
}

function renderContentBlock(block: string, index: number) {
  const content = block.trim();
  const highlightLine = "La verdadera función de este seguro es liberar a su familia.";

  if (content.startsWith("#### ")) {
    return (
      <h3 key={`h3-${index}`} className="pt-2 text-headline font-semibold tracking-tight text-swiss-black">
        {renderInlineMarkdown(content.slice(5))}
      </h3>
    );
  }

  if (content.startsWith("### ")) {
    return (
      <h2
        key={`h2-${index}`}
        className="text-headline font-semibold tracking-tight text-swiss-black"
      >
        {renderInlineMarkdown(content.slice(4))}
      </h2>
    );
  }

  if (content.startsWith("> ")) {
    return (
      <blockquote
        key={`quote-${index}`}
        className="border-l-4 border-swiss-black pl-6 text-body text-swiss-black/85 italic"
      >
        {renderInlineMarkdown(content.slice(2))}
      </blockquote>
    );
  }

  // Unordered list block: lines starting with "- "
  if (content.startsWith("- ")) {
    const items = content.split("\n").filter((line) => line.trim().startsWith("- "));
    return (
      <ul key={`ul-${index}`} className="space-y-2 pl-6 list-disc text-body text-swiss-black/90 marker:text-swiss-red">
        {items.map((item, i) => (
          <li key={`li-${index}-${i}`}>{renderInlineMarkdown(item.slice(2))}</li>
        ))}
      </ul>
    );
  }

  // Ordered list block: lines starting with "1. ", "2. ", etc.
  if (/^\d+\.\s/.test(content)) {
    const items = content.split("\n").filter((line) => /^\d+\.\s/.test(line.trim()));
    return (
      <ol key={`ol-${index}`} className="space-y-2 pl-6 list-decimal text-body text-swiss-black/90 marker:text-swiss-red marker:font-semibold">
        {items.map((item, i) => (
          <li key={`oli-${index}-${i}`}>{renderInlineMarkdown(item.replace(/^\d+\.\s/, ""))}</li>
        ))}
      </ol>
    );
  }

  if (content === highlightLine) {
    return (
      <p key={`highlight-${index}`} className="text-xl font-bold text-swiss-black leading-relaxed">
        {content}
      </p>
    );
  }

  return (
    <p key={`p-${index}`} className="text-body text-swiss-black/90">
      {renderInlineMarkdown(content)}
    </p>
  );
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Artículo no encontrado | TC Insurance",
    };
  }

  const postUrl = `${siteConfig.seo.siteUrl}/blog/${post.slug}`;
  const ogImage = post.featuredImage
    ? `${siteConfig.seo.siteUrl}${post.featuredImage}`
    : `${siteConfig.seo.siteUrl}${siteConfig.seo.defaultOgImage}`;

  return {
    title: post.title.length > 48 ? post.title : `${post.title} | TC Insurance`,
    description: post.excerpt,
    ...(post.status === "legacy" && { robots: { index: false, follow: false } }),
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: postUrl,
      siteName: siteConfig.brand.name,
      locale: "es_US",
      publishedTime: `${post.publishedAt}T12:00:00-06:00`,
      authors: [post.author],
      section: post.category,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.featuredImageAlt ?? post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [ogImage],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();
  const postUrl = `${siteConfig.seo.siteUrl}/blog/${post.slug}`;
  const relatedPosts = getRelatedPosts(post.slug, 3);
  const { prev, next } = getAdjacentPosts(post.slug);
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: siteConfig.seo.siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${siteConfig.seo.siteUrl}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: postUrl,
      },
    ],
  };
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: `${post.publishedAt}T12:00:00-06:00`,
    dateModified: `${post.updatedAt ?? post.publishedAt}T12:00:00-06:00`,
    articleSection: post.category,
    wordCount: post.content.join(" ").split(/\s+/).length,
    inLanguage: "es-US",
    mainEntityOfPage: postUrl,
    url: postUrl,
    image: post.featuredImage
      ? `${siteConfig.seo.siteUrl}${post.featuredImage}`
      : `${siteConfig.seo.siteUrl}${siteConfig.seo.defaultOgImage}`,
    author: {
      "@type": "Person",
      name: post.author,
      jobTitle: "Agente de seguros en Texas",
      url: `${siteConfig.seo.siteUrl}/sobre-mi`,
    },
    about: {
      "@type": "InsuranceProduct",
      name:
        post.slug === "seguro-gastos-finales-texas-guia-completa"
          ? "Seguro de gastos finales en Texas"
          : post.category,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${siteConfig.seo.siteUrl}/#organization`,
      name: siteConfig.brand.name,
      url: siteConfig.seo.siteUrl,
    },
    keywords:
      post.keywords ??
      (post.slug === "seguro-gastos-finales-texas-guia-completa"
        ? "seguro de gastos finales texas, seguro funeral texas, final expense insurance dallas español"
        : post.category),
  };

  const faqJsonLd =
    post.faq && post.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }
      : null;

  return (
    <div className="min-h-screen">
      <GridContainer
        as="article"
        data-testid="blog-article"
        data-agent-context="longform-content"
        className="pt-8 pb-24"
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        {faqJsonLd ? (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
          />
        ) : null}
        <div className="col-span-12 md:col-span-2 pt-10">
          <Link href="/blog" className="tap-target text-meta text-swiss-gray hover:text-swiss-red-ink">
            Volver al blog &rarr;
          </Link>
        </div>

        <div className="col-span-12 md:col-start-2 md:col-span-9 pt-8">
          <span className="blog-category-chip">{post.category}</span>
          <h1 className="text-headline md:text-[clamp(2.6rem,5vw,4.6rem)] mt-5 text-swiss-black">
            {post.title}
          </h1>
        </div>

        <div className="col-span-12 md:col-start-8 md:col-span-5 pt-8 pb-10 flex flex-col gap-4">
          <p className="text-meta text-swiss-gray">
            {formatBlogDateShort(post.publishedAt)} / {post.readTime} / {post.author}
          </p>
          <ShareButtons
            url={postUrl}
            title={post.title}
            whatsappNumber="12039932369"
          />
        </div>

        <div className="col-span-12 border-t border-swiss-black" />

        {post.featuredImage ? (
          <figure className="col-span-12 md:col-start-3 md:col-span-7 pt-12">
            <div className="relative aspect-[16/10] w-full overflow-hidden border border-swiss-black/15">
              <Image
                src={post.featuredImage}
                alt={post.featuredImageAlt ?? post.title}
                fill
                priority
                sizes="(min-width: 768px) 58vw, 100vw"
                className="object-cover grayscale contrast-125"
              />
            </div>
          </figure>
        ) : null}

        <div className="col-span-12 md:col-start-3 md:col-span-7 pt-10 space-y-8">
          {post.content.map((paragraph, index) => renderContentBlock(paragraph, index))}
        </div>

        {post.faq && post.faq.length > 0 ? (
          <section
            aria-labelledby="faq-heading"
            className="col-span-12 md:col-start-3 md:col-span-7 border-t border-swiss-black/15 mt-10 pt-10"
          >
            <h2 id="faq-heading" className="text-headline font-semibold tracking-tight text-swiss-black">
              Preguntas frecuentes
            </h2>
            <div className="mt-6 space-y-5">
              {post.faq.map((item, index) => (
                <article key={`${item.question}-${index}`} className="border border-swiss-black/12 p-5">
                  <h3 className="text-body font-semibold text-swiss-black">{item.question}</h3>
                  <p className="mt-2 text-body text-swiss-black/85">{item.answer}</p>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {/* Share buttons at bottom of article */}
        <div className="col-span-12 md:col-start-3 md:col-span-7 border-t border-swiss-black/15 mt-14 pt-8">
          <ShareButtons
            url={postUrl}
            title={post.title}
            whatsappNumber="12039932369"
          />
        </div>

        <div className="col-span-12 md:col-start-3 md:col-span-7 border-t border-swiss-black/15 mt-8 pt-8">
          <PostCTA trackingId="blog_post_end" />
        </div>

        {/* Previous / Next navigation */}
        {(prev || next) && (
          <nav
            aria-label="Navegación entre artículos"
            className="col-span-12 md:col-start-3 md:col-span-7 grid grid-cols-2 gap-6 border-t border-swiss-black/15 mt-10 pt-8"
          >
            {prev ? (
              <Link
                href={`/blog/${prev.slug}`}
                className="group flex flex-col gap-2"
              >
                <span className="text-meta text-swiss-gray">&larr; Anterior</span>
                <span className="text-body font-semibold text-swiss-black group-hover:text-swiss-red-ink transition-colors leading-tight">
                  {prev.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link
                href={`/blog/${next.slug}`}
                className="group flex flex-col gap-2 text-right"
              >
                <span className="text-meta text-swiss-gray">Siguiente &rarr;</span>
                <span className="text-body font-semibold text-swiss-black group-hover:text-swiss-red-ink transition-colors leading-tight">
                  {next.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </nav>
        )}

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <section aria-labelledby="related-heading" className="col-span-12 border-t border-swiss-black mt-14 pt-10">
            <h2 id="related-heading" className="text-headline tracking-tight text-swiss-black mb-8">
              Artículos relacionados
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="group flex flex-col gap-4 border border-swiss-black/15 p-6 hover:border-swiss-red/40 transition-colors"
                >
                  {related.featuredImage && (
                    <div className="relative aspect-[16/10] w-full overflow-hidden border border-swiss-black/10">
                      <Image
                        src={related.featuredImage}
                        alt={related.featuredImageAlt ?? related.title}
                        fill
                        sizes="(min-width: 768px) 30vw, 100vw"
                        className="object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
                      />
                    </div>
                  )}
                  <span className="blog-category-chip self-start">{related.category}</span>
                  <h3 className="text-lg font-semibold tracking-tight text-swiss-black group-hover:text-swiss-red-ink transition-colors leading-tight">
                    {related.title}
                  </h3>
                  <p className="text-meta text-swiss-gray mt-auto">
                    {formatBlogDateShort(related.publishedAt)} / {related.readTime}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="col-span-12 md:col-start-3 md:col-span-7 pt-8">
          <Link
            href={HOME_SECTION_PATHS.contact}
            className="tap-target text-meta text-swiss-black hover:text-swiss-red-ink"
          >
            Solicitar asesoría personalizada &rarr;
          </Link>
        </div>
      </GridContainer>
    </div>
  );
}
