'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

const RouteMap = dynamic(() => import('./route-map'), {
  ssr: false,
  loading: () => <div className="h-full min-h-[300px] w-full animate-pulse rounded-xl bg-graphite-2" />,
});

interface Point {
  lat: number;
  lng: number;
  ts?: string;
}

interface TrackResponse {
  status: string | null;
  driver: Point | null;
  passenger: Point | null;
  pickup: Point | null;
  dropoff: Point | null;
}

interface ChatMessage {
  id: string;
  senderRole: 'USER' | 'DRIVER' | 'ADMIN';
  body: string;
  createdAt: string;
  deliveredEmail: boolean;
}

const POLL_MS = 6000;
const SHARE_MS = 12000;

/**
 * Live trip panel: the other party's position on a map, plus chat.
 *
 * Polling rather than sockets — a transfer lasts under an hour, so a request
 * every few seconds is far simpler than running a realtime tier, and it stops
 * cleanly when the tab is hidden so a forgotten tab does not poll all night.
 */
export function TripLive({
  reference,
  viewerRole,
  canShareLocation,
}: {
  reference: string;
  viewerRole: 'USER' | 'DRIVER' | 'ADMIN';
  canShareLocation: boolean;
}) {
  const [track, setTrack] = useState<TrackResponse | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState('');
  const [sending, setSending] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [shareError, setShareError] = useState<string | null>(null);

  const threadRef = useRef<HTMLDivElement>(null);
  const watchRef = useRef<number | null>(null);
  const lastSentRef = useRef(0);

  const poll = useCallback(async () => {
    if (document.hidden) return;
    try {
      const [t, c] = await Promise.all([
        fetch(`/api/trips/${reference}/location`).then((r) => (r.ok ? r.json() : null)),
        fetch(`/api/trips/${reference}/messages`).then((r) => (r.ok ? r.json() : null)),
      ]);
      if (t) setTrack(t as TrackResponse);
      if (c) setMessages((c as { messages: ChatMessage[] }).messages);
    } catch {
      // Transient failure: the next tick will catch up.
    }
  }, [reference]);

  useEffect(() => {
    poll();
    const id = setInterval(poll, POLL_MS);
    const onVisible = () => !document.hidden && poll();
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      clearInterval(id);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, [poll]);

  // Keep the thread pinned to the newest message.
  useEffect(() => {
    const el = threadRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages.length]);

  const stopSharing = useCallback(() => {
    if (watchRef.current !== null) {
      navigator.geolocation.clearWatch(watchRef.current);
      watchRef.current = null;
    }
    setSharing(false);
  }, []);

  useEffect(() => stopSharing, [stopSharing]);

  function startSharing() {
    setShareError(null);
    if (!('geolocation' in navigator)) {
      setShareError('This device cannot share a location.');
      return;
    }

    watchRef.current = navigator.geolocation.watchPosition(
      async (pos) => {
        // Throttle: watchPosition can fire far more often than is useful.
        if (Date.now() - lastSentRef.current < SHARE_MS) return;
        lastSentRef.current = Date.now();

        await fetch(`/api/trips/${reference}/location`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          }),
        }).catch(() => {});
      },
      (err) => {
        setShareError(
          err.code === err.PERMISSION_DENIED
            ? 'Location permission was declined.'
            : 'Could not read your location.',
        );
        stopSharing();
      },
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 20000 },
    );
    setSharing(true);
  }

  async function send(e: React.FormEvent) {
    e.preventDefault();
    const body = draft.trim();
    if (!body) return;

    setSending(true);
    setDraft('');
    try {
      const res = await fetch(`/api/trips/${reference}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ body }),
      });
      if (!res.ok) setDraft(body); // put it back so nothing is silently lost
      await poll();
    } catch {
      setDraft(body);
    } finally {
      setSending(false);
    }
  }

  const other = viewerRole === 'DRIVER' ? track?.passenger : track?.driver;
  const otherLabel = viewerRole === 'DRIVER' ? 'passenger' : 'driver';

  const seen = other?.ts
    ? new Intl.DateTimeFormat('en-GB', { timeStyle: 'short' }).format(new Date(other.ts))
    : null;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Map */}
      <section>
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-display text-lg font-extrabold">Live position</h2>
          {seen ? (
            <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-bold text-green-900">
              {otherLabel} seen {seen}
            </span>
          ) : (
            <span className="rounded-full bg-slate-200 px-2.5 py-1 text-xs font-bold text-slate-700">
              waiting for {otherLabel}
            </span>
          )}
        </div>

        <div className="mt-3 overflow-hidden rounded-card border border-hairline bg-graphite-2 p-1.5">
          <RouteMap
            pickup={other ?? track?.pickup ?? null}
            dropoff={track?.dropoff ?? null}
            geometry={null}
            label={`Live map showing the ${otherLabel} position`}
          />
        </div>

        {canShareLocation && (
          <div className="mt-3">
            <button
              type="button"
              onClick={sharing ? stopSharing : startSharing}
              className={`rounded-lg px-4 py-2.5 text-sm font-bold transition ${
                sharing
                  ? 'border-2 border-ink hover:bg-ink hover:text-porcelain'
                  : 'bg-accent text-ink hover:bg-accent-deep'
              }`}
            >
              {sharing ? 'Stop sharing my location' : 'Share my location'}
            </button>
            <p className="mt-2 text-xs text-muted">
              Shared only with the {otherLabel} on this trip, and only while you leave this
              on.
            </p>
            {shareError && (
              <p role="alert" className="mt-2 text-xs text-red-700">
                {shareError}
              </p>
            )}
          </div>
        )}
      </section>

      {/* Chat */}
      <section>
        <h2 className="font-display text-lg font-extrabold">Messages</h2>

        <div className="mt-3 flex h-[320px] flex-col rounded-card border border-hairline bg-white">
          <div ref={threadRef} className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.length === 0 ? (
              <p className="pt-10 text-center text-sm text-muted">
                No messages yet. Say hello.
              </p>
            ) : (
              messages.map((m) => {
                const mine = m.senderRole === viewerRole;
                return (
                  <div
                    key={m.id}
                    className={`flex ${mine ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm ${
                        mine ? 'bg-ink text-porcelain' : 'bg-porcelain text-slate-body'
                      }`}
                    >
                      <p className="leading-relaxed">{m.body}</p>
                      <p
                        className={`mt-1 text-[11px] ${mine ? 'text-porcelain/50' : 'text-muted'}`}
                      >
                        {new Intl.DateTimeFormat('en-GB', { timeStyle: 'short' }).format(
                          new Date(m.createdAt),
                        )}
                        {m.deliveredEmail && ' · emailed'}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <form onSubmit={send} className="flex gap-2 border-t border-hairline p-3">
            <label className="sr-only" htmlFor="chat-input">
              Message
            </label>
            <input
              id="chat-input"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              maxLength={2000}
              placeholder="Type a message…"
              className="flex-1 rounded-lg border border-hairline px-3 py-2.5 text-sm"
            />
            <button
              type="submit"
              disabled={sending || !draft.trim()}
              className="rounded-lg bg-accent px-4 py-2.5 text-sm font-bold text-ink transition hover:bg-accent-deep disabled:opacity-50"
            >
              Send
            </button>
          </form>
        </div>

        <p className="mt-2 text-xs text-muted">
          If the {otherLabel} is not online, we email your message to them as well.
        </p>
      </section>
    </div>
  );
}
