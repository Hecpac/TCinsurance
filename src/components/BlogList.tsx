"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import GridContainer from "@/components/GridContainer";
import GlareCard from "@/components/ui/glare-card";
import CTAInline from "@/components/CTAInline";
import { HOME_SECTION_PATHS } from "@/config/site";
import { formatBlogDateShort, getLatestPosts } from "@/data/blogPosts";
import { runBackgroundTask } from "@/lib/schedule";

const latestPosts = getLatestPosts(4);
const heroPost = latestPosts[0];
const remainingPosts = latestPosts.slice(1);

export default function BlogList() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(min-width: 768px)").matches) return;

    let isMounted = true;
    let cleanup: (() => void) | undefined;

    runBackgroundTask(() => {
      if (!isMounted) return;

      void (async () => {
        const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);

        if (!isMounted || !sectionRef.current) return;

        gsap.registerPlugin(ScrollTrigger);
        const triggers: ScrollTrigger[] = [];
        const ctx = gsap.context(() => {
          const headerAnim = gsap.from("[data-blog-header]", {
            y: 24,
            autoAlpha: 0,
            duration: 0.6,
            ease: "expo.out",
            scrollTrigger: {
              trigger: "[data-blog-header]",
              start: "top 88%",
              once: true,
              invalidateOnRefresh: true,
            },
          });
          if (headerAnim.scrollTrigger) triggers.push(headerAnim.scrollTrigger);

          const ruleAnim = gsap.from("[data-blog-rule]", {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 0.9,
            ease: "elastic.out(0.8, 0.65)",
            scrollTrigger: {
              trigger: "[data-blog-rule]",
              start: "top 92%",
              once: true,
              invalidateOnRefresh: true,
            },
          });
          if (ruleAnim.scrollTrigger) triggers.push(ruleAnim.scrollTrigger);

          const heroAnim = gsap.from("[data-blog-hero]", {
            y: 28,
            autoAlpha: 0,
            duration: 0.7,
            ease: "expo.out",
            scrollTrigger: {
              trigger: "[data-blog-grid]",
              start: "top 88%",
              once: true,
              invalidateOnRefresh: true,
            },
          });
          if (heroAnim.scrollTrigger) triggers.push(heroAnim.scrollTrigger);

          const cardsAnim = gsap.from("[data-blog-card]", {
            y: 20,
            autoAlpha: 0,
            duration: 0.65,
            stagger: 0.1,
            ease: "expo.out",
            scrollTrigger: {
              trigger: "[data-blog-grid]",
              start: "top 80%",
              once: true,
              invalidateOnRefresh: true,
            },
          });
          if (cardsAnim.scrollTrigger) triggers.push(cardsAnim.scrollTrigger);
        }, sectionRef);

        cleanup = () => {
          triggers.forEach((trigger) => trigger.kill());
          ctx.revert();
        };
      })();
    });

    return () => {
      isMounted = false;
      cleanup?.();
    };
  }, []);

  return (
    <div ref={sectionRef}>
      <GridContainer
        as="section"
        id="blog"
        data-testid="blog-preview-section"
        data-agent-context="latest-articles"
        className="pt-6"
      >
        <p
          data-blog-header
          className="col-span-12 text-meta section-kicker pt-24 pb-4"
        >
          Blog / Educación en seguros
        </p>

        <h2 className="col-span-12 pb-8 text-headline text-swiss-black">
          Guías recientes para decidir mejor
        </h2>

        <hr data-blog-rule className="col-span-12 border-t section-rule" />

        <div data-blog-grid className="col-span-12 grid grid-cols-12 gap-4 pt-10">
          {/* Featured / Hero post */}
          {heroPost && (
            <GlareCard data-blog-hero containerClassName="col-span-12" maxTilt={5}>
              <article className="grid grid-cols-1 border border-m3-outline-variant bg-m3-surface-container-low md:grid-cols-2">
                {heroPost.featuredImage ? (
                  <div className="relative aspect-[16/10] md:aspect-auto overflow-hidden">
                    <Image
                      src={heroPost.featuredImage}
                      alt={heroPost.featuredImageAlt ?? heroPost.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                      priority
                    />
                  </div>
                ) : (
                  <div className="bg-m3-surface-container aspect-[16/10] md:aspect-auto" />
                )}

                <div className="flex flex-col justify-between p-6 md:p-8">
                  <div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-meta text-m3-on-surface-variant">
                      <span className="blog-category-chip">{heroPost.category}</span>
                      <span>{formatBlogDateShort(heroPost.publishedAt)}</span>
                      <span>{heroPost.readTime}</span>
                    </div>

                    <h3 className="mt-5 text-headline leading-[1.15] tracking-tight text-swiss-black font-bold">
                      {heroPost.title}
                    </h3>

                    <p className="mt-4 max-w-[52ch] text-body text-m3-on-surface-variant">
                      {heroPost.excerpt}
                    </p>
                  </div>

                  <Link
                    href={`/blog/${heroPost.slug}`}
                    className="tap-target mt-6 inline-flex items-center gap-2 text-meta text-swiss-red hover:text-swiss-red-ink"
                  >
                    Leer artículo <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              </article>
            </GlareCard>
          )}

          {/* Remaining posts */}
          {remainingPosts.map((post) => (
            <GlareCard key={post.slug} data-blog-card containerClassName="col-span-12 md:col-span-4" maxTilt={8} className="h-full">
              <article className="flex h-full flex-col border border-m3-outline-variant bg-m3-surface-container-low">
                {post.featuredImage ? (
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.featuredImage}
                      alt={post.featuredImageAlt ?? post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="border-b border-m3-outline-variant bg-m3-surface-container px-6 pt-6 pb-5">
                    <span className="text-meta text-swiss-red">{post.category}</span>
                  </div>
                )}

                <div className="flex flex-grow flex-col p-6 md:p-7">
                  <div className="flex-grow">
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-meta text-m3-on-surface-variant">
                      {post.featuredImage && (
                        <span className="blog-category-chip">{post.category}</span>
                      )}
                      <span>{formatBlogDateShort(post.publishedAt)}</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h3 className="mt-4 text-[clamp(1.18rem,2.2vw,1.5rem)] font-bold leading-[1.18] tracking-tight text-swiss-black">
                      {post.title}
                    </h3>

                    <p className="mt-3 text-body text-m3-on-surface-variant line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="tap-target mt-6 inline-flex items-center gap-2 text-meta text-swiss-black hover:text-swiss-red-ink"
                  >
                    Leer artículo <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              </article>
            </GlareCard>
          ))}
        </div>

        <div className="col-span-12 pt-10 pb-24">
          <CTAInline
            title="Aplica estos conceptos a tu caso."
            subtitle="Te ayudamos a convertir cada artículo en decisiones concretas para tu cobertura."
            primaryButton={{ label: "Aplica esto a tu caso", href: HOME_SECTION_PATHS.contact }}
            secondaryButton={{ label: "Ver archivo completo", href: "/blog" }}
            trackingId="after_blog_grid"
          />
        </div>
      </GridContainer>
    </div>
  );
}
