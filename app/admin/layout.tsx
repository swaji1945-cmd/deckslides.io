import "../globals.css";
import "./admin.css";

export const metadata = {
  title: "Admin — Pitch Deck",
};

export const dynamic = "force-dynamic";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="admin-shell">{children}</div>;
}
