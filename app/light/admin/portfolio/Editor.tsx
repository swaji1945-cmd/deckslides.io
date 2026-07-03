"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  createPortfolioItem,
  updatePortfolioItem,
  uploadImageAction,
} from "../actions";

type Props = {
  itemId?: string;
  initial?: {
    title: string;
    slug: string;
    description: string;
    categoryTag: string;
    year: string;
    coverImageUrl: string;
    externalUrl: string;
    sortOrder: string;
  };
};

export default function PortfolioEditor({ itemId, initial }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [title, setTitle] = useState(initial?.title || "");
  const [slug, setSlug] = useState(initial?.slug || "");
  const [slugTouched, setSlugTouched] = useState(!!initial?.slug);
  const [description, setDescription] = useState(initial?.description || "");
  const [categoryTag, setCategoryTag] = useState(initial?.categoryTag || "");
  const [year, setYear] = useState(initial?.year || String(new Date().getFullYear()));
  const [coverImageUrl, setCoverImageUrl] = useState(initial?.coverImageUrl || "");
  const [externalUrl, setExternalUrl] = useState(initial?.externalUrl || "");
  const [sortOrder, setSortOrder] = useState(initial?.sortOrder || "0");
  const [coverUploading, setCoverUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slugTouched) return;
    setSlug(
      title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "")
        .slice(0, 80)
    );
  }, [title, slugTouched]);

  const submit = (action: "draft" | "publish" | "save") => {
    setError(null);
    if (!title.trim()) {
      setError("Title is required.");
      return;
    }
    const input = {
      title: title.trim(),
      slug: slug.trim(),
      description: description.trim(),
      categoryTag: categoryTag.trim(),
      year: year.trim(),
      coverImageUrl: coverImageUrl.trim(),
      externalUrl: externalUrl.trim(),
      sortOrder: sortOrder.trim() || "0",
    };
    startTransition(async () => {
      try {
        if (itemId) {
          await updatePortfolioItem(itemId, input, action);
          router.refresh();
        } else {
          await createPortfolioItem(input, action === "save" ? "draft" : action);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Save failed");
      }
    });
  };

  const onCoverChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCoverUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await uploadImageAction(fd);
    setCoverUploading(false);
    if ("url" in res) setCoverImageUrl(res.url);
    else setError(res.error);
  };

  return (
    <div className="admin-editor">
      <div className="admin-editor-bar">
        <div></div>
        <div className="admin-editor-actions">
          <button className="admin-btn" type="button" disabled={isPending} onClick={() => submit("draft")}>
            Save draft
          </button>
          <button className="admin-btn admin-btn--primary" type="button" disabled={isPending} onClick={() => submit("publish")}>
            {isPending ? "Saving…" : "Publish"}
          </button>
        </div>
      </div>

      {error && <p className="admin-error" style={{ marginBottom: 16 }}>{error}</p>}

      <form className="admin-editor-form" onSubmit={(e) => e.preventDefault()}>
        <label className="admin-field">
          <span>Title</span>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Bahrain Rugby" style={{ fontSize: "1.5rem", fontFamily: "'Inter Tight', sans-serif", fontWeight: 600 }} />
        </label>

        <div className="admin-editor-row">
          <label className="admin-field">
            <span>Slug</span>
            <input type="text" value={slug} onChange={(e) => { setSlug(e.target.value); setSlugTouched(true); }} placeholder="bahrain-rugby" />
          </label>
          <label className="admin-field">
            <span>Sort order</span>
            <input type="number" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} />
          </label>
        </div>

        <label className="admin-field">
          <span>Category tag</span>
          <input type="text" value={categoryTag} onChange={(e) => setCategoryTag(e.target.value)} placeholder="Sport · Annual report · 2025" />
        </label>

        <div className="admin-editor-row">
          <label className="admin-field">
            <span>Year</span>
            <input type="number" value={year} onChange={(e) => setYear(e.target.value)} />
          </label>
          <label className="admin-field">
            <span>External URL (where “View deck” links)</span>
            <input type="url" value={externalUrl} onChange={(e) => setExternalUrl(e.target.value)} placeholder="https://…" />
          </label>
        </div>

        <label className="admin-field">
          <span>Cover image</span>
          <div className="admin-cover" onClick={(e) => (e.currentTarget.querySelector("input") as HTMLInputElement)?.click()}>
            {coverImageUrl ? (
              <img src={coverImageUrl} alt="cover preview" />
            ) : (
              <div className="admin-cover-hint">{coverUploading ? "Uploading…" : "Click or drop an image here"}</div>
            )}
            <input type="file" accept="image/*" onChange={onCoverChange} />
          </div>
        </label>

        <label className="admin-field">
          <span>Description</span>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Annual general meeting deck for the club's 1971-est. board."
            style={{ resize: "vertical" }}
          />
        </label>
      </form>
    </div>
  );
}
