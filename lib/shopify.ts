const DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN || "i0ch0y-kq.myshopify.com";
const ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN || "";

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
    console.warn("Falling back to mocks only due to failed GraphQL query");
    return getMockProducts();
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
  return [
    {
      id: "mock-fragrance-1",
      title: "Jaipuri Rose & Monsoon Rain Incense",
      handle: "jaipuri-rose-monsoon-rain-incense",
      descriptionHtml: "Inspired by sudden monsoon showers over Rajput palace courtyards. Crafted with fresh Kannauj Damask Rose and earthy vetiver root.",
      vendor: "The Indigo Fable",
      variants: [{ id: "mock-variant-f1", title: "Standard Box (40 sticks)", price: "299.00" }],
      images: [{ src: "https://lh3.googleusercontent.com/aida/AP1WRLtCBgcx-G9rKHLLwnWSzdiB82XG8D_qe7E6qPRIFY1L_pMZOpZFCk0Ifjg2AUSBWPfHtPvOpUKmRVxxuAxIwpJH-vfb_Y4l_5uX_c_o6GaSDc_xHLhURjkm4xMq_JHoMIg9A8yzTqUl8_i_jiXiT99opDd77DOHEXOoaWKrY5pc3ynmj8EeJfFK_R8HwwtnUioB7XdaMRtKHDOlw19R0xJbzpGQWn9jWejQQD6Un-_WQM95iNjEzIjqpqiC", alt: "Jaipuri Rose Incense" }],
      scent_profile: "Damask Rose, Vetiver (Khus), and Wet Earth (Geosmin)",
      ingredients: "100% Charcoal-Free dry wood dust base, wild harvested vetiver root powder, Kannauj rose essential oil.",
      burn_time: "45-60 minutes per stick",
      textile_synergy_link: "the-indigo-gold-hand-stitched-organic-cotton-quilt",
      tags: ["fragrance-type:bambooless", "collection:jaipuri-rose"]
    },
    {
      id: "mock-fragrance-2",
      title: "Indigo Nights Signature Incense",
      handle: "indigo-nights-incense",
      descriptionHtml: "Our signature blend designed as a luxury sleep aid. Blends Kashmiri lavender flowers with warm Mysore sandalwood base.",
      vendor: "The Indigo Fable",
      variants: [{ id: "mock-variant-f2", title: "Standard Box (40 sticks)", price: "299.00" }],
      images: [{ src: "https://lh3.googleusercontent.com/aida/AP1WRLvePLKmfu-RkqzJeFBThsiqL4cj6nWZVrPN0SeZ_uLItOvxH6h3-O09zJxH7fMzTGm9wc0DWkLbSPdpgPBZtRBqjZft1rnFRGIJq7gwVVERVaVr3dlyPjq4ublhH333_CnNd2qiTfUf2iVLjLxWS_3D2ZuGgeZOdpQ617fl21jOsv8Gt9alB3xaAhIyBQtS_uEzBMUX4xe4AO1JCTgyUkN18rPIrqj3BqYnvKn3KWe0Ydj7ffjBiOrkXWTg", alt: "Indigo Nights Incense" }],
      scent_profile: "Kashmiri Lavender, Mysore Sandalwood, Frankincense",
      ingredients: "Organic guar gum binder, sandalwood powder base, Kashmiri lavender oil, natural Frankincense resin.",
      burn_time: "45-60 minutes per stick",
      textile_synergy_link: "the-indigo-gold-hand-stitched-organic-cotton-quilt",
      tags: ["fragrance-type:bambooless", "collection:indigo-nights"]
    },
    {
      id: "mock-fragrance-3",
      title: "Sacred Guggul & Golden Amber Dhoop Cones",
      handle: "sacred-guggul-golden-amber-dhoop",
      descriptionHtml: "Deeply grounding, traditional dhoop cones. Smoulders slowly to fill your meditation space with earthy cedarwood and guggul resin.",
      vendor: "The Indigo Fable",
      variants: [{ id: "mock-variant-f3", title: "Standard Box (24 cones)", price: "249.00" }],
      images: [{ src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBrZ2Y82xlJUQSIKI3hUPzyMB4IZyqr-T0uGWdy3Ix96O8fGu7DieQQ3kssyiA-7R6zo-DE7577gQ0XYMNuznhL3cDDcZJsSYWxm8JiLvOF4VZvYqDqZvWe1BGzPBcYxZ7P5WiDeRomLBzlyqgSE05QXIK0Bk9PiuK9KKF3yQ6r-yr78trsHA_XCL2ReozQnYhEAtpVX88hOfmzBaMIx4AhRKCAJrNRlSQ5z0sX9lFp8hDFrtqb6NJfDmyqo4Wzmo4sOBSvVUXEDMVT", alt: "Sacred Guggul Dhoop Cones" }],
      scent_profile: "Earthy Guggul Resin, Sweet Amber, Cedarwood",
      ingredients: "Hand-pressed guggul tree gum resin, amber powder, Himalayan cedarwood dust.",
      burn_time: "30-40 minutes per cone",
      textile_synergy_link: "the-indigo-gold-hand-stitched-organic-cotton-quilt",
      tags: ["fragrance-type:dhoop", "collection:sacred-guggul"]
    }
  ];
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
    if (!data || !data.productByHandle) return null;

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
