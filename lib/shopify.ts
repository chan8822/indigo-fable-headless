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
}

export async function getLiveProducts(): Promise<ShopifyProduct[]> {
  try {
    const res = await fetch(`https://${DOMAIN}/admin/api/2025-10/products.json?limit=12`, {
      headers: {
        "X-Shopify-Access-Token": ADMIN_TOKEN,
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 }
    });
    
    if (!res.ok) {
      console.error("Failed to fetch products:", res.statusText);
      return [];
    }

    const data = await res.json();
    return (data.products || []).map((p: any) => ({
      id: strToGid(p.id),
      title: p.title,
      handle: p.handle,
      descriptionHtml: p.body_html || p.description || "",
      vendor: p.vendor || "The Indigo Fable",
      variants: (p.variants || []).map((v: any) => ({
        id: strToGid(v.id),
        title: v.title,
        price: v.price,
      })),
      images: (p.images || []).map((img: any) => ({
        src: img.src,
        alt: img.alt || p.title,
      })),
    }));
  } catch (err) {
    console.error("Shopify fetch error:", err);
    return [];
  }
}

export async function getProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  try {
    const products = await getLiveProducts();
    const match = products.find((p) => p.handle === handle);
    return match || null;
  } catch (err) {
    return null;
  }
}

export async function getProductsByCollection(collectionHandle: string): Promise<ShopifyProduct[]> {
  try {
    // For our developer store demo, since there are no custom collections, we return all products
    return await getLiveProducts();
  } catch (err) {
    return [];
  }
}

function strToGid(id: number | string): string {
  return id.toString();
}
