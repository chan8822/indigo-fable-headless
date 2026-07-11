import React from 'react';
import { notFound } from 'next/navigation';
import { getProductByHandle } from '@/lib/shopify';
import { getEmberByHandle, isEmberHandle } from '@/lib/ember';
import { StitchesPDP } from '@/components/StitchesPDP';
import { EmberPDP } from '@/components/ember/EmberPDP';

export const dynamic = 'force-dynamic';

export default async function ProductDetailPage({ params }: { params: { handle: string } }) {
  // House II · The Ember gets its own PDP (design-system.md §6).
  if (isEmberHandle(params.handle)) {
    const entry = getEmberByHandle(params.handle);
    if (!entry) notFound();
    return <EmberPDP entry={entry} />;
  }

  const product = await getProductByHandle(params.handle);

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-khadi min-h-screen">
      <StitchesPDP product={product} />
    </div>
  );
}
