import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getBlogPostBySlug, getLatestBlogPosts } from "@/lib/queries";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: "Not found" };
  return {
    title: `${post.title} — Pitch Deck`,
    description: post.excerpt || undefined,
  };
}

function readTime(html: string | null) {
  if (!html) return 1;
  const text = html.replace(/<[^>]*>/g, " ").trim();
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function formatDate(d: Date | null) {
  if (!d) return "";
  return new Intl.DateTimeFormat("en", { dateStyle: "long" }).format(d);
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post || post.status !== "published") notFound();

  const latest = await getLatestBlogPosts(4);
  const otherPosts = latest.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <main className="post">
      <article>
        <header className="post-hero">
          <div className="container post-hero-inner">
            <Link href="/blog" className="post-back">← Reading room</Link>
            <span className="blog-tag post-tag">{post.category}</span>
            <h1 className="post-title">{post.title}</h1>
            {post.excerpt && <p className="post-excerpt">{post.excerpt}</p>}
            <div className="post-meta">
              <span>{formatDate(post.publishedAt)}</span>
              <span className="post-meta-dot" aria-hidden="true">●</span>
              <span>{readTime(post.bodyHtml)} min read</span>
            </div>
          </div>
          {post.coverImageUrl && (
            <div className="post-cover">
              <img
                src={post.coverImageUrl}
                alt={`${post.title} cover`}
                data-parallax
                data-parallax-speed="0.18"
              />
            </div>
          )}
        </header>

        <div className="container post-body-wrap">
          <div className="post-body" dangerouslySetInnerHTML={{ __html: post.bodyHtml || "" }} />
        </div>
      </article>

      {otherPosts.length > 0 && (
        <section className="post-related">
          <div className="container">
            <header className="section-head">
              <span className="eyebrow">Keep reading</span>
              <h2>More from <em>the deck floor.</em></h2>
            </header>
            <div className="blog-grid">
              {otherPosts.map((p, idx) => {
                const imgClass = `blog-img--${(idx % 3) + 1}`;
                return (
                  <article className="blog-card" key={p.id}>
                    <div className={`blog-img ${imgClass}`}>
                      {p.coverImageUrl && (
                        <img
                          src={p.coverImageUrl}
                          alt={`${p.title} cover`}
                          loading="lazy"
                          data-parallax
                          data-parallax-speed="0.22"
                        />
                      )}
                      <span className="blog-img-tag">{String(idx + 1).padStart(2, "0")}</span>
                    </div>
                    <div className="blog-body">
                      <span className="blog-tag">{p.category}</span>
                      <h3>{p.title}</h3>
                      <Link href={`/blog/${p.slug}`} className="link-arrow">
                        Learn more <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
