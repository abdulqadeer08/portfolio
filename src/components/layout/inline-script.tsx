/**
 * Runs a script during HTML parsing, before first paint. On the client the type
 * becomes text/plain, so React doesn't warn about rendering a <script> tag
 * (the pattern from Next.js' "Preventing flash before hydration" guide).
 */
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
