import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { getPool } from "@/lib/db";

export const dynamic = "force-dynamic";

interface PostRow {
  slug: string;
  title: string;
  excerpt: string | null;
  cover_image: string | null;
  created_at: string;
}

async function getPosts(): Promise<PostRow[]> {
  const pool = getPool();
  const [rows] = await pool.query(
    "SELECT slug, title, excerpt, cover_image, created_at FROM blog_posts WHERE published = TRUE ORDER BY created_at DESC"
  );
  return rows as PostRow[];
}

export default async function BlogIndexPage() {
  const posts = await getPosts();

  return (
    <>
      <Navbar />
      <main className="relative z-[1] mx-auto max-w-[1000px] px-5 pt-[140px] pb-24 sm:px-6 lg:px-10">
        <h1 className="mb-10 text-[clamp(2rem,4vw,3.2rem)] font-black tracking-[-0.02em] text-ink uppercase">
          Blog
        </h1>
        {posts.length === 0 ? (
          <p className="text-muted">Henüz yayınlanmış bir yazı yok.</p>
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
                  <img
                    src={post.cover_image}
                    alt={post.title}
                    className="h-[180px] w-full object-cover"
                  />
                )}
                <div className="p-6">
                  <h2 className="mb-2 text-xl font-extrabold text-ink">{post.title}</h2>
                  {post.excerpt && <p className="text-sm text-muted">{post.excerpt}</p>}
                  <span className="mt-4 block font-mono text-xs text-soft">
                    {new Date(post.created_at).toLocaleDateString("tr-TR")}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
      <WhatsAppButton />
      <Footer />
    </>
  );
}
