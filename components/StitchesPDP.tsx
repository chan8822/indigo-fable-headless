'use client';

import React, { useState } from 'react';
import { styled } from '@/stitches.config';
import { useCart } from '@/context/CartContext';
import { ShopifyProduct } from '@/lib/shopify';

interface StitchesPDPProps {
  product: ShopifyProduct;
}

// Styled layout components
const Container = styled('div', {
  maxWidth: '1200px',
  mx: 'auto',
  px: '$6',
  py: '$12',
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '$10',
  '@md': {
    gridTemplateColumns: '1.2fr 1fr',
    gap: '$16',
  },
});

const GallerySection = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',
});

const FeaturedImageWrapper = styled('div', {
  width: '100%',
  aspectRatio: '4 / 3',
  bg: '$stoneSoft',
  borderRadius: '$medium',
  overflow: 'hidden',
  border: '1px solid $stoneSoft',
  position: 'relative',
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
});

const ThumbnailsRow = styled('div', {
  display: 'flex',
  gap: '$3',
  overflowX: 'auto',
  py: '$2',
});

const ThumbnailButton = styled('button', {
  width: '64px',
  height: '64px',
  borderRadius: '$small',
  overflow: 'hidden',
  border: '2px solid transparent',
  opacity: 0.6,
  transition: '$smooth',
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  variants: {
    active: {
      true: {
        borderColor: '$goldShimmer',
        opacity: 1,
        transform: 'scale(1.05)',
      },
    },
  },
});

const InfoSection = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
});

const Vendor = styled('span', {
  fontFamily: '$sans',
  fontSize: '$xs',
  textTransform: 'uppercase',
  letterSpacing: '0.2em',
  color: '$stoneGray',
  mb: '$2',
});

const Title = styled('h1', {
  fontFamily: '$serif',
  fontSize: '$3xl',
  fontWeight: '$light',
  color: '$indigoMidnight',
  lineHeight: '$tight',
  mb: '$3',
  '@md': {
    fontSize: '$4xl',
  },
});

const Price = styled('div', {
  fontFamily: '$sans',
  fontSize: '$2xl',
  fontWeight: '$medium',
  color: '$indigoDeep',
  mb: '$8',
});

const SectionLabel = styled('h3', {
  fontFamily: '$sans',
  fontSize: '$xs',
  textTransform: 'uppercase',
  letterSpacing: '0.15em',
  fontWeight: '$semibold',
  color: '$stoneGray',
  mb: '$3',
});

const VariantGrid = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '$3',
  mb: '$8',
});

const VariantButton = styled('button', {
  fontFamily: '$sans',
  fontSize: '$xs',
  fontWeight: '$medium',
  px: '$5',
  py: '$3',
  borderRadius: '$small',
  border: '1px solid $stoneSoft',
  bg: '$pureWhite',
  color: '$indigoMidnight',
  cursor: 'pointer',
  transition: '$smooth',
  
  '&:hover': {
    borderColor: '$stoneGray',
  },
  
  variants: {
    selected: {
      true: {
        bg: '$indigoDeep',
        color: '$rawCotton',
        borderColor: '$indigoDeep',
        boxShadow: '$soft',
      },
    },
  },
});

const AddToBagButton = styled('button', {
  fontFamily: '$sans',
  fontSize: '$xs',
  fontWeight: '$medium',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  py: '$4.5',
  px: '$8',
  bg: '$indigoDeep',
  color: '$rawCotton',
  border: '1px solid $indigoDeep',
  borderRadius: '$medium',
  cursor: 'pointer',
  transition: '$smooth',
  boxShadow: '$soft',
  width: '100%',
  mb: '$8',
  
  '&:hover': {
    bg: '$indigoMidnight',
    borderColor: '$indigoMidnight',
    boxShadow: '$deep',
  },
});

const DetailsAccordion = styled('div', {
  borderTop: '1px solid $stoneSoft',
  pt: '$6',
  mt: '$4',
});

const AccordionItem = styled('div', {
  borderBottom: '1px solid $stoneSoft',
  pb: '$4',
  mb: '$4',
});

