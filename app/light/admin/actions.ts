"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { randomUUID } from "node:crypto";
import { isLoggedIn } from "@/lib/auth";
import { uploadImage } from "@/lib/upload";
import { getSupabaseAnon } from "@/lib/supabase";

async function requireAuth() {
  if (!(await isLoggedIn())) throw new Error("Not authenticated");
}

async function getBlogPostById(id: string) {
  const sb = getSupabaseAnon();
  const { data } = await sb.from("blog_posts").select("*").eq("id", id).maybeSingle();
  return data as { id: string; slug: string; status: string; published_at: string | null } | null;
}

async function getPortfolioItemById(id: string) {
  const sb = getSupabaseAnon();
  const { data } = await sb.from("portfolio_items").select("*").eq("id", id).maybeSingle();
  return data as { id: string; slug: string; status: string } | null;
}

function parseBodyJson(s: string): unknown {
  if (!s) return null;
  try { return JSON.parse(s); } catch { return null; }
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 140);
}

/* ============================================================
   BLOG POSTS
============================================================ */

export type BlogInput = {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  coverImageUrl: string;
  bodyHtml: string;
  bodyJson: string;
};

export async function createBlogPost(input: BlogInput, action: "draft" | "publish") {
  await requireAuth();
  const id = randomUUID();
  const slug = (input.slug && slugify(input.slug)) || slugify(input.title) || id.slice(0, 8);
  const now = new Date();
  const sb = getSupabaseAnon();
  const { error } = await sb.from("blog_posts").insert({
    id,
    slug,
    title: input.title,
    excerpt: input.excerpt || null,
    category: input.category,
    cover_image_url: input.coverImageUrl || null,
    body_html: input.bodyHtml,
    body_json: parseBodyJson(input.bodyJson),
    status: action === "publish" ? "published" : "draft",
    published_at: action === "publish" ? now.toISOString() : null,
  });
  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  redirect(`/light/admin/blog/${id}`);
}

export async function updateBlogPost(id: string, input: BlogInput, action: "draft" | "publish" | "save") {
  await requireAuth();
  const existing = await getBlogPostById(id);
  if (!existing) throw new Error("Post not found");

  const slug = (input.slug && slugify(input.slug)) || existing.slug;

  const next: Record<string, unknown> = {
    title: input.title,
    slug,
    excerpt: input.excerpt || null,
    category: input.category,
    cover_image_url: input.coverImageUrl || null,
    body_html: input.bodyHtml,
    body_json: parseBodyJson(input.bodyJson),
    updated_at: new Date().toISOString(),
  };

  if (action === "publish") {
    next.status = "published";
    if (existing.status !== "published") next.published_at = new Date().toISOString();
  } else if (action === "draft") {
    next.status = "draft";
  }

  const sb = getSupabaseAnon();
  const { error } = await sb.from("blog_posts").update(next).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  if (existing.slug !== slug) revalidatePath(`/blog/${existing.slug}`);
}

export async function deleteBlogPost(id: string) {
  await requireAuth();
  const existing = await getBlogPostById(id);
  if (!existing) return;
  const sb = getSupabaseAnon();
  await sb.from("blog_posts").delete().eq("id", id);
  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath(`/blog/${existing.slug}`);
}

export async function togglePublishBlogPost(id: string) {
  await requireAuth();
  const existing = await getBlogPostById(id);
  if (!existing) return;
  const next = existing.status === "published" ? "draft" : "published";
  const update: Record<string, unknown> = {
    status: next,
    updated_at: new Date().toISOString(),
  };
  if (next === "published" && !existing.published_at) {
    update.published_at = new Date().toISOString();
  }
  const sb = getSupabaseAnon();
  await sb.from("blog_posts").update(update).eq("id", id);
  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath(`/blog/${existing.slug}`);
}

/* ============================================================
   PORTFOLIO ITEMS
============================================================ */

export type PortfolioInput = {
  title: string;
  slug: string;
  description: string;
  categoryTag: string;
  year: string;
  coverImageUrl: string;
  externalUrl: string;
  sortOrder: string;
};

export async function createPortfolioItem(input: PortfolioInput, action: "draft" | "publish") {
  await requireAuth();
  const id = randomUUID();
  const slug = (input.slug && slugify(input.slug)) || slugify(input.title) || id.slice(0, 8);
  const sb = getSupabaseAnon();
  const { error } = await sb.from("portfolio_items").insert({
    id,
    slug,
    title: input.title,
    description: input.description || null,
    category_tag: input.categoryTag || null,
    year: input.year ? parseInt(input.year, 10) || null : null,
    cover_image_url: input.coverImageUrl || null,
    external_url: input.externalUrl || null,
    sort_order: parseInt(input.sortOrder || "0", 10) || 0,
    status: action === "publish" ? "published" : "draft",
  });
  if (error) throw new Error(error.message);
  revalidatePath("/");
  redirect(`/light/admin/portfolio/${id}`);
}

export async function updatePortfolioItem(id: string, input: PortfolioInput, action: "draft" | "publish" | "save") {
  await requireAuth();
  const existing = await getPortfolioItemById(id);
  if (!existing) throw new Error("Item not found");
  const slug = (input.slug && slugify(input.slug)) || existing.slug;

  const next: Record<string, unknown> = {
    title: input.title,
    slug,
    description: input.description || null,
    category_tag: input.categoryTag || null,
    year: input.year ? parseInt(input.year, 10) || null : null,
    cover_image_url: input.coverImageUrl || null,
    external_url: input.externalUrl || null,
    sort_order: parseInt(input.sortOrder || "0", 10) || 0,
    updated_at: new Date().toISOString(),
  };
  if (action === "publish") next.status = "published";
  else if (action === "draft") next.status = "draft";

  const sb = getSupabaseAnon();
  const { error } = await sb.from("portfolio_items").update(next).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/");
}

export async function deletePortfolioItem(id: string) {
  await requireAuth();
  const sb = getSupabaseAnon();
  await sb.from("portfolio_items").delete().eq("id", id);
  revalidatePath("/");
}

export async function togglePublishPortfolioItem(id: string) {
  await requireAuth();
  const existing = await getPortfolioItemById(id);
  if (!existing) return;
  const next = existing.status === "published" ? "draft" : "published";
  const sb = getSupabaseAnon();
  await sb.from("portfolio_items").update({ status: next, updated_at: new Date().toISOString() }).eq("id", id);
  revalidatePath("/");
}

/* ============================================================
   IMAGE UPLOAD
============================================================ */

export async function uploadImageAction(formData: FormData): Promise<{ url: string } | { error: string }> {
  await requireAuth();
  const file = formData.get("file");
  if (!(file instanceof File)) return { error: "No file provided" };
  try {
    const url = await uploadImage(file);
    return { url };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Upload failed" };
  }
}
