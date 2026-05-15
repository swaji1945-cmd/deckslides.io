/**
 * One place to edit the studio's contact info + social handles.
 * Update these and they propagate everywhere (footer, contact section,
 * mailto buttons, etc.). Set any URL to "" to hide that link.
 */

export const site = {
  email: "hello@pitchdeck.com",
  location: "Remote · Worldwide",
  social: {
    instagram: "https://instagram.com/", // TODO: paste your handle URL
    linkedin: "https://linkedin.com/", // TODO: paste your company URL
    x: "https://x.com/", // TODO: paste your handle URL
  },
} as const;

export const mailto = (subject?: string, body?: string) => {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const qs = params.toString();
  return `mailto:${site.email}${qs ? `?${qs}` : ""}`;
};
