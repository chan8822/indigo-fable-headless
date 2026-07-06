'use client';

import React from 'react';
import { styled } from '@/stitches.config';

// 1. Primary Button Component (Transitions Gold to Indigo)
export const PrimaryButton = styled('button', {
  fontFamily: '$sans',
  fontSize: '$sm',
  fontWeight: '$medium',
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
  border: '1px solid $goldShimmer',
  color: '$indigoMidnight',
  bg: '$goldChampagne',
  cursor: 'pointer',
  px: '$6',
  py: '$3',
  borderRadius: '$small',
  transition: '$smooth',
  outline: 'none',

  '&:hover': {
    bg: '$indigoDeep',
    color: '$rawCotton',
    borderColor: '$indigoDeep',
    boxShadow: '$soft',
  },

  '&:active': {
    bg: '$indigoMidnight',
  },
});

// 2. Product Card Component Structures
export const CardContainer = styled('div', {
  bg: '$rawCotton',
  borderRadius: '$medium',
  boxShadow: '$soft',
  overflow: 'hidden',
  transition: '$smooth',
  border: '1px solid $stoneSoft',
  display: 'flex',
  flexDirection: 'column',

  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '$deep',
  },

  // Responsive padding configuration using breakpoints
  p: '$4',
  '@md': { p: '$6' },
});

export const ImageWrapper = styled('div', {
  width: '100%',
  aspectRatio: '4 / 5',
  bg: '$stoneSoft',
  overflow: 'hidden',
  borderRadius: '$small',
  position: 'relative',
  
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: '$smooth',
  },

  [`&:hover img`]: {
    transform: 'scale(1.03)',
  },
});

export const ProductTitle = styled('h3', {
  fontFamily: '$serif',
  fontSize: '$xl',
  fontWeight: '$light',
  color: '$indigoMidnight',
  mt: '$4',
  mb: '$1',
});

export const ProductPrice = styled('span', {
  fontFamily: '$sans',
  fontSize: '$sm',
  color: '$stoneGray',
  fontWeight: '$medium',
  mb: '$4',
});

// 3. Composite React Component Assembly
export const StitchesProductCard = () => {
  return (
    <CardContainer>
      <ImageWrapper>
        <img src="/images/indigo-quilt.jpg" alt="Hand-stitched Organic Indigo Quilt" />
      </ImageWrapper>
      <ProductTitle>The Heirloom Indigo Quilt</ProductTitle>
      <ProductPrice>$380.00</ProductPrice>
      <PrimaryButton>Add to Collection</PrimaryButton>
    </CardContainer>
  );
};
