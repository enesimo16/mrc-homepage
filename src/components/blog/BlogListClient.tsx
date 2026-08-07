"use client";

import Link from "next/link";
import { useLanguage } from "@/hooks/useLanguage";

interface PostRow {
  slug: string;
  title: string;
  excerpt: string | null;
  cover_image: string | null;
  created_at: string;
}

export default function BlogListClient({ posts }: { posts: PostRow[] }) {
  const { t, lang } = useLanguage();

  return (
    <main className="relative z-[1] mx-auto max-w-[1000px] px-5 pt-[140px] pb-24 sm:px-6 lg:px-10">
      <h1 className="mb-10 text-[clamp(2rem,4vw,3.2rem)] font-black tracking-[-0.02em] text-ink uppercase">
        {t.blog.title}
      </h1>
      {posts.length === 0 ? (
        <p className="text-muted">{t.blog.empty}</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block overflow-hidden rounded-2xl border border-line bg-bg2 no-underline transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-accent"
            >
              {post.cover_image && (
                // eslint-disable-next-line @next/next/no-img-element -- arbitrary external URLs from the ERP, no domain allowlist to maintain
                <img src={post.cover_image} alt={post.title} className="h-[180px] w-full object-cover" />
              )}
              <div className="p-6">
                <h2 className="mb-2 text-xl font-extrabold text-ink">{post.title}</h2>
                {post.excerpt && <p className="text-sm text-muted">{post.excerpt}</p>}
                <span className="mt-4 block font-mono text-xs text-soft">
                  {new Date(post.created_at).toLocaleDateString(lang)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
