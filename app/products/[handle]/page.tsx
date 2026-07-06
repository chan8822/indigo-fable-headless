import React from 'react';
import { notFound } from 'next/navigation';
import { getProductByHandle } from '@/lib/shopify';
import { StitchesPDP } from '@/components/StitchesPDP';

export const dynamic = 'force-dynamic';

export default async function ProductDetailPage({ params }: { params: { handle: string } }) {
  const product = await getProductByHandle(params.handle);

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-stone-50 min-h-screen">
      <StitchesPDP product={product} />
    </div>
  );
}
