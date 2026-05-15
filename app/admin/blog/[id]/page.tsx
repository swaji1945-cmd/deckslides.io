import { notFound } from "next/navigation";
import AdminBar from "../../components/AdminBar";
import BlogEditor from "../Editor";
import { getSupabaseAnon } from "@/lib/supabase";

type Props = { params: Promise<{ id: string }> };

type Row = {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string | null;
  cover_image_url: string | null;
  body_json: unknown;
};

export default async function EditBlogPost({ params }: Props) {
  const { id } = await params;
  const sb = getSupabaseAnon();
  const { data } = await sb
    .from("blog_posts")
    .select("id,slug,title,category,excerpt,cover_image_url,body_json")
    .eq("id", id)
    .maybeSingle();
  const post = data as Row | null;
  if (!post) notFound();

  return (
    <>
      <AdminBar active="blog" />
      <div className="admin-main">
        <BlogEditor
          postId={post.id}
          initial={{
            title: post.title,
            slug: post.slug,
            category: post.category,
            excerpt: post.excerpt || "",
            coverImageUrl: post.cover_image_url || "",
            bodyJson: post.body_json ? JSON.stringify(post.body_json) : "",
          }}
        />
      </div>
    </>
  );
}
