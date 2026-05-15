import { notFound } from "next/navigation";
import AdminBar from "../../components/AdminBar";
import PortfolioEditor from "../Editor";
import { getSupabaseAnon } from "@/lib/supabase";

type Props = { params: Promise<{ id: string }> };

type Row = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  category_tag: string | null;
  year: number | null;
  cover_image_url: string | null;
  external_url: string | null;
  sort_order: number;
};

export default async function EditPortfolioItem({ params }: Props) {
  const { id } = await params;
  const sb = getSupabaseAnon();
  const { data } = await sb
    .from("portfolio_items")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  const item = data as Row | null;
  if (!item) notFound();

  return (
    <>
      <AdminBar active="portfolio" />
      <div className="admin-main">
        <PortfolioEditor
          itemId={item.id}
          initial={{
            title: item.title,
            slug: item.slug,
            description: item.description || "",
            categoryTag: item.category_tag || "",
            year: item.year ? String(item.year) : "",
            coverImageUrl: item.cover_image_url || "",
            externalUrl: item.external_url || "",
            sortOrder: String(item.sort_order),
          }}
        />
      </div>
    </>
  );
}
