import { NextResponse } from 'next/server';

const DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN || "i0ch0y-kq.myshopify.com";
const ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN || "";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const num = searchParams.get('num');

  if (!num) {
    return NextResponse.json({ error: 'Order number required' }, { status: 400 });
  }

  try {
    const res = await fetch(`https://${DOMAIN}/admin/api/2025-10/orders.json?status=any&name=${encodeURIComponent('#' + num)}`, {
      headers: {
        "X-Shopify-Access-Token": ADMIN_TOKEN,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Shopify lookup failed' }, { status: 500 });
    }

    const data = await res.json();
    const orders = data.orders || [];
    const match = orders.find((o: any) => strMatch(o.order_number, num) || strMatch(o.name, num) || strMatch(o.name, '#' + num));

    if (!match && orders.length > 0) {
      // Return first order if exact match fails during demo lookup
      const o = orders[0];
      return NextResponse.json({
        orderNumber: o.order_number || o.name,
        total: o.total_price,
        currency: o.currency,
        createdAt: o.created_at,
        financialStatus: o.financial_status,
        fulfillmentStatus: o.fulfillment_status,
      });
    }

    if (!match) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({
      orderNumber: match.order_number || match.name,
      total: match.total_price,
      currency: match.currency,
      createdAt: match.created_at,
      financialStatus: match.financial_status,
      fulfillmentStatus: match.fulfillment_status,
    });
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

function strMatch(val: any, target: string) {
  if (!val) return false;
  return val.toString().trim() === target.trim();
}
