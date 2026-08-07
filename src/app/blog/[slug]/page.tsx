import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { getPool } from "@/lib/db";

export const dynamic = "force-dynamic";

interface PostRow {
  title: string;
  content: string;
  created_at: string;
}

async function getPost(slug: string): Promise<PostRow | null> {
  const pool = getPool();
  const [rows] = await pool.query(
    "SELECT title, content, created_at FROM blog_posts WHERE slug = ? AND published = TRUE LIMIT 1",
    [slug]
  );
  const list = rows as PostRow[];
  return list[0] ?? null;
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <>
      <Navbar />
      <main className="relative z-[1] mx-auto max-w-[760px] px-5 pt-[140px] pb-24 sm:px-6 lg:px-10">
        <h1 className="mb-4 text-[clamp(1.8rem,4vw,2.8rem)] font-black tracking-[-0.02em] text-ink uppercase">
          {post.title}
        </h1>
        <span className="mb-8 block font-mono text-xs text-soft">
          {new Date(post.created_at).toLocaleDateString("tr-TR")}
        </span>
        <div className="max-w-none text-[15.5px] leading-[1.75] whitespace-pre-wrap text-ink">
          {post.content}
        </div>
      </main>
      <WhatsAppButton />
      <Footer />
    </>
  );
}
