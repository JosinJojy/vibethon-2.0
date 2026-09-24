export function getValidatedUrl(urlStr: string | null): string | null {
  if (!urlStr) return null;
  try {
    const url = new URL(urlStr);
    if (url.protocol !== 'https:') return null;
    return url.href;
  } catch {
    return null;
  }
}
