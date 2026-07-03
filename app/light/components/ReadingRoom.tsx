import Link from "next/link";
import { getLatestBlogPosts } from "@/lib/queries";

export default async function ReadingRoom() {
  const posts = await getLatestBlogPosts(3);

  if (posts.length === 0) return null;

  return (
    <section className="blog">
      <div className="container">
        <header className="section-head">
          <span className="eyebrow reveal">Reading room</span>
          <h2 className="reveal">Notes from <em>the deck floor.</em></h2>
        </header>
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
                      data-parallax-speed="0.22"
                    />
                  )}
                  <span className="blog-img-tag">{String(idx + 1).padStart(2, "0")}</span>
                </div>
                <div className="blog-body">
                  <span className="blog-tag">{post.category}</span>
                  <h3>{post.title}</h3>
                  {isFeature && post.excerpt && <p>{post.excerpt}</p>}
                  <Link href={`/light/blog/${post.slug}`} className="link-arrow">
                    Learn more <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
