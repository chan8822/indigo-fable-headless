import React from 'react';
import { notFound } from 'next/navigation';
import { STORE_POLICIES } from '@/lib/policies';

const DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN || "i0ch0y-kq.myshopify.com";
const ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN || "";

export const dynamic = 'force-dynamic';

async function getPolicy(handle: string) {
  try {
    const res = await fetch(`https://${DOMAIN}/admin/api/2025-10/policies.json`, {
      headers: {
        "X-Shopify-Access-Token": ADMIN_TOKEN,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) return STORE_POLICIES[handle] || null;
    const data = await res.json();
    const policies = data.policies || [];
    return (
      policies.find((p: any) => p.handle === handle || p.title.toLowerCase().replace(/\s+/g, '-') === handle) ||
      STORE_POLICIES[handle] ||
      null
    );
  } catch (err) {
    return STORE_POLICIES[handle] || null;
  }
}

export default async function PolicyPage({ params }: { params: { handle: string } }) {
  const policy = await getPolicy(params.handle);

  if (!policy) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <div className="bg-white rounded-3xl p-10 md:p-16 border border-stone-200 shadow-sm space-y-10">
        <div className="space-y-4 border-b border-gold-500/20 pb-8">
          <span className="text-xs uppercase tracking-[0.25em] text-gold-500 font-semibold block">
            Official Store Policy
          </span>
          <h1 className="text-3xl md:text-5xl font-serif text-indigo-950">
            {policy.title}
          </h1>
        </div>

        <div 
          className="prose prose-stone max-w-none text-sm md:text-base leading-relaxed font-light space-y-6 text-stone-700"
          dangerouslySetInnerHTML={{ __html: policy.body }}
        />
      </div>
    </div>
  );
}
