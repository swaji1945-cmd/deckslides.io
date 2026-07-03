"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { deleteBlogPost, togglePublishBlogPost } from "../actions";

export default function RowActions({ id, status, slug }: { id: string; status: string; slug: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <div className="admin-actions">
      <Link className="admin-action" href={`/light/admin/blog/${id}`}>Edit</Link>
      {status === "published" && (
        <Link className="admin-action" href={`/light/blog/${slug}`} target="_blank">View</Link>
      )}
      <button
        className="admin-action"
        type="button"
        disabled={isPending}
        onClick={() => {
          if (status === "published" && !confirm("Unpublish this post? It will no longer be visible on the site.")) return;
          startTransition(async () => {
            await togglePublishBlogPost(id);
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
          if (!confirm("Delete this post permanently?")) return;
          startTransition(async () => {
            await deleteBlogPost(id);
            router.refresh();
          });
        }}
      >
        Delete
      </button>
    </div>
  );
}
