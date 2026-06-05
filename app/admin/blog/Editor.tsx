"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { generateHTML } from "@tiptap/html";
import { createBlogPost, updateBlogPost, uploadImageAction } from "../actions";

const EXTENSIONS = [
  StarterKit.configure({ heading: { levels: [2, 3] } }),
  Link.configure({ openOnClick: false, autolink: true, HTMLAttributes: { rel: "noopener noreferrer" } }),
  Image,
  Placeholder.configure({ placeholder: "Start writing your post…" }),
];

const CATEGORIES = ["Guide", "Article", "Online course"];

type Props = {
  postId?: string;
  initial?: {
    title: string;
    slug: string;
    category: string;
    excerpt: string;
    coverImageUrl: string;
    bodyJson: string;
  };
};

export default function BlogEditor({ postId, initial }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [autoSavedAt, setAutoSavedAt] = useState<Date | null>(null);

  const [title, setTitle] = useState(initial?.title || "");
  const [slug, setSlug] = useState(initial?.slug || "");
  const [slugTouched, setSlugTouched] = useState(!!initial?.slug);
  const [category, setCategory] = useState(initial?.category || CATEGORIES[0]);
  const [excerpt, setExcerpt] = useState(initial?.excerpt || "");
  const [coverImageUrl, setCoverImageUrl] = useState(initial?.coverImageUrl || "");
  const [coverUploading, setCoverUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initialJson = (() => {
    if (!initial?.bodyJson) return undefined;
    try { return JSON.parse(initial.bodyJson); } catch { return undefined; }
  })();

  const editor = useEditor({
    extensions: EXTENSIONS,
    content: initialJson || "",
    editorProps: {
      attributes: { class: "admin-editor-content" },
    },
    immediatelyRender: false,
  });

  // Auto-slug from title until user types in the slug field
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

  const buildInput = () => {
    const json = editor?.getJSON() || { type: "doc", content: [] };
    const html = generateHTML(json, EXTENSIONS);
    return {
      title: title.trim(),
      slug: slug.trim(),
      category: category.trim(),
      excerpt: excerpt.trim(),
      coverImageUrl: coverImageUrl.trim(),
      bodyHtml: html,
      bodyJson: JSON.stringify(json),
    };
  };

  const submit = (action: "draft" | "publish" | "save") => {
    setError(null);
    if (!title.trim()) {
      setError("Title is required.");
      return;
    }
    const input = buildInput();
    startTransition(async () => {
      try {
        if (postId) {
          await updateBlogPost(postId, input, action);
          setAutoSavedAt(new Date());
          router.refresh();
        } else {
          await createBlogPost(input, action === "save" ? "draft" : action);
          // createBlogPost redirects, so this returns void
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Save failed");
      }
    });
  };

  // Auto-save every 12s while editing existing post
  useEffect(() => {
    if (!postId || !editor) return;
    const id = setInterval(() => {
      if (!title.trim()) return;
      submit("save");
    }, 12000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId, editor, title, slug, category, excerpt, coverImageUrl]);

  // Paste-image upload via Tiptap
  useEffect(() => {
    if (!editor) return;
    const handler = (event: Event) => {
      const ev = event as ClipboardEvent;
      const items = ev.clipboardData?.items;
      if (!items) return;
      for (const item of items) {
        if (item.type.startsWith("image/")) {
          const file = item.getAsFile();
          if (!file) continue;
          ev.preventDefault();
          const fd = new FormData();
          fd.append("file", file);
          uploadImageAction(fd).then((res) => {
            if ("url" in res) {
              editor.chain().focus().setImage({ src: res.url }).run();
            }
          });
          return;
        }
      }
    };
    editor.view.dom.addEventListener("paste", handler);
    return () => editor.view.dom.removeEventListener("paste", handler);
  }, [editor]);

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

  const insertLink = () => {
    if (!editor) return;
    const url = prompt("Link URL");
    if (!url) return;
    editor.chain().focus().setLink({ href: url }).run();
  };

  const insertImage = async () => {
    if (!editor) return;
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      const fd = new FormData();
      fd.append("file", file);
      const res = await uploadImageAction(fd);
      if ("url" in res) editor.chain().focus().setImage({ src: res.url }).run();
      else setError(res.error);
    };
    input.click();
  };

  return (
    <div className="admin-editor">
      <div className="admin-editor-bar">
        <div>
          {autoSavedAt && (
            <span className="admin-autosave">Auto-saved {autoSavedAt.toLocaleTimeString()}</span>
          )}
        </div>
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
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Why most pitch decks fail."
            style={{ fontSize: "1.5rem", fontFamily: "'Inter Tight', sans-serif", fontWeight: 600 }}
          />
        </label>

        <div className="admin-editor-row">
          <label className="admin-field">
            <span>Slug</span>
            <input
              type="text"
              value={slug}
              onChange={(e) => { setSlug(e.target.value); setSlugTouched(true); }}
              placeholder="why-most-pitch-decks-fail"
            />
          </label>
          <label className="admin-field">
            <span>Category</span>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </label>
        </div>

        <label className="admin-field">
          <span>Excerpt</span>
          <input
            type="text"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="One-or-two-line subtitle for the card"
          />
        </label>

        <label className="admin-field">
          <span>Cover image</span>
          <div className="admin-cover" onClick={(e) => (e.currentTarget.querySelector("input") as HTMLInputElement)?.click()}>
            {coverImageUrl ? (
              <img src={coverImageUrl} alt="cover preview" />
            ) : (
              <div className="admin-cover-hint">
                {coverUploading ? "Uploading…" : "Click or drop an image here"}
              </div>
            )}
            <input type="file" accept="image/*" onChange={onCoverChange} />
          </div>
        </label>

        <label className="admin-field">
          <span>Body</span>
          <div className="admin-editor-body">
            <div className="admin-editor-toolbar">
              <button type="button" onClick={() => editor?.chain().focus().toggleBold().run()} className={editor?.isActive("bold") ? "is-active" : ""}><strong>B</strong></button>
              <button type="button" onClick={() => editor?.chain().focus().toggleItalic().run()} className={editor?.isActive("italic") ? "is-active" : ""}><em>I</em></button>
              <button type="button" onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} className={editor?.isActive("heading", { level: 2 }) ? "is-active" : ""}>H2</button>
              <button type="button" onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()} className={editor?.isActive("heading", { level: 3 }) ? "is-active" : ""}>H3</button>
              <button type="button" onClick={() => editor?.chain().focus().toggleBulletList().run()} className={editor?.isActive("bulletList") ? "is-active" : ""}>· List</button>
              <button type="button" onClick={() => editor?.chain().focus().toggleOrderedList().run()} className={editor?.isActive("orderedList") ? "is-active" : ""}>1. List</button>
              <button type="button" onClick={() => editor?.chain().focus().toggleBlockquote().run()} className={editor?.isActive("blockquote") ? "is-active" : ""}>Quote</button>
              <button type="button" onClick={insertLink}>Link</button>
              <button type="button" onClick={insertImage}>Image</button>
            </div>
            <EditorContent editor={editor} />
          </div>
        </label>
      </form>
    </div>
  );
}
