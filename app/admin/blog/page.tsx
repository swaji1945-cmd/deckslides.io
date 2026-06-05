import Link from "next/link";
import AdminBar from "../components/AdminBar";
import RowActions from "./RowActions";
import { getSupabaseAnon } from "@/lib/supabase";

type Row = {
  id: string;
  title: string;
  category: string;
  status: string;
  slug: string;
  updated_at: string;
};

export default async function AdminBlogList() {
  const sb = getSupabaseAnon();
  const { data } = await sb
    .from("blog_posts")
    .select("id,title,category,status,slug,updated_at")
    .order("updated_at", { ascending: false });
  const posts = (data ?? []) as Row[];

  return (
    <>
      <AdminBar active="blog" />
      <div className="admin-main">
        <div className="admin-section-head">
          <h1>Blog posts</h1>
          <Link href="/admin/blog/new" className="admin-btn admin-btn--primary">+ New post</Link>
        </div>

        {posts.length === 0 ? (
          <div className="admin-empty">
            <p>No posts yet.</p>
            <Link href="/admin/blog/new" className="admin-btn admin-btn--primary" style={{ marginTop: 16 }}>+ Write your first post</Link>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Status</th>
                <th>Updated</th>
                <th style={{ width: 1 }}></th>
              </tr>
            </thead>
            <tbody>
              {posts.map((p) => (
                <tr key={p.id}>
                  <td>
                    <Link href={`/admin/blog/${p.id}`} style={{ color: "inherit", textDecoration: "none" }}>
                      <strong>{p.title}</strong>
                    </Link>
                  </td>
                  <td>{p.category}</td>
                  <td>
                    <span className={`admin-status admin-status--${p.status}`}>{p.status}</span>
                  </td>
                  <td>{new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(p.updated_at))}</td>
                  <td><RowActions id={p.id} status={p.status} slug={p.slug} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
