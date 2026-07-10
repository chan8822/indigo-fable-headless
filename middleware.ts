import { NextRequest, NextResponse } from 'next/server';
import {
  DEFAULT_REGION,
  REGION_CHOICE_COOKIE,
  REGION_COOKIE,
  REGION_HEADER,
  REGIONS,
  RegionCode,
  parseRegion,
  regionForCountry,
  regionForHost,
} from '@/lib/region';

const ONE_YEAR = 60 * 60 * 24 * 365;

function detectCountry(req: NextRequest): string {
  return (
    req.headers.get('x-vercel-ip-country') ||
    req.headers.get('cf-ipcountry') ||
    req.headers.get('cloudfront-viewer-country') ||
    ''
  );
}

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostRegion = regionForHost(req.headers.get('host') || '');
  const queryRegion = parseRegion(url.searchParams.get('region'));
  const cookieRegion = parseRegion(req.cookies.get(REGION_COOKIE)?.value);
  const hasExplicitChoice = req.cookies.get(REGION_CHOICE_COOKIE)?.value === '1';
  const country = detectCountry(req);
  const geoRegion = country ? regionForCountry(country) : null;

  // Resolution order: explicit ?region= override > canonical domain > saved
  // cookie > geo-IP > default. On the canonical domains the domain itself is
  // the source of truth for currency/checkout.
  let region: RegionCode;
  if (queryRegion) {
    region = queryRegion;
  } else if (hostRegion) {
    region = hostRegion;
  } else if (cookieRegion) {
    region = cookieRegion;
  } else {
    region = geoRegion ?? DEFAULT_REGION;
  }

  // Smart cross-domain redirect: a visitor landing on the wrong regional
  // domain (per geo-IP) is guided to their market once, unless they have
  // explicitly chosen a region via the switcher (?region= sets that choice).
  if (hostRegion && !queryRegion && !hasExplicitChoice && geoRegion && geoRegion !== hostRegion) {
    const target = url.clone();
    target.protocol = 'https:';
    target.host = REGIONS[geoRegion].domain;
    target.port = '';
    return NextResponse.redirect(target);
  }

  // Forward the resolved region to server components for the initial render.
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set(REGION_HEADER, region);
  const res = NextResponse.next({ request: { headers: requestHeaders } });

  if (cookieRegion !== region) {
    res.cookies.set(REGION_COOKIE, region, { path: '/', maxAge: ONE_YEAR, sameSite: 'lax' });
  }
  if (queryRegion && !hasExplicitChoice) {
    res.cookies.set(REGION_CHOICE_COOKIE, '1', { path: '/', maxAge: ONE_YEAR, sameSite: 'lax' });
  }
  return res;
}

export const config = {
  // Run on pages only — skip Next internals, API routes, and static assets.
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
