import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Reveal } from '@/components/reveal';
import { BreadcrumbJsonLd, ServiceJsonLd } from '@/components/json-ld';
import { FLEET } from '@/lib/fleet';
import {
  DESTINATION_PAGES,
  getDestination,
  groupOf,
} from '@/lib/destinations';
import { whatsappLink } from '@/lib/site';
import { locales } from '@/i18n/routing';

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    DESTINATION_PAGES.map((d) => ({ locale, slug: d.slug })),
  );
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await props.params;
  const d = getDestination(slug);
  if (!d) return {};

  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = `/${l}/destinations/${slug}`;

  return {
    title: { absolute: `${d.name} Transfer | Private Taxi & Minivan` },
    description: d.blurb,
    alternates: { canonical: `/${locale}/destinations/${slug}`, languages },
    openGraph: { title: `${d.name} Transfer`, description: d.blurb },
  };
}

export default async function DestinationPage(props: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await props.params;
  setRequestLocale(locale);

  const d = getDestination(slug);
  if (!d) notFound();

  const group = groupOf(slug);
  const siblings = (group?.destinations ?? []).filter((x) => x.slug !== slug).slice(0, 6);

  const quote = `Hi, I would like a fixed quote for a Barcelona transfer: ${d.name}.`;

  return (
    <>
      <ServiceJsonLd
        name={`${d.name} private transfer`}
        description={d.blurb}
        url={`/${locale}/destinations/${slug}`}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: `/${locale}` },
          { name: 'Destinations', url: `/${locale}/destinations` },
          { name: d.name, url: `/${locale}/destinations/${slug}` },
        ]}
      />

      <section className="bg-ink">
        <div className="mx-auto max-w-6xl px-4 pb-14 pt-12">
          <nav aria-label="Breadcrumb" className="mb-5 text-sm text-porcelain/50">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/destinations" className="hover:text-accent">
                  Destinations
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-porcelain/80">
                {d.name}
              </li>
            </ol>
          </nav>

          <h1 className="max-w-3xl font-display text-3xl font-extrabold leading-tight text-porcelain sm:text-5xl">
            {d.name} transfer
          </h1>
          <p className="mt-5 max-w-2xl leading-relaxed text-porcelain/75">{d.blurb}</p>

          {d.km && d.minutes && (
            <dl className="mt-7 flex flex-wrap gap-x-10 gap-y-3">
              <div>
                <dt className="text-xs uppercase tracking-wider text-porcelain/50">
                  Distance
                </dt>
                <dd className="font-mono text-xl font-bold text-porcelain">~{d.km} km</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-porcelain/50">
                  Journey time
                </dt>
                <dd className="font-mono text-xl font-bold text-porcelain">
                  ~{Math.round(d.minutes / 5) * 5} min
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-porcelain/50">Price</dt>
                <dd className="font-mono text-xl font-bold text-accent">Fixed quote</dd>
              </div>
            </dl>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={whatsappLink(quote)}
              target="_blank"
              rel="noopener noreferrer"
              className="sheen rounded-xl bg-accent px-6 py-3.5 font-display font-extrabold text-ink transition hover:bg-accent-deep"
            >
              Get a fixed quote on WhatsApp
            </a>
            <Link
              href="/book"
              className="rounded-xl border-2 border-white/25 px-6 py-3.5 font-display font-bold text-porcelain transition hover:bg-white/10"
            >
              Book an airport transfer instead
            </Link>
          </div>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 py-14">
        {(d.body ?? []).map((p) => (
          <p key={p.slice(0, 40)} className="mt-5 leading-relaxed text-slate-body first:mt-0">
            {p}
          </p>
        ))}

        <div className="mt-10 rounded-card border-2 border-accent/40 bg-accent/5 p-6">
          <h2 className="font-display text-lg font-extrabold">Why this route is not metered</h2>
          <p className="mt-3 text-sm leading-relaxed">
            Official AMB meter tariffs apply inside the Barcelona metropolitan area.{' '}
            {d.name.replace('Barcelona to ', '').replace('Barcelona Airport to ', '')} lies
            beyond it, so we agree a fixed price with you in advance instead — including any
            waiting time — and confirm it in writing before you travel.
          </p>
        </div>

        <h2 className="mt-12 font-display text-2xl font-extrabold">Vehicles for this route</h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {FLEET.filter((v) => v.seats >= 4).map((v) => (
            <li
              key={v.slug}
              className="flex items-center justify-between gap-3 rounded-xl border border-hairline bg-white px-4 py-3"
            >
              <span className="font-display text-sm font-bold">{v.name}</span>
              <span className="font-mono text-xs text-muted">
                {v.seats} pax · {v.bags} bags
              </span>
            </li>
          ))}
        </ul>
      </article>

      {siblings.length > 0 && (
        <section className="border-t border-hairline bg-white py-14">
          <div className="mx-auto max-w-6xl px-4">
            <Reveal>
              <h2 className="font-display text-2xl font-extrabold">
                Other {group?.title.toLowerCase()}
              </h2>
            </Reveal>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {siblings.map((s) => (
                <li key={s.slug}>
                  {s.hasPage ? (
                    <Link
                      href={`/destinations/${s.slug}`}
                      className="lift block h-full rounded-card border border-hairline p-5 hover:border-accent"
                    >
                      <span className="font-display font-bold">{s.name}</span>
                      <span className="mt-1.5 block text-sm text-muted">{s.blurb}</span>
                    </Link>
                  ) : (
                    <a
                      href={whatsappLink(`Hi, I would like a quote for ${s.name}.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="lift block h-full rounded-card border border-hairline p-5 hover:border-accent"
                    >
                      <span className="font-display font-bold">{s.name}</span>
                      <span className="mt-1.5 block text-sm text-muted">{s.blurb}</span>
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
