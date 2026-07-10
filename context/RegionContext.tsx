'use client';

import React, { createContext, useContext, useMemo, useState } from 'react';
import {
  REGION_CHOICE_COOKIE,
  REGION_COOKIE,
  REGIONS,
  RegionCode,
  RegionConfig,
  convertFromINR,
  formatFromINR,
  formatMoney,
  regionForHost,
} from '@/lib/region';

interface RegionContextType {
  region: RegionConfig;
  /** Convert + format an INR base amount for the active region. */
  formatPrice: (amountINR: number | string) => string;
  /** Convert an INR base amount into the region's display currency. */
  convertPrice: (amountINR: number | string) => number;
  /** Format an amount already expressed in the region's display currency. */
  formatAmount: (amount: number) => string;
  freeShippingThreshold: number;
  switchRegion: (code: RegionCode) => void;
}

const RegionContext = createContext<RegionContextType | undefined>(undefined);

const ONE_YEAR = 60 * 60 * 24 * 365;

export function RegionProvider({
  initialRegion,
  children,
}: {
  initialRegion: RegionCode;
  children: React.ReactNode;
}) {
  const [code, setCode] = useState<RegionCode>(initialRegion);
  const region = REGIONS[code];

  const switchRegion = (next: RegionCode) => {
    if (next === code) return;
    document.cookie = `${REGION_COOKIE}=${next}; path=/; max-age=${ONE_YEAR}; samesite=lax`;
    document.cookie = `${REGION_CHOICE_COOKIE}=1; path=/; max-age=${ONE_YEAR}; samesite=lax`;

    // On the canonical domains each region lives on its own domain, so hop
    // across with ?region= (which pins the choice there). Everywhere else
    // (localhost, previews) the switch is instant and cookie-persisted.
    const { hostname, pathname } = window.location;
    if (regionForHost(hostname)) {
      window.location.href = `https://${REGIONS[next].domain}${pathname}?region=${next}`;
      return;
    }
    setCode(next);
  };

  const value = useMemo<RegionContextType>(
    () => ({
      region,
      formatPrice: (amountINR) => formatFromINR(amountINR, region),
      convertPrice: (amountINR) => convertFromINR(Number(amountINR) || 0, region),
      formatAmount: (amount) => formatMoney(amount, region),
      freeShippingThreshold: region.freeShippingThreshold,
      switchRegion,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [code]
  );

  return <RegionContext.Provider value={value}>{children}</RegionContext.Provider>;
}

export function useRegion() {
  const context = useContext(RegionContext);
  if (!context) throw new Error('useRegion must be used within a RegionProvider');
  return context;
}
