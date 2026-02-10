"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from "@/data/blogPosts";
import { formatBlogDateShort } from "@/data/blogPosts";

interface BlogCategoryFilterProps {
  posts: BlogPost[];
  categories: string[];
  featuredPost: BlogPost | null;
}

export default function BlogCategoryFilter({
  posts,
  categories,
  featuredPost,
}: BlogCategoryFilterProps) {
  const [active, setActive] = useState<string | null>(null);

  const filtered = active
    ? posts.filter((p) => p.category === active)
    : posts;

  return (
    <>
      {/* Featured post hero */}
      {featuredPost && !active && (
        <Link
          href={`/blog/${featuredPost.slug}`}
          className="col-span-12 grid grid-cols-12 gap-6 border-b border-swiss-black/15 py-10 group"
        >
          {featuredPost.featuredImage && (
            <div className="col-span-12 md:col-span-5">
              <div className="relative aspect-[16/10] w-full overflow-hidden border border-swiss-black/15">
                <Image
                  src={featuredPost.featuredImage}
                  alt={featuredPost.featuredImageAlt ?? featuredPost.title}
                  fill
                  priority
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>
          )}
          <div className={`col-span-12 ${featuredPost.featuredImage ? "md:col-span-7" : "md:col-span-12"} flex flex-col justify-center gap-4`}>
            <div className="flex items-center gap-3">
              <span className="blog-category-chip">{featuredPost.category}</span>
              <span className="text-meta text-swiss-red">DESTACADO</span>
            </div>
            <h2 className="text-headline tracking-tight text-swiss-black group-hover:text-swiss-red-ink transition-colors">
              {featuredPost.title}
            </h2>
            <p className="text-body text-swiss-gray max-w-[58ch]">
              {featuredPost.excerpt}
            </p>
            <p className="text-meta text-swiss-gray">
              {formatBlogDateShort(featuredPost.publishedAt)} / {featuredPost.readTime}
            </p>
          </div>
        </Link>
      )}

      {/* Category filter chips */}
      <div className="col-span-12 flex flex-wrap items-center gap-3 pt-8 pb-4">
        <button
          onClick={() => setActive(null)}
          className={`tap-target text-meta px-4 py-2 border transition-colors ${
            active === null
              ? "border-swiss-red bg-swiss-red/15 text-swiss-red-ink"
              : "border-swiss-black/15 text-swiss-gray hover:border-swiss-red/40 hover:text-swiss-red-ink"
          }`}
        >
          Todos ({posts.length})
        </button>
        {categories.map((cat) => {
          const count = posts.filter((p) => p.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setActive(active === cat ? null : cat)}
              className={`tap-target text-meta px-4 py-2 border transition-colors ${
                active === cat
                  ? "border-swiss-red bg-swiss-red/15 text-swiss-red-ink"
                  : "border-swiss-black/15 text-swiss-gray hover:border-swiss-red/40 hover:text-swiss-red-ink"
              }`}
            >
              {cat} ({count})
            </button>
          );
        })}
      </div>

      {/* Post list */}
      {filtered.map((post) => (
        <Link
          key={post.slug}
          href={`/blog/${post.slug}`}
          className="tap-target col-span-12 grid grid-cols-12 gap-6 border-b border-swiss-black/15 py-8 group hover:bg-elevated/50 transition-colors -mx-6 px-6"
        >
          <p className="col-span-12 md:col-span-2 text-meta text-swiss-gray">
            {formatBlogDateShort(post.publishedAt)}
          </p>
          <h2 className="col-span-12 md:col-span-6 text-2xl md:text-3xl font-semibold leading-tight tracking-tight text-swiss-black group-hover:text-swiss-red-ink transition-colors">
            {post.title}
          </h2>
          <div className="col-span-8 md:col-span-2">
            <span className="blog-category-chip">{post.category}</span>
          </div>
          <p className="col-span-4 md:col-span-1 text-right text-meta text-swiss-gray">
            {post.readTime}
          </p>
          <p className="col-span-12 md:col-span-1 text-meta text-swiss-gray/75 md:text-right group-hover:text-swiss-red-ink transition-colors">
            &rarr;
          </p>
        </Link>
      ))}
    </>
  );
}
