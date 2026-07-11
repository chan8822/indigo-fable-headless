import { getEmberProducts, toShopifyProduct } from './ember';

const DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN || "i0ch0y-kq.myshopify.com";
const ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN || "";
// Live storefront domain whose public /products.json mirrors the same store —
// used as a tokenless fallback when the Admin API is unavailable.
const PUBLIC_STORE_URL = process.env.NEXT_PUBLIC_STORE_URL || "https://theindigofable.com";

export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  descriptionHtml: string;
  vendor: string;
  variants: {
    id: string;
    title: string;
    price: string;
  }[];
  images: {
    src: string;
    alt: string;
  }[];
  scent_profile?: string;
  ingredients?: string;
  burn_time?: string;
  textile_synergy_link?: string;
  tags?: string[];
}

export async function shopifyGraphQLFetch<T>(query: string, variables = {}): Promise<T | null> {
  try {
    const res = await fetch(`https://${DOMAIN}/admin/api/2025-10/graphql.json`, {
      method: 'POST',
      headers: {
        'X-Shopify-Access-Token': ADMIN_TOKEN,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error('GraphQL fetch status error:', res.statusText);
      return null;
    }

    const json = await res.json();
    if (json.errors) {
      console.error('GraphQL syntax/query errors:', json.errors);
      return null;
    }
    return json.data as T;
  } catch (err) {
    console.error('GraphQL network/JSON parse error:', err);
    return null;
  }
}

interface PublicProductJson {
  id: number;
  title: string;
  handle: string;
  body_html: string;
  vendor: string;
  tags: string[];
  variants: { id: number; title: string; price: string; available?: boolean }[];
  images: { src: string; alt?: string | null }[];
}

/** Tokenless catalog read from the live store's public /products.json. */
export async function getPublicCatalog(): Promise<ShopifyProduct[]> {
  try {
    const res = await fetch(`${PUBLIC_STORE_URL}/products.json?limit=250`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const json = (await res.json()) as { products?: PublicProductJson[] };
    if (!json.products) return [];
    return json.products.map((p) => ({
      id: `gid://shopify/Product/${p.id}`,
      title: p.title,
      handle: p.handle,
      descriptionHtml: p.body_html || "",
      vendor: p.vendor || "The Indigo Fable",
      variants: p.variants.map((v) => ({
        id: `gid://shopify/ProductVariant/${v.id}`,
        title: v.title,
        price: v.price,
      })),
      images: p.images.map((img) => ({
        src: img.src,
        alt: img.alt || p.title,
      })),
      tags: p.tags,
    }));
  } catch (err) {
    console.error("Public catalog fetch error:", err);
    return [];
  }
}

export async function getLiveProducts(): Promise<ShopifyProduct[]> {
  const query = `
    query GetProducts {
      products(first: 12) {
        edges {
          node {
            id
            title
            handle
            descriptionHtml
            vendor
            variants(first: 5) {
              edges {
                node {
                  id
                  title
                  price
                }
              }
            }
            images(first: 5) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
          }
        }
      }
    }
  `;

  interface GraphQLProductNode {
    id: string;
    title: string;
    handle: string;
    descriptionHtml: string;
    vendor: string;
    variants: {
      edges: {
        node: {
          id: string;
          title: string;
          price: string;
        };
      }[];
    };
    images: {
      edges: {
        node: {
          url: string;
          altText: string | null;
        };
      }[];
    };
  }

  interface ProductsQueryResult {
    products: {
      edges: {
        node: GraphQLProductNode;
      }[];
    };
  }

  const data = await shopifyGraphQLFetch<ProductsQueryResult>(query);

  if (!data || !data.products) {
    console.warn("Admin GraphQL unavailable; falling back to public catalog + fragrance mocks");
    const publicCatalog = await getPublicCatalog();
    return [...publicCatalog, ...getMockProducts()];
  }

  const live: ShopifyProduct[] = data.products.edges.map(({ node }) => ({
    id: node.id,
    title: node.title,
    handle: node.handle,
    descriptionHtml: node.descriptionHtml || "",
    vendor: node.vendor || "The Indigo Fable",
    variants: node.variants.edges.map(({ node: v }) => ({
      id: v.id,
      title: v.title,
      price: v.price,
    })),
    images: node.images.edges.map(({ node: img }) => ({
      src: img.url,
      alt: img.altText || node.title,
    })),
  }));

  return [...live, ...getMockProducts()];
}

function getMockProducts(): ShopifyProduct[] {
  // House II · The Ember — the fragrance line. lib/ember.ts is the source of
  // truth for the six SKUs; swap ids/variants for Shopify GIDs once listed.
  return getEmberProducts().map(toShopifyProduct);
}

export async function getProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  const mocks = getMockProducts();
  const mockMatch = mocks.find(p => p.handle === handle);
  if (mockMatch) return mockMatch;

  const query = `
    query GetProduct($handle: String!) {
      productByHandle(handle: $handle) {
        id
        title
        handle
        descriptionHtml
        vendor
        variants(first: 5) {
          edges {
            node {
              id
              title
              price
            }
          }
        }
        images(first: 5) {
          edges {
            node {
              url
              altText
            }
          }
        }
      }
    }
  `;

  interface GraphQLProductNode {
    id: string;
    title: string;
    handle: string;
    descriptionHtml: string;
    vendor: string;
    variants: {
      edges: {
        node: {
          id: string;
          title: string;
          price: string;
        };
      }[];
    };
    images: {
      edges: {
        node: {
          url: string;
          altText: string | null;
        };
      }[];
    };
  }

  interface SingleProductResult {
    productByHandle: GraphQLProductNode | null;
  }

  try {
    const data = await shopifyGraphQLFetch<SingleProductResult>(query, { handle });
    if (!data || !data.productByHandle) {
      const publicCatalog = await getPublicCatalog();
      return publicCatalog.find((p) => p.handle === handle) || null;
    }

    const node = data.productByHandle;
    return {
      id: node.id,
      title: node.title,
      handle: node.handle,
      descriptionHtml: node.descriptionHtml || "",
      vendor: node.vendor || "The Indigo Fable",
      variants: node.variants.edges.map(({ node: v }) => ({
        id: v.id,
        title: v.title,
        price: v.price,
      })),
      images: node.images.edges.map(({ node: img }) => ({
        src: img.url,
        alt: img.altText || node.title,
      })),
    };
  } catch (err) {
    return null;
  }
}

export async function getProductsByCollection(collectionHandle: string): Promise<ShopifyProduct[]> {
  try {
    return await getLiveProducts();
  } catch (err) {
    return [];
  }
}
