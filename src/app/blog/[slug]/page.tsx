import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import BlogPostClient from "@/components/blog/BlogPostClient";
import { getPool } from "@/lib/db";

export const dynamic = "force-dynamic";

interface PostRow {
  title: string;
  content: string;
  cover_image: string | null;
  created_at: string;
}

async function getPost(slug: string): Promise<PostRow | null> {
  const pool = getPool();
  const [rows] = await pool.query(
    "SELECT title, content, cover_image, created_at FROM blog_posts WHERE slug = ? AND published = TRUE LIMIT 1",
    [slug]
  );
  const list = JSON.parse(JSON.stringify(rows)) as PostRow[];
  return list[0] ?? null;
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <>
      <Navbar />
      <BlogPostClient post={post} />
      <WhatsAppButton />
      <Footer />
    </>
  );
}
