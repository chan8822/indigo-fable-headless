'use client';

import React, { useState, useEffect } from 'react';
import { styled } from '@/stitches.config';
import { useCart } from '@/context/CartContext';
import { useRegion } from '@/context/RegionContext';
import { ShopifyProduct } from '@/lib/shopify';

const Grid = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '$8',
  '@sm': { gridTemplateColumns: '1fr 1fr' },
  '@md': { gridTemplateColumns: '1fr 1fr 1fr' },
  py: '$8',
});

const Header = styled('div', {
  textAlign: 'center',
  py: '$12',
  borderBottom: '1px solid $stoneSoft',
  mb: '$8',
});

const Title = styled('h1', {
  fontFamily: '$serif',
  fontSize: '$3xl',
  color: '$indigoMidnight',
  fontWeight: '$light',
  textTransform: 'capitalize',
  '@md': { fontSize: '$4xl' },
});

const Subtitle = styled('p', {
  fontFamily: '$sans',
  fontSize: '$sm',
  color: '$stoneGray',
  mt: '$2',
});

const Card = styled('div', {
  bg: '$rawCotton',
  borderRadius: '$medium',
  border: '1px solid $stoneSoft',
  overflow: 'hidden',
  transition: '$smooth',
  display: 'flex',
  flexDirection: 'column',
  p: '$4',
  '&:hover': {
    boxShadow: '$deep',
    transform: 'translateY(-4px)',
  },
});

const ImageArea = styled('a', {
  display: 'block',
  width: '100%',
  aspectRatio: '4 / 5',
  bg: '$stoneSoft',
  borderRadius: '$small',
  overflow: 'hidden',
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: '$smooth',
  },
  '&:hover img': {
    transform: 'scale(1.02)',
  },
});

const Details = styled('div', {
  mt: '$4',
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
});

const ProductTitle = styled('a', {
  fontFamily: '$serif',
  fontSize: '$lg',
  color: '$indigoMidnight',
  fontWeight: '$light',
  textDecoration: 'none',
  '&:hover': {
    color: '$goldShimmer',
  },
});

const ProductPrice = styled('span', {
  fontFamily: '$sans',
  fontSize: '$sm',
  fontWeight: '$medium',
  color: '$indigoDeep',
  mt: '$1',
  mb: '$4',
});

const Button = styled('button', {
  fontFamily: '$sans',
  fontSize: '$xs',
  textTransform: 'uppercase',
  py: '$2.5',
  bg: '$goldChampagne',
  color: '$indigoMidnight',
  border: '1px solid $goldShimmer',
  borderRadius: '$small',
  cursor: 'pointer',
  transition: '$smooth',
  marginTop: 'auto',
  '&:hover': {
    bg: '$indigoDeep',
    color: '$rawCotton',
    borderColor: '$indigoDeep',
  },
});

export default function CollectionPage({ params }: { params: { handle: string } }) {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();
  const { formatPrice } = useRegion();

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredProducts = products.filter(p => {
    const handle = params.handle.toLowerCase();
    if (handle === 'all') return true;
    if (handle === 'fragrances') {
      return p.handle.includes('incense') || p.handle.includes('dhoop') || (p.tags && p.tags.some((t: string) => t.includes('fragrance-type')));
    }
    if (handle === 'quilts') {
      return p.handle.includes('quilt') || p.handle.includes('razai') || p.title.toLowerCase().includes('quilt');
    }
    if (handle === 'sheets') {
      return p.handle.includes('sheet') || p.title.toLowerCase().includes('sheet');
    }
    if (handle === 'robes') {
      return p.handle.includes('robe') || p.title.toLowerCase().includes('robe');
    }
    return true;
  });

  const formattedTitle = params.handle.replace(/-/g, ' ');

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center text-stone-500 font-light">
        Loading Artisanal Collection...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <Header>
        <Title>{formattedTitle} Collection</Title>
        <Subtitle>Discover heirloom quality masterpieces.</Subtitle>
      </Header>

      <Grid>
        {filteredProducts.map((product) => {
          const mainImage = product.images[0]?.src || '';
          const firstVariant = product.variants[0] || { id: '', price: '0.00', title: '' };

          return (
            <Card key={product.id}>
              <ImageArea href={`/products/${product.handle}`}>
                {mainImage ? (
                  <img src={mainImage} alt={product.title} />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-stone-400">No Image</div>
                )}
              </ImageArea>
              <Details>
                <ProductTitle href={`/products/${product.handle}`}>
                  {product.title}
                </ProductTitle>
                <ProductPrice>
                  {formatPrice(firstVariant.price)}
                </ProductPrice>
                <Button onClick={() => addItem({
                  id: firstVariant.id,
                  title: product.title,
                  variantTitle: firstVariant.title,
                  price: firstVariant.price,
                  quantity: 1,
                  image: mainImage,
                })}>
                  Quick Add to Bag
                </Button>
              </Details>
            </Card>
          );
        })}
      </Grid>
    </div>
  );
}
