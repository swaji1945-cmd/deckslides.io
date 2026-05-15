import { sql } from "drizzle-orm";
import { pgTable, text, integer, timestamp, jsonb, uuid } from "drizzle-orm/pg-core";

/**
 * Postgres schema for Supabase. uuid generation happens in app code via
 * crypto.randomUUID() so we don't need any pg extensions.
 */

export const blogPosts = pgTable("blog_posts", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt"),
  category: text("category").notNull(),
  coverImageUrl: text("cover_image_url"),
  bodyHtml: text("body_html"),
  bodyJson: jsonb("body_json"),
  status: text("status").notNull().default("draft"),
  publishedAt: timestamp("published_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().default(sql`now()`),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().default(sql`now()`),
});

export const portfolioItems = pgTable("portfolio_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  description: text("description"),
  categoryTag: text("category_tag"),
  year: integer("year"),
  coverImageUrl: text("cover_image_url"),
  externalUrl: text("external_url"),
  sortOrder: integer("sort_order").notNull().default(0),
  status: text("status").notNull().default("draft"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().default(sql`now()`),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().default(sql`now()`),
});

export type BlogPost = typeof blogPosts.$inferSelect;
export type NewBlogPost = typeof blogPosts.$inferInsert;
export type PortfolioItem = typeof portfolioItems.$inferSelect;
export type NewPortfolioItem = typeof portfolioItems.$inferInsert;
