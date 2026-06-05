"use client";

import { useState, useTransition } from "react";
import { loginAction } from "./actions";

export default function LoginForm({ next }: { next: string }) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  return (
    <form
      className="admin-login-form"
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        startTransition(async () => {
          const res = await loginAction(fd);
          if (res?.error) setError(res.error);
          else setError(null);
        });
      }}
    >
      <input type="hidden" name="next" value={next} />
      <label className="admin-field">
        <span>Password</span>
        <input
          type="password"
          name="password"
          autoFocus
          autoComplete="current-password"
          required
        />
      </label>
      {error && <p className="admin-error">{error}</p>}
      <button type="submit" className="admin-btn admin-btn--primary" disabled={isPending}>
        {isPending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
