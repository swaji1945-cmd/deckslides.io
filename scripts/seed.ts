import { config as loadEnv } from "dotenv";
loadEnv({ path: ".env.local" });

import { randomUUID } from "node:crypto";
import { db, schema } from "../lib/db";

async function main() {
  console.log("Seeding...");

  // Wipe existing seed data
  await db.delete(schema.blogPosts);
  await db.delete(schema.portfolioItems);

  const now = new Date();

  // Portfolio items (matches existing homepage cards)
  await db.insert(schema.portfolioItems).values([
    {
      id: randomUUID(),
      slug: "bahrain-rugby",
      title: "Bahrain Rugby",
      description: "Annual general meeting deck for the club's 1971-est. board.",
      categoryTag: "Sport · Annual report · 2025",
      year: 2025,
      coverImageUrl: "/images/bahrain-rugby.jpg",
      externalUrl: "#",
      sortOrder: 1,
      status: "published",
    },
    {
      id: randomUUID(),
      slug: "revest",
      title: "Revest",
      description: "Investor brief for a Dubai-based real-estate platform raising Series B.",
      categoryTag: "Real estate · Series B · 2025",
      year: 2025,
      coverImageUrl: "/images/revest.jpg",
      externalUrl: "#",
      sortOrder: 2,
      status: "published",
    },
    {
      id: randomUUID(),
      slug: "noonan-performance",
      title: "Noonan Performance",
      description: "Driver-performance framework deck pitched to motorsport sponsors.",
      categoryTag: "Motorsport · Sponsorship pitch · 2025",
      year: 2025,
      coverImageUrl: "/images/noonan.jpg",
      externalUrl: "#",
      sortOrder: 3,
      status: "published",
    },
    {
      id: randomUUID(),
      slug: "tamara",
      title: "Tamara",
      description: "From transactions to relationships — elevating Tamara's customer experience.",
      categoryTag: "Fintech · CX strategy · Sept 2025",
      year: 2025,
      coverImageUrl: "/images/tamara.jpg",
      externalUrl: "#",
      sortOrder: 4,
      status: "published",
    },
  ]);

  // Blog posts (matches existing reading-room cards)
  await db.insert(schema.blogPosts).values([
    {
      id: randomUUID(),
      slug: "why-most-pitch-decks-fail",
      title: "Why most pitch decks fail.",
      excerpt: "The five structural mistakes that lose investor attention in the first 90 seconds — and how to avoid them.",
      category: "Guide",
      coverImageUrl: "/images/why-ai-fails.png",
      bodyHtml: "<p>Coming soon — full article body.</p>",
      bodyJson: { type: "doc", content: [{ type: "paragraph", content: [{ type: "text", text: "Coming soon — full article body." }] }] },
      status: "published",
      publishedAt: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 7),
    },
    {
      id: randomUUID(),
      slug: "from-idea-to-investment",
      title: "From idea to investment — what a high-impact deck really looks like.",
      excerpt: null,
      category: "Article",
      coverImageUrl: "/images/from-idea-to-investment.png",
      bodyHtml: "<p>Coming soon — full article body.</p>",
      bodyJson: { type: "doc", content: [{ type: "paragraph", content: [{ type: "text", text: "Coming soon — full article body." }] }] },
      status: "published",
      publishedAt: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 3),
    },
    {
      id: randomUUID(),
      slug: "the-hidden-power-of-design",
      title: "The hidden power of design.",
      excerpt: null,
      category: "Online course",
      coverImageUrl: "/images/hidden-power-of-design.png",
      bodyHtml: "<p>Coming soon.</p>",
      bodyJson: { type: "doc", content: [{ type: "paragraph", content: [{ type: "text", text: "Coming soon." }] }] },
      status: "published",
      publishedAt: new Date(now.getTime() - 1000 * 60 * 60 * 24),
    },
  ]);

  const blog = await db.select().from(schema.blogPosts);
  const portfolio = await db.select().from(schema.portfolioItems);
  console.log(`✓ Seeded ${blog.length} blog posts, ${portfolio.length} portfolio items.`);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
