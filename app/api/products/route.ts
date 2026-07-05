import { NextResponse } from 'next/server';
import { getLiveProducts } from '@/lib/shopify';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const products = await getLiveProducts();
    return NextResponse.json({ products });
  } catch (err) {
    return NextResponse.json({ products: [], error: 'Failed to load live catalog' }, { status: 500 });
  }
}
