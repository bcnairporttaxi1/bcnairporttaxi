import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { TRIP_COOKIE_MAX_AGE, tripCookieName, verifyTripToken } from '@/lib/trip-token';
import { locales } from '@/i18n/routing';

/**
 * Turns a signed trip link into a cookie and sends the guest to the page.
 *
 * The trip page cannot set a cookie while rendering, so a guest arriving
 * with `?k=` is bounced through here once: the token is checked, a cookie
 * scoped to that reference is set, and they land on the plain trip URL.
 * From then on the page and its polling APIs resolve access from the cookie
 * the same way they resolve it from a session.
 */
export async function GET(req: Request, ctx: { params: Promise<{ reference: string }> }) {
  const { reference } = await ctx.params;
  const url = new URL(req.url);
  const k = url.searchParams.get('k');
  const wanted = url.searchParams.get('locale') ?? 'en';
  const locale = (locales as readonly string[]).includes(wanted) ? wanted : 'en';

  if (!/^BCN-[A-Z0-9]{6}$/.test(reference) || !verifyTripToken(reference, k)) {
    return NextResponse.redirect(new URL(`/${locale}/find-booking?bad=1`, url.origin), 303);
  }

  const jar = await cookies();
  jar.set(tripCookieName(reference), k as string, {
    httpOnly: true,
    sameSite: 'lax',
    secure: url.protocol === 'https:',
    path: '/',
    maxAge: TRIP_COOKIE_MAX_AGE,
  });

  return NextResponse.redirect(new URL(`/${locale}/trip/${reference}`, url.origin), 303);
}