const AccordionHeader = styled('button', {
  width: '100%',
  display: 'flex',
  justifyContent: 'between',
  alignItems: 'center',
  fontFamily: '$serif',
  fontSize: '$lg',
  color: '$indigoMidnight',
  bg: 'transparent',
  border: 'none',
  textAlign: 'left',
  cursor: 'pointer',
  py: '$2',
});

const AccordionContent = styled('div', {
  fontFamily: '$sans',
  fontSize: '$sm',
  color: '$stoneGray',
  lineHeight: '$relaxed',
  pt: '$2',
  fontWeight: '$light',
});

export function StitchesPDP({ product }: StitchesPDPProps) {
  const { addItem } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0] || { id: '', title: '', price: '0.00' });
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [openTab, setOpenTab] = useState<string | null>('desc');

  const featuredImg = product.images[activeImgIndex]?.src || '';

  const handleAddToCart = () => {
    addItem({
      id: selectedVariant.id,
      title: product.title,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      image: featuredImg,
    });
  };

  const toggleTab = (tab: string) => {
    setOpenTab((prev) => (prev === tab ? null : tab));
  };

  return (
    <Container>
      {/* Left: Product Images Gallery */}
      <GallerySection>
        <FeaturedImageWrapper>
          {featuredImg ? (
            <img src={featuredImg} alt={product.title} />
          ) : (
            <div className="flexCenter size-full text-stone-400">No Image Available</div>
          )}
        </FeaturedImageWrapper>
        {product.images.length > 1 && (
          <ThumbnailsRow>
            {product.images.map((img, idx) => (
              <ThumbnailButton
                key={idx}
                active={activeImgIndex === idx}
                onClick={() => setActiveImgIndex(idx)}
              >
                <img src={img.src} alt={img.alt} />
              </ThumbnailButton>
            ))}
          </ThumbnailsRow>
        )}
      </GallerySection>

      {/* Right: Product Details Info */}
      <InfoSection>
        <Vendor>{product.vendor}</Vendor>
        <Title>{product.title}</Title>
        <Price>₹{Number(selectedVariant.price).toLocaleString('en-IN')}</Price>

        {/* Variant/Size Selector */}
        {product.variants.length > 1 && (
          <div>
            <SectionLabel>Select Edition</SectionLabel>
            <VariantGrid>
              {product.variants.map((variant) => (
                <VariantButton
                  key={variant.id}
                  selected={selectedVariant.id === variant.id}
                  onClick={() => setSelectedVariant(variant)}
                >
                  {variant.title}
                </VariantButton>
              ))}
            </VariantGrid>
          </div>
        )}

        <AddToBagButton onClick={handleAddToCart}>
          Add to Bag — ₹{Number(selectedVariant.price).toLocaleString('en-IN')}
        </AddToBagButton>

        {/* Info Accordion Tabs */}
        <DetailsAccordion>
          <AccordionItem>
            <AccordionHeader onClick={() => toggleTab('desc')}>
              <span>Description</span>
              <span>{openTab === 'desc' ? '−' : '+'}</span>
            </AccordionHeader>
            {openTab === 'desc' && (
              <AccordionContent 
                dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
              />
            )}
          </AccordionItem>

          <AccordionItem>
            <AccordionHeader onClick={() => toggleTab('craft')}>
              <span>Jaipur Craftsmanship</span>
              <span>{openTab === 'craft' ? '−' : '+'}</span>
            </AccordionHeader>
            {openTab === 'craft' && (
              <AccordionContent>
                Every Indigo Fable razai and quilt is hand block printed using natural indigo vegetable dyes, highlight-stamped with genuine gold-dust pigments, and filled with carded organic unbleached cotton. Hand-stitched with tagai embroidery by master artisans.
              </AccordionContent>
            )}
          </AccordionItem>

          <AccordionItem>
            <AccordionHeader onClick={() => toggleTab('care')}>
              <span>Wash & Care Guide</span>
              <span>{openTab === 'care' ? '−' : '+'}</span>
            </AccordionHeader>
            {openTab === 'care' && (
              <AccordionContent>
                Dry clean only for the first two seasons to protect the delicate gold-dust hand prints. Afterwards, hand wash cold with mild pH-neutral detergent and dry flat in indirect shade. Store in a breathable cotton bag.
              </AccordionContent>
            )}
          </AccordionItem>
        </DetailsAccordion>
      </InfoSection>
    </Container>
  );
}
