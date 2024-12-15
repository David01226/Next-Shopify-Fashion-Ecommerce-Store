import { Menu } from "./types"

export async function shopifyFetch<T>({
  cache = "force-cache",
  headers,
  query,
  tags,
  varaibles,
}: {
  cache?: RequestCache;
  headers: HeadersInit;
  query: string;
  tags?: string[];
  varaibles?: ExtractVariables<T>;
}): Promise<{status: number; body: T} | never> {
  try {
    const result = fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
        "X-Shopify-Storefront-Access-Token": key,
        ...headers,
      },
      body: JSON.stringify({
        ...(query && { query }),
        ...(variables && { variables })
      }),
      cache,
      ...(tags && {next: { tags }}),
    })

    const body = await result.json();

    if (body.errors) {
      throw body.errors[0];
    }

    return {
      status: (await result).status,
      body,
    }
  } catch (error) {
    if (isShopifyError(error)) {
      throw {
        cause: error.cause?.toString() || "unknown",
        status: error.status || 500,
        message: error.message,
        query,
      }
    };

    throw {
      error,
      query,
    };
  }
}

export async function getMenu(handle:string): Promise<Menu[]> {
  const res = await shopifyFetch<shopifyMenuOperation>({
    query: getMenuQuery,
    tags: [TAGS.collections],
    variables: {
      handle,
    },
  })

  return (
    res.body?.data?.menu?.items.map((item: {title: string, url: string})=>{
      title: item.title,
      path: item.url
        .replace(domain, "")
        .replace("/collections", "/search")
        .replace("/pages", "")
    })
  )
}