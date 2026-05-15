import Link from "next/link";
import AdminBar from "../components/AdminBar";
import RowActions from "./RowActions";
import { getSupabaseAnon } from "@/lib/supabase";

type Row = {
  id: string;
  title: string;
  category_tag: string | null;
  sort_order: number;
  status: string;
};

export default async function AdminPortfolioList() {
  const sb = getSupabaseAnon();
  const { data } = await sb
    .from("portfolio_items")
    .select("id,title,category_tag,sort_order,status")
    .order("sort_order", { ascending: true });
  const items = (data ?? []) as Row[];

  return (
    <>
      <AdminBar active="portfolio" />
      <div className="admin-main">
        <div className="admin-section-head">
          <h1>Portfolio</h1>
          <Link href="/admin/portfolio/new" className="admin-btn admin-btn--primary">+ New item</Link>
        </div>

        {items.length === 0 ? (
          <div className="admin-empty">
            <p>No portfolio items yet.</p>
            <Link href="/admin/portfolio/new" className="admin-btn admin-btn--primary" style={{ marginTop: 16 }}>+ Add your first</Link>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Order</th>
                <th>Status</th>
                <th style={{ width: 1 }}></th>
              </tr>
            </thead>
            <tbody>
              {items.map((p) => (
                <tr key={p.id}>
                  <td>
                    <Link href={`/admin/portfolio/${p.id}`} style={{ color: "inherit", textDecoration: "none" }}>
                      <strong>{p.title}</strong>
                    </Link>
                  </td>
                  <td>{p.category_tag || "—"}</td>
                  <td>{p.sort_order}</td>
                  <td><span className={`admin-status admin-status--${p.status}`}>{p.status}</span></td>
                  <td><RowActions id={p.id} status={p.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
