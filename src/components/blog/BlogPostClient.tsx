"use client";

import Link from "next/link";
import { useLanguage } from "@/hooks/useLanguage";

interface PostRow {
  title: string;
  content: string;
  cover_image: string | null;
  created_at: string;
}

export default function BlogPostClient({ post }: { post: PostRow }) {
  const { t, lang } = useLanguage();

  return (
    <main className="relative z-[1] mx-auto max-w-[760px] px-5 pt-[140px] pb-24 sm:px-6 lg:px-10">
      <Link href="/blog" className="mb-6 inline-block font-mono text-xs font-bold text-accent no-underline">
        {t.blog.back}
      </Link>
      <h1 className="mb-4 text-[clamp(1.8rem,4vw,2.8rem)] font-black tracking-[-0.02em] text-ink uppercase">
        {post.title}
      </h1>
      <span className="mb-8 block font-mono text-xs text-soft">
        {new Date(post.created_at).toLocaleDateString(lang)}
      </span>
      {post.cover_image && (
        // eslint-disable-next-line @next/next/no-img-element -- arbitrary external URLs from the ERP, no domain allowlist to maintain
        <img src={post.cover_image} alt={post.title} className="mb-8 h-auto w-full rounded-2xl object-cover" />
      )}
      <div className="max-w-none text-[15.5px] leading-[1.75] whitespace-pre-wrap text-ink">{post.content}</div>
    </main>
  );
}
