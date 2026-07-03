import Link from "next/link";

export default function AdminBar({ active }: { active: "blog" | "portfolio" }) {
  return (
    <header className="admin-bar">
      <div className="admin-bar-left">
        <Link href="/light/admin" className="admin-bar-title">pitchdeck · admin</Link>
        <nav className="admin-tabs">
          <Link href="/light/admin/blog" className={`admin-tab ${active === "blog" ? "is-active" : ""}`}>Blog</Link>
          <Link href="/light/admin/portfolio" className={`admin-tab ${active === "portfolio" ? "is-active" : ""}`}>Portfolio</Link>
        </nav>
      </div>
      <div className="admin-bar-right">
        <Link href="/light" className="admin-action" target="_blank">View site ↗</Link>
        <form action="/light/admin/logout" method="post">
          <button type="submit" className="admin-action">Logout</button>
        </form>
      </div>
    </header>
  );
}
