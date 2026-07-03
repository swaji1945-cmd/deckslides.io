import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPortfolioItemBySlug, getPublishedPortfolioItems } from "@/lib/queries";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await getPortfolioItemBySlug(slug);
  if (!item) return { title: "Not found" };
  return {
    title: `${item.title} — Pitch Deck`,
    description: item.description || undefined,
  };
}

export default async function PortfolioDetail({ params }: Props) {
  const { slug } = await params;
  const item = await getPortfolioItemBySlug(slug);
  if (!item || item.status !== "published") notFound();

  const all = await getPublishedPortfolioItems();
  const others = all.filter((i) => i.id !== item.id).slice(0, 3);

  const hasExternal = !!item.externalUrl && item.externalUrl !== "#";

  return (
    <main className="case">
      <article>
        <header className="case-hero">
          <div className="container case-hero-inner">
            <Link href="/light/portfolio" className="case-back">← Portfolio</Link>
            <div className="case-hero-meta">
              {item.categoryTag && <span className="case-tag">{item.categoryTag}</span>}
              {item.year && <span className="case-year">{item.year}</span>}
            </div>
            <h1 className="case-title">{item.title}</h1>
            {item.description && <p className="case-lede">{item.description}</p>}
            {hasExternal && (
              <div className="case-cta-row">
                <a
                  href={item.externalUrl!}
                  className="btn btn--primary btn--lg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View the deck
                  <span className="btn-arrow" aria-hidden="true">↗</span>
                </a>
                <Link href="/light/#contact" className="btn btn--ghost btn--lg">
                  Brief us on a similar project
                </Link>
              </div>
            )}
          </div>
        </header>

        {item.coverImageUrl && (
          <div className="container">
            <div className="case-cover">
              <img
                src={item.coverImageUrl}
                alt={`${item.title} deck cover`}
                data-parallax
                data-parallax-speed="0.18"
              />
            </div>
          </div>
        )}

        <section className="container case-meta">
          <dl className="case-meta-grid">
            {item.categoryTag && (
              <div className="case-meta-item">
                <dt>Discipline</dt>
                <dd>{item.categoryTag}</dd>
              </div>
            )}
            {item.year && (
              <div className="case-meta-item">
                <dt>Year</dt>
                <dd>{item.year}</dd>
              </div>
            )}
            <div className="case-meta-item">
              <dt>Studio</dt>
              <dd>Pitch Deck</dd>
            </div>
            <div className="case-meta-item">
              <dt>Outcome</dt>
              <dd>{hasExternal ? "Live" : "Private"}</dd>
            </div>
          </dl>
        </section>

        {item.description && (
          <section className="container case-narrative">
            <div className="case-narrative-inner">
              <span className="eyebrow">The brief</span>
              <p>{item.description}</p>
              <p>
                Every project we take on starts with the same three questions: who is the audience, what
                do they need to feel by the end of the deck, and what is the single most surprising thing
                we can lead with. The answers to those three become the spine of the design.
              </p>
              {hasExternal && (
                <p className="case-narrative-cta">
                  <a href={item.externalUrl!} target="_blank" rel="noopener noreferrer">
                    See the full deck →
                  </a>
                </p>
              )}
            </div>
          </section>
        )}
      </article>

      {others.length > 0 && (
        <section className="case-related">
          <div className="container">
            <header className="section-head">
              <span className="eyebrow">More from the studio</span>
              <h2>Adjacent <em>work.</em></h2>
            </header>
            <div className="work-grid">
              {others.map((p, idx) => {
                const frameClass = `work-frame--${(idx % 4) + 1}`;
                return (
                  <article className="work-card" key={p.id}>
                    <Link
                      href={`/light/portfolio/${p.slug}`}
                      className={`work-frame ${frameClass}`}
                      aria-label={`${p.title} case study`}
                    >
                      <div className="work-image">
                        {p.coverImageUrl && (
                          <img
                            src={p.coverImageUrl}
                            alt={`${p.title} cover`}
                            loading="lazy"
                            data-parallax
                            data-parallax-speed="0.22"
                          />
                        )}
                      </div>
                      <span className="work-cover-tag">View case</span>
                    </Link>
                    <div className="work-meta-row">
                      <div className="work-meta-text">
                        {p.categoryTag && <span className="work-tag">{p.categoryTag}</span>}
                        <h3>{p.title}</h3>
                      </div>
                      <Link href={`/light/portfolio/${p.slug}`} className="work-arrow" aria-label={`Open ${p.title} case study`}>
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
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
