import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { PageHero, Prose } from '@/components/page-hero';
import { InstallPrompt } from '@/components/install-prompt';
import { locales } from '@/i18n/routing';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = `/${l}/install`;
  return {
    title: 'Install BCNAirportTaxi as an App',
    description:
      'Add BCNAirportTaxi to your home screen on iPhone or Android for one-tap booking, offline access to your trip details and live driver tracking.',
    alternates: { canonical: `/${locale}/install`, languages },
  };
}

export default async function InstallPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <>
      <PageHero
        title="Install the app"
        intro="BCNAirportTaxi installs straight from your browser — no app store, no download. Once added, it opens full screen and keeps your booking details available offline."
      />

      <Prose>
        <InstallPrompt />

        <h2>iPhone and iPad</h2>
        <ul>
          <li>Open this page in Safari.</li>
          <li>Tap the Share button at the bottom of the screen.</li>
          <li>Scroll down and tap <strong>Add to Home Screen</strong>.</li>
          <li>Tap <strong>Add</strong> in the top right corner.</li>
        </ul>

        <h2>Android</h2>
        <ul>
          <li>Open this page in Chrome.</li>
          <li>Tap the three-dot menu in the top right.</li>
          <li>Tap <strong>Install app</strong> or <strong>Add to Home screen</strong>.</li>
          <li>Confirm by tapping <strong>Install</strong>.</li>
        </ul>

        <h2>Desktop</h2>
        <p>
          In Chrome or Edge, an install icon appears at the right-hand end of the address
          bar. Click it and choose <strong>Install</strong>.
        </p>

        <h2>What you get</h2>
        <ul>
          <li>One-tap access to booking and your trip history.</li>
          <li>Your confirmed booking details stay readable without a connection.</li>
          <li>Live driver tracking and chat once a driver is assigned.</li>
        </ul>
      </Prose>
    </>
  );
}
