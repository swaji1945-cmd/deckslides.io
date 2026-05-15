import type { BlogPost, PortfolioItem } from "./db/schema";
import { fallbackPortfolio, fallbackBlogPosts } from "./fallback";
import { getSupabaseAnon } from "./supabase";

type BlogRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  category: string;
  cover_image_url: string | null;
  body_html: string | null;
  body_json: unknown;
  status: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

type PortfolioRow = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  category_tag: string | null;
  year: number | null;
  cover_image_url: string | null;
  external_url: string | null;
  sort_order: number;
  status: string;
  created_at: string;
  updated_at: string;
};

function mapBlog(r: BlogRow): BlogPost {
  return {
    id: r.id,
    slug: r.slug,
    title: r.title,
    excerpt: r.excerpt,
    category: r.category,
    coverImageUrl: r.cover_image_url,
    bodyHtml: r.body_html,
    bodyJson: r.body_json,
    status: r.status,
    publishedAt: r.published_at ? new Date(r.published_at) : null,
    createdAt: new Date(r.created_at),
    updatedAt: new Date(r.updated_at),
  };
}

function mapPortfolio(r: PortfolioRow): PortfolioItem {
  return {
    id: r.id,
    slug: r.slug,
    title: r.title,
    description: r.description,
    categoryTag: r.category_tag,
    year: r.year,
    coverImageUrl: r.cover_image_url,
    externalUrl: r.external_url,
    sortOrder: r.sort_order,
    status: r.status,
    createdAt: new Date(r.created_at),
    updatedAt: new Date(r.updated_at),
  };
}

async function safe<T>(run: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await run();
  } catch (err) {
    console.error("[queries] Supabase unavailable, returning fallback:", (err as Error).message);
    return fallback;
  }
}

export async function getPublishedPortfolioItems(): Promise<PortfolioItem[]> {
  return safe(async () => {
    const sb = getSupabaseAnon();
    const { data, error } = await sb
      .from("portfolio_items")
      .select("*")
      .eq("status", "published")
      .order("sort_order", { ascending: true });
    if (error) throw new Error(error.message);
    return (data as PortfolioRow[]).map(mapPortfolio);
  }, fallbackPortfolio);
}

export async function getLatestBlogPosts(limit = 3): Promise<BlogPost[]> {
  return safe(async () => {
    const sb = getSupabaseAnon();
    const { data, error } = await sb
      .from("blog_posts")
      .select("*")
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(limit);
    if (error) throw new Error(error.message);
    return (data as BlogRow[]).map(mapBlog);
  }, fallbackBlogPosts.slice(0, limit));
}

export async function getAllPublishedBlogPosts(): Promise<BlogPost[]> {
  return safe(async () => {
    const sb = getSupabaseAnon();
    const { data, error } = await sb
      .from("blog_posts")
      .select("*")
      .eq("status", "published")
      .order("published_at", { ascending: false });
    if (error) throw new Error(error.message);
    return (data as BlogRow[]).map(mapBlog);
  }, fallbackBlogPosts);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  return safe(async () => {
    const sb = getSupabaseAnon();
    const { data, error } = await sb
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .limit(1)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return data ? mapBlog(data as BlogRow) : null;
  }, fallbackBlogPosts.find((p) => p.slug === slug) ?? null);
}

export async function getPortfolioItemBySlug(slug: string): Promise<PortfolioItem | null> {
  return safe(async () => {
    const sb = getSupabaseAnon();
    const { data, error } = await sb
      .from("portfolio_items")
      .select("*")
      .eq("slug", slug)
      .limit(1)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return data ? mapPortfolio(data as PortfolioRow) : null;
  }, fallbackPortfolio.find((p) => p.slug === slug) ?? null);
}
