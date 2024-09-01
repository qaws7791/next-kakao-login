export function createUrlWithParams(
  url: string,
  params: Record<string, string>
) {
  const urlObject = new URL(url);
  Object.entries(params).forEach(([key, value]) => {
    urlObject.searchParams.append(key, value);
  });
  return urlObject;
}
