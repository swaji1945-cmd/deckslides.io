"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { deletePortfolioItem, togglePublishPortfolioItem } from "../actions";

export default function RowActions({ id, status }: { id: string; status: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <div className="admin-actions">
      <Link className="admin-action" href={`/light/admin/portfolio/${id}`}>Edit</Link>
      <button
        className="admin-action"
        type="button"
        disabled={isPending}
        onClick={() => {
          if (status === "published" && !confirm("Unpublish this portfolio item?")) return;
          startTransition(async () => {
            await togglePublishPortfolioItem(id);
            router.refresh();
          });
        }}
      >
        {status === "published" ? "Unpublish" : "Publish"}
      </button>
      <button
        className="admin-action admin-action--danger"
        type="button"
        disabled={isPending}
        onClick={() => {
          if (!confirm("Delete this portfolio item permanently?")) return;
          startTransition(async () => {
            await deletePortfolioItem(id);
            router.refresh();
          });
        }}
      >
        Delete
      </button>
    </div>
  );
}
