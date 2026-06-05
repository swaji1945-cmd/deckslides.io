import Link from "next/link";
import type { Metadata } from "next";
import { getAllPublishedBlogPosts } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Reading room — Pitch Deck",
  description: "Notes from the deck floor — guides, articles, and courses on investor-ready presentation design.",
};

export default async function BlogIndex() {
  const posts = await getAllPublishedBlogPosts();

  return (
    <main className="blog-index">
      <section className="blog">
        <div className="container">
          <header className="section-head">
            <span className="eyebrow reveal">Reading room</span>
            <h2 className="reveal">Notes from <em>the deck floor.</em></h2>
            <p className="section-sub reveal">Every published post — newest first.</p>
          </header>

          {posts.length === 0 ? (
            <p className="section-sub" style={{ marginTop: 40 }}>No posts yet. Check back soon.</p>
          ) : (
            <div className="blog-grid">
              {posts.map((post, idx) => {
                const isFeature = idx === 0;
                const imgClass = `blog-img--${(idx % 3) + 1}`;
                return (
                  <article
                    className={`blog-card${isFeature ? " blog-card--feature" : ""} reveal`}
                    key={post.id}
                  >
                    <div className={`blog-img ${imgClass}`}>
                      {post.coverImageUrl && (
                        <img
                          src={post.coverImageUrl}
                          alt={`${post.title} cover`}
                          loading="lazy"
                          data-parallax
                          data-parallax-speed="0.25"
                        />
                      )}
                      <span className="blog-img-tag">{String(idx + 1).padStart(2, "0")}</span>
                    </div>
                    <div className="blog-body">
                      <span className="blog-tag">{post.category}</span>
                      <h3>{post.title}</h3>
                      {isFeature && post.excerpt && <p>{post.excerpt}</p>}
                      <Link href={`/blog/${post.slug}`} className="link-arrow">
                        Learn more <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
