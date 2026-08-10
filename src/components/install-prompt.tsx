'use client';

import { useEffect, useState } from 'react';

/** Chromium's install event, which is not in the standard DOM lib types. */
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

/**
 * Native install button, shown only on browsers that fire
 * `beforeinstallprompt` (Chromium). Safari has no such API, so iOS users are
 * covered by the written Share-sheet instructions on the same page.
 */
export function InstallPrompt() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    function onBeforeInstall(e: Event) {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
    }
    function onInstalled() {
      setInstalled(true);
      setDeferred(null);
    }

    window.addEventListener('beforeinstallprompt', onBeforeInstall);
    window.addEventListener('appinstalled', onInstalled);

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setInstalled(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstall);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  if (installed) {
    return (
      <p className="rounded-card border-2 border-accent/40 bg-accent/5 p-5 font-semibold">
        The app is installed on this device.
      </p>
    );
  }

  if (!deferred) return null;

  return (
    <button
      type="button"
      onClick={async () => {
        await deferred.prompt();
        const { outcome } = await deferred.userChoice;
        if (outcome === 'accepted') setInstalled(true);
        setDeferred(null);
      }}
      className="rounded-lg bg-accent px-5 py-3 font-display font-extrabold text-ink hover:bg-accent-deep"
    >
      Install the app now
    </button>
  );
}
