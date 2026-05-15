import Link from "next/link";

export default function AdminBar({ active }: { active: "blog" | "portfolio" }) {
  return (
    <header className="admin-bar">
      <div className="admin-bar-left">
        <Link href="/admin" className="admin-bar-title">pitchdeck · admin</Link>
        <nav className="admin-tabs">
          <Link href="/admin/blog" className={`admin-tab ${active === "blog" ? "is-active" : ""}`}>Blog</Link>
          <Link href="/admin/portfolio" className={`admin-tab ${active === "portfolio" ? "is-active" : ""}`}>Portfolio</Link>
        </nav>
      </div>
      <div className="admin-bar-right">
        <Link href="/" className="admin-action" target="_blank">View site ↗</Link>
        <form action="/admin/logout" method="post">
          <button type="submit" className="admin-action">Logout</button>
        </form>
      </div>
    </header>
  );
}
